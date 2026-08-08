document.addEventListener('DOMContentLoaded', () => {
  const BREAKPOINT = 992;
  const root = document.documentElement;
  let swalLoadPromise = null;

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (error) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (error) { /* localStorage can be unavailable. */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (error) { /* localStorage can be unavailable. */ }
    }
  };

  const getArray = (key) => {
    try {
      const value = JSON.parse(storage.get(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  };

  const setArray = (key, value) => {
    storage.set(key, JSON.stringify(Array.isArray(value) ? value : []));
  };

  const makeId = (prefix = 'nova') => {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const todayISO = () => new Date().toISOString().split('T')[0];

  const loadSweetAlert = () => {
    if (window.Swal) return Promise.resolve(window.Swal);
    if (swalLoadPromise) return swalLoadPromise;

    swalLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-nova-swal]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.Swal));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      script.async = true;
      script.dataset.novaSwal = 'true';
      script.onload = () => resolve(window.Swal);
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return swalLoadPromise;
  };

  const fireAlert = async (options = {}) => {
    try {
      const Swal = await loadSweetAlert();
      if (Swal && Swal.fire) return Swal.fire(options);
    } catch (error) {
      /* Fallback below keeps UX functional offline. */
    }

    const title = options.title ? `${options.title}\n\n` : '';
    const text = options.text || options.html?.replace(/<[^>]+>/g, ' ') || '';
    if (options.showCancelButton) {
      return { isConfirmed: window.confirm(`${title}${text}`.trim() || 'Are you sure?') };
    }
    window.alert(`${title}${text}`.trim() || 'Done');
    return { isConfirmed: true };
  };

  window.NOVASwal = fireAlert;
  window.NOVAStorage = {
    getArray,
    setArray,
    makeId,
    storage
  };

  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  };

  const initScrollPosition = () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0 });
  };

  const syncThemeButtons = (theme) => {
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('data-theme', theme);
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  };

  const applyTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.classList.toggle('dark', nextTheme === 'dark');
    storage.set('color-theme', nextTheme);
    syncThemeButtons(nextTheme);
  };

  const initDarkMode = () => {
    const savedTheme = storage.get('color-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  };

  const syncDirectionButtons = (dir) => {
    document.querySelectorAll('.rtl-ltr-toggle').forEach((btn) => {
      const textSpan = btn.querySelector('.dir-text');
      if (textSpan) textSpan.innerText = dir.toUpperCase();
      btn.setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout');
    });
  };

  const applyDirection = (dir) => {
    const nextDir = dir === 'rtl' ? 'rtl' : 'ltr';
    root.setAttribute('dir', nextDir);
    storage.set('site-dir', nextDir);
    syncDirectionButtons(nextDir);
  };

  const initDirection = () => {
    applyDirection(storage.get('site-dir') || root.getAttribute('dir') || 'ltr');
  };

  const initGlobalControlClicks = () => {
    document.addEventListener('click', (event) => {
      const themeBtn = event.target.closest('.theme-toggle');
      if (themeBtn) {
        event.preventDefault();
        applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
        return;
      }

      const directionBtn = event.target.closest('.rtl-ltr-toggle');
      if (directionBtn) {
        event.preventDefault();
        applyDirection(root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
        if (typeof window.closeDrawer === 'function') window.closeDrawer();
      }
    });
  };

  const initHeader = () => {
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    const updateHeader = () => {
      if (header) {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('shadow-md', isScrolled);
        header.classList.toggle('bg-stone-950/95', isScrolled);
        header.classList.toggle('backdrop-blur-md', isScrolled);
        header.classList.toggle('py-3', isScrolled);
        header.classList.toggle('py-5', !isScrolled);
        header.classList.toggle('bg-stone-950/50', !isScrolled);
      }

      if (scrollToTopBtn) {
        const show = window.scrollY > 300;
        scrollToTopBtn.classList.toggle('opacity-0', !show);
        scrollToTopBtn.classList.toggle('pointer-events-none', !show);
        scrollToTopBtn.classList.toggle('translate-y-4', !show);
        scrollToTopBtn.classList.toggle('opacity-100', show);
        scrollToTopBtn.classList.toggle('translate-y-0', show);
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const getPageKey = () => {
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file === 'home-2.html') return 'home-2.html';
    if (file === 'service-details.html') return 'services.html';
    if (file === 'blog-post.html' || file === 'blog-details.html') return 'blog.html';
    return file;
  };

  const initNavigationStructure = () => {
    const headerNav = document.querySelector('header nav');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (!headerNav && !mobileDrawer) return;

    const pageKey = getPageKey();
    const isSpaTheme = Boolean(document.querySelector('[class*="brand-spaGold"], [class*="brand-spaGreen"]'));
    root.style.setProperty('--nova-accent', isSpaTheme ? '#C5A880' : '#D4AF37');
    const accentText = isSpaTheme ? 'text-brand-spaGold' : 'text-brand-gold';
    const accentHover = isSpaTheme ? 'hover:text-brand-spaGold' : 'hover:text-brand-gold';
    const accentBg = isSpaTheme ? 'bg-brand-spaGold' : 'bg-brand-gold';
    const accentBorder = isSpaTheme ? 'border-brand-spaGold' : 'border-brand-gold';
    const accentHoverBorder = isSpaTheme ? 'hover:border-brand-spaGold' : 'hover:border-brand-gold';
    const activePages = ['404.html', 'coming-soon.html', 'maintenance.html'];
    const homeActive = pageKey === 'index.html' || pageKey === 'home-2.html';

    const isActive = (href) => {
      if (href === 'index.html') return pageKey === 'index.html' || pageKey === 'home-2.html';
      if (href === 'services.html') return pageKey === 'services.html';
      if (href === 'blog.html') return pageKey === 'blog.html';
      return pageKey === href;
    };

    const desktopItem = (label, href) => {
      const active = isActive(href);
      const linkClass = active
        ? `font-semibold ${accentText} transition-all py-1.5`
        : `font-semibold text-stone-300 ${accentHover} transition-all py-1.5`;
      const underlineClass = active
        ? `absolute bottom-0 w-8 h-0.5 ${accentBg} rounded-full`
        : `absolute bottom-0 w-0 h-0.5 ${accentBg} rounded-full transition-all group-hover/nav:w-8`;

      return `
        <div class="relative py-2 group/nav flex flex-col items-center">
          <a href="${href}" class="${linkClass}"${active ? ' aria-current="page"' : ''}>${label}</a>
          <span class="${underlineClass}"></span>
        </div>
      `;
    };

    const dropdownLink = ({ label, href, active }) => `
      <a href="${href}" class="nova-dropdown-link block px-4 py-2.5 text-xs font-semibold rounded-lg text-white hover:bg-stone-800 ${accentHover} transition-colors"${active ? ' aria-current="page"' : ''}>${label}</a>
    `;

    const desktopDropdown = (label, active, items) => {
      const triggerClass = active
        ? `nova-dropdown-trigger flex items-center gap-1.5 font-semibold ${accentText} border ${accentBorder} px-3.5 py-1.5 rounded-lg transition-all`
        : `nova-dropdown-trigger flex items-center gap-1.5 font-semibold text-stone-300 ${accentHover} border border-transparent ${accentHoverBorder} px-3.5 py-1.5 rounded-lg transition-all`;
      const underlineClass = active
        ? `absolute bottom-0 w-8 h-0.5 ${accentBg} rounded-full`
        : `absolute bottom-0 w-0 h-0.5 ${accentBg} rounded-full transition-all group-hover:w-8`;

      return `
        <div class="nova-dropdown relative group py-2 flex flex-col items-center">
          <button type="button" class="${triggerClass}">
            ${label} <i class="fa-solid fa-chevron-down text-xs transition-transform dropdown-arrow group-hover:rotate-180"></i>
          </button>
          <div class="nova-dropdown-menu absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[11rem] bg-[#181818] border border-stone-850 rounded-xl shadow-2xl p-2 opacity-0 pointer-events-none transition-all duration-200 z-50">
            ${items.map(dropdownLink).join('')}
          </div>
          <span class="${underlineClass}"></span>
        </div>
      `;
    };

    const desktopHomeDropdown = desktopDropdown('Home', homeActive, [
      { label: 'Home 1', href: 'index.html', active: pageKey === 'index.html' },
      { label: 'Home 2', href: 'home-2.html', active: pageKey === 'home-2.html' }
    ]);
    const pagesActive = activePages.includes(pageKey);
    const desktopPagesDropdown = desktopDropdown('Pages', pagesActive, [
      { label: '404 Error', href: '404.html', active: pageKey === '404.html' },
      { label: 'Coming Soon', href: 'coming-soon.html', active: pageKey === 'coming-soon.html' },
      { label: 'Maintenance', href: 'maintenance.html', active: pageKey === 'maintenance.html' }
    ]);

    if (headerNav) {
      headerNav.innerHTML = `
        ${desktopHomeDropdown}
        ${desktopItem('About', 'about.html')}
        ${desktopItem('Services', 'services.html')}
        ${desktopItem('Pricing', 'pricing.html')}
        ${desktopItem('Blog', 'blog.html')}
        ${desktopPagesDropdown}
        ${desktopItem('Contact', 'contact.html')}
      `;
    }

    const mobileLink = (label, href, extraClass = '', exactActive = null) => {
      const active = exactActive ?? isActive(href);
      return `<a href="${href}" class="block font-medium ${active ? accentText : accentHover} py-2 ${extraClass}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
    };

    const mobileDropdownLink = ({ label, href, active }) =>
      `<a href="${href}" class="block py-1 text-sm ${active ? accentText : `text-stone-600 dark:text-stone-400 ${accentHover}`}"${active ? ' aria-current="page"' : ''}>${label}</a>`;

    const mobileDropdown = (label, active, items) => `
      <div>
        <button class="mobile-dropdown-btn flex items-center justify-between w-full font-medium ${active ? accentText : accentHover} py-2 text-left" aria-expanded="false">
          ${label} <i class="fa-solid fa-chevron-down text-xs transition-transform dropdown-arrow"></i>
        </button>
        <div class="hidden pl-4 space-y-2 mt-2 border-l border-stone-100 dark:border-brand-darkBorder">
          ${items.map(mobileDropdownLink).join('')}
        </div>
      </div>
    `;

    if (mobileDrawer) {
      const drawerNav = mobileDrawer.querySelector('nav');
      if (drawerNav) {
        drawerNav.innerHTML = `
          ${mobileDropdown('Home', homeActive, [
            { label: 'Home 1', href: 'index.html', active: pageKey === 'index.html' },
            { label: 'Home 2', href: 'home-2.html', active: pageKey === 'home-2.html' }
          ])}
          ${mobileLink('About', 'about.html')}
          ${mobileLink('Services', 'services.html')}
          ${mobileLink('Pricing', 'pricing.html')}
          ${mobileLink('Blog', 'blog.html')}
          ${mobileDropdown('Pages', pagesActive, [
            { label: '404 Error', href: '404.html', active: pageKey === '404.html' },
            { label: 'Coming Soon', href: 'coming-soon.html', active: pageKey === 'coming-soon.html' },
            { label: 'Maintenance', href: 'maintenance.html', active: pageKey === 'maintenance.html' }
          ])}
          ${mobileLink('Contact', 'contact.html')}
          ${mobileLink('Login', 'login.html')}
          <a href="#booking-modal" data-booking-trigger class="block w-full text-center px-6 py-3 bg-gradient-to-r ${isSpaTheme ? 'from-brand-spaGreen to-brand-spaGreenDark' : 'from-brand-gold to-brand-goldDark'} text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all">Book Now</a>
        `;
      }

      const drawerFooter = Array.from(mobileDrawer.children).find((child) => child.classList.contains('border-t'));
      if (drawerFooter) {
        drawerFooter.innerHTML = `
          <div class="flex justify-center gap-4 text-stone-500">
            <a href="#" class="${accentHover}"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="${accentHover}"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="${accentHover}"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="${accentHover}"><i class="fa-brands fa-pinterest-p"></i></a>
          </div>
        `;
      }
    }

    document.querySelectorAll('#header .btn-book-now').forEach((button) => {
      button.setAttribute('href', 'register.html');
      button.removeAttribute('data-booking-trigger');
      button.classList.remove('btn-book-now');
      button.classList.add('btn-sign-up');
      button.setAttribute('aria-label', 'Sign Up');
      button.innerHTML = '<i class="fa-solid fa-user-plus text-xs"></i> SIGN UP';
    });

    document.querySelectorAll('[data-booking-trigger], .btn-book-now:not(.btn-sign-up)').forEach((button) => {
      button.setAttribute('href', '#booking-modal');
      button.setAttribute('data-booking-trigger', 'true');
      button.setAttribute('aria-label', 'Book Now');
      const icon = button.querySelector('i')?.outerHTML || '<i class="fa-regular fa-calendar-check text-xs"></i>';
      const label = button.classList.contains('btn-book-now') || /\buppercase\b/.test(button.className)
        ? 'BOOK NOW'
        : 'Book Now';
      button.innerHTML = button.classList.contains('btn-book-now') ? `${icon} ${label}` : label;
    });
  };

  const initActiveNavigation = () => {
    const pageKey = getPageKey();
    document.querySelectorAll('header nav a[href], #mobile-drawer nav a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const target = href.split('#')[0].split('?')[0] || 'index.html';
      if (target.toLowerCase() === pageKey) link.setAttribute('aria-current', 'page');
    });
  };

  const buildGlobalFooter = (variant = '') => `
    <footer class="nova-footer${variant ? ` nova-footer--${variant}` : ''}" data-nova-footer>
      <div class="nova-footer__grid">
        <div class="nova-footer__column nova-footer__brand-column">
          <a href="index.html" class="nova-footer__brand" aria-label="NOVA Salon home">
            <i class="fa-solid fa-scissors" aria-hidden="true"></i>
            <span>NOVA Salon</span>
          </a>
          <p class="nova-footer__text">
            A premium sanctuary of artistry and relaxation, creating bespoke luxury hair, nail, skincare, makeup, and wellness experiences.
          </p>
          <div class="nova-footer__social" aria-label="Social links">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter" aria-hidden="true"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="nova-footer__column">
          <h4>Services</h4>
          <ul>
            <li><a href="service-details.html?id=luxury-haircut">Luxury Haircut &amp; Color</a></li>
            <li><a href="service-details.html?id=collagen-facial">Collagen Gold Facial</a></li>
            <li><a href="service-details.html?id=nail-artistry">Signature Nail Artistry</a></li>
            <li><a href="service-details.html?id=aromatherapy-massage">Aromatherapy Spa Massages</a></li>
            <li><a href="service-details.html?id=bridal-makeup">Bridal Makeover Packages</a></li>
          </ul>
        </div>

        <div class="nova-footer__column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">Our Company Story</a></li>
            <li><a href="pricing.html">Membership Pricing</a></li>
            <li><a href="blog.html">Latest Styling News</a></li>
            <li><a href="contact.html">Location &amp; Contacts</a></li>
          </ul>
        </div>

        <div class="nova-footer__column">
          <h4>Location</h4>
          <p class="nova-footer__text">742 Evergreen Terrace, Luxury District</p>
          <a href="tel:+15557891234" class="nova-footer__phone">+1 (555) 789-1234</a>
        </div>
      </div>

      <div class="nova-footer__bottom">
        <span>&copy; 2026 NOVA Salon. All rights reserved.</span>
        <div class="nova-footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  `;

  const initGlobalFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.outerHTML = buildGlobalFooter();
      return;
    }

    const dashboardMain = document.querySelector('body[data-auth-required] main.overflow-y-auto');
    if (dashboardMain) {
      dashboardMain.insertAdjacentHTML('beforeend', buildGlobalFooter('dashboard'));
      return;
    }

    const needsUtilityShell = document.querySelector('.auth-card, .utility-card, .utility-footer');
    if (needsUtilityShell && !document.querySelector('.nova-utility-page-shell')) {
      const shell = document.createElement('main');
      shell.className = 'nova-utility-page-shell';
      Array.from(document.body.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && ['SCRIPT', 'FOOTER'].includes(node.tagName)) return;
        shell.appendChild(node);
      });
      document.body.classList.add('nova-body-with-global-footer');
      document.body.insertBefore(shell, document.body.firstChild);
    }

    const template = document.createElement('template');
    template.innerHTML = buildGlobalFooter().trim();
    const firstScript = Array.from(document.body.children).find((child) => child.tagName === 'SCRIPT');
    document.body.insertBefore(template.content.firstElementChild, firstScript || null);
  };

  const injectDrawerUtilities = (drawer) => {
    const nav = drawer.querySelector('nav');
    if (!nav || drawer.querySelector('.drawer-utilities')) return;

    const utilities = document.createElement('div');
    utilities.className = 'drawer-utilities';
    utilities.innerHTML = `
      <button type="button" class="theme-toggle drawer-utility-btn is-primary" aria-label="Toggle Theme">
        <i class="fa-solid fa-circle-half-stroke text-xs"></i>
        <span>Theme</span>
      </button>
      <button type="button" class="rtl-ltr-toggle drawer-utility-btn" aria-label="Toggle Direction">
        <i class="fa-solid fa-globe text-xs"></i>
        <span class="dir-text">LTR</span>
      </button>
    `;
    nav.parentNode.insertBefore(utilities, nav);
    syncThemeButtons(root.classList.contains('dark') ? 'dark' : 'light');
    syncDirectionButtons(root.getAttribute('dir') || 'ltr');
  };

  const initMobileDrawer = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawerOverlay = document.getElementById('drawer-overlay');

    if (!mobileDrawer) return;
    injectDrawerUtilities(mobileDrawer);

    const setDrawerState = (isOpen) => {
      mobileDrawer.classList.toggle('translate-x-full', !isOpen);
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      if (drawerOverlay) {
        drawerOverlay.classList.toggle('is-open', isOpen);
        drawerOverlay.classList.toggle('opacity-0', !isOpen);
        drawerOverlay.classList.toggle('pointer-events-none', !isOpen);
      }
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('overflow-hidden', isOpen);
    };

    const openDrawer = () => setDrawerState(true);
    const closeDrawer = () => setDrawerState(false);
    window.closeDrawer = closeDrawer;

    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.addEventListener('click', openDrawer);
    }
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    mobileDrawer.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', () => closeDrawer());
    });

    mobileDrawer.querySelectorAll('.mobile-dropdown-btn').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const content = btn.nextElementSibling;
      if (content) {
        content.classList.add('overflow-hidden', 'transition-all', 'duration-300', 'ease-in-out');
        if (content.classList.contains('hidden')) {
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
        }
      }

      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const content = btn.nextElementSibling;
        const arrow = btn.querySelector('.dropdown-arrow');
        if (!content) return;

        const willOpen = content.classList.contains('hidden');
        if (willOpen) {
          content.classList.remove('hidden');
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
          window.requestAnimationFrame(() => {
            content.style.maxHeight = `${content.scrollHeight}px`;
            content.style.opacity = '1';
          });
        } else {
          content.style.maxHeight = `${content.scrollHeight}px`;
          window.requestAnimationFrame(() => {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
          });
          content.addEventListener('transitionend', () => {
            if (btn.getAttribute('aria-expanded') === 'false') content.classList.add('hidden');
          }, { once: true });
        }
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (arrow) arrow.classList.toggle('rotate-180', willOpen);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDrawer();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= BREAKPOINT) closeDrawer();
    }, { passive: true });
  };

  const initDesktopDropdown = () => {
    const dropdowns = document.querySelectorAll('header nav .nova-dropdown');
    if (!dropdowns.length) return;

    const closeAll = () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const trigger = dropdown.querySelector('a, button');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    };

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector('a, button');
      const menu = dropdown.querySelector('div.absolute.top-full');
      if (!trigger || !menu) return;

      dropdown.classList.add('nova-dropdown');
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', (event) => {
        if (window.innerWidth < BREAKPOINT) return;
        event.preventDefault();
        const willOpen = !dropdown.classList.contains('is-open');
        closeAll();
        dropdown.classList.toggle('is-open', willOpen);
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });

      menu.querySelectorAll('a[href]').forEach((link) => {
        link.addEventListener('click', () => closeAll());
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('header nav .nova-dropdown')) closeAll();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAll();
    });
  };

  const normalizeText = (value) => String(value || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();

  const initDynamicLinks = () => {
    const serviceIds = {
      'luxury haircut styling': 'luxury-haircut',
      'luxury haircut and styling': 'luxury-haircut',
      'luxury haircut color': 'luxury-haircut',
      'luxury haircut and color': 'luxury-haircut',
      'hair cut blowout': 'luxury-haircut',
      'balayage highlight color': 'balayage',
      'balayage highlight and color': 'balayage',
      'balayage coloring': 'balayage',
      'collagen gold facial': 'collagen-facial',
      'collagen gold facials': 'collagen-facial',
      'signature gel manicure': 'nail-artistry',
      'signature nail artistry': 'nail-artistry',
      'bridal makeup styling': 'bridal-makeup',
      'bridal makeup and styling': 'bridal-makeup',
      'bridal makeover packages': 'bridal-makeup',
      'aromatherapy massage': 'aromatherapy-massage',
      'aromatherapy spa massage': 'aromatherapy-massage',
      'aromatherapy spa massages': 'aromatherapy-massage'
    };

    const serviceTitleFromLink = (link) => {
      const card = link.closest('.service-card, article, .group, [data-category], .bg-white, .dark\\:bg-brand-darkCard') || link.parentElement;
      const title = card ? card.querySelector('h3, h4') : null;
      return normalizeText(title ? title.textContent : link.textContent);
    };

    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';

      if (/^service-details\.html(?:$|#)/.test(href)) {
        const normalized = serviceTitleFromLink(link);
        const directMatch = serviceIds[normalized];
        const fuzzyMatch = Object.keys(serviceIds).find((key) => normalized.includes(key) || key.includes(normalized));
        const id = directMatch || (fuzzyMatch ? serviceIds[fuzzyMatch] : '');
        if (id) link.setAttribute('href', `service-details.html?id=${id}`);
      } else if (/^service-details\.html\?id=/.test(href)) {
        const legacyId = new URL(href, window.location.href).searchParams.get('id');
        const aliases = {
          facial: 'collagen-facial',
          'gel-manicure': 'nail-artistry',
          massage: 'aromatherapy-massage'
        };
        if (aliases[legacyId]) link.setAttribute('href', `service-details.html?id=${aliases[legacyId]}`);
      }

      if (/blog-post\.html\?post=/.test(href)) {
        const legacy = new URL(href, window.location.href).searchParams.get('post');
        const map = {
          'haircut-trends': 'hair-trends',
          'hair-color-aftercare': 'hair-aftercare',
          'pre-facial-skin-prep': 'facial-prep',
          'bridal-makeup-timeline': 'bridal-timeline',
          'summer-skincare-glow': 'summer-glow',
          'balayage-vs-highlights': 'balayage-vs-highlights',
          'wellness-habits': 'wellness-2026',
          'aromatherapy-benefits': 'wellness-2026'
        };
        link.setAttribute('href', `blog-details.html?id=${map[legacy] || 'summer-glow'}`);
      }

      if (href === 'blog-details.html') {
        const card = link.closest('article, .group, .bg-white, .dark\\:bg-brand-darkCard') || link.parentElement;
        const title = normalizeText(card?.querySelector('h3, h4, h5')?.textContent || link.textContent);
        const blogIds = {
          'top haircut trends for everyday salon guests': 'hair-trends',
          'essential aftercare tips for fresh hair color': 'hair-aftercare',
          'the complete guide to pre facial skin prep': 'facial-prep',
          'the bridal makeup timeline every bride should know': 'bridal-timeline',
          '10 skincare secrets for radiant summer glow': 'summer-glow',
          '10 skincare secrets for summer radiant glow': 'summer-glow',
          'hair balayage vs highlights the full guide': 'balayage-vs-highlights',
          'balayage vs highlights the styling guide': 'balayage-vs-highlights',
          '5 wellness habits to master in 2026': 'wellness-2026'
        };
        const match = blogIds[title] || Object.keys(blogIds).find((key) => title.includes(key) || key.includes(title));
        link.setAttribute('href', `blog-details.html?id=${match ? blogIds[match] || match : 'summer-glow'}`);
      }
    });
  };

  const setFieldError = (field, message) => {
    if (!field) return;
    const fieldId = field.id || `nova-field-${Math.random().toString(36).slice(2)}`;
    field.id = fieldId;

    const existing = document.getElementById(`${fieldId}-error`);
    if (existing) existing.remove();

    field.classList.toggle('field-invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (!message) {
      field.removeAttribute('aria-describedby');
      return;
    }

    const error = document.createElement('p');
    error.id = `${fieldId}-error`;
    error.className = 'nova-field-error';
    error.textContent = message;
    field.setAttribute('aria-describedby', error.id);

    const wrapper = field.closest('.relative') || field.closest('label') || field.parentElement;
    if (wrapper && wrapper.parentNode) wrapper.parentNode.insertBefore(error, wrapper.nextSibling);
  };

  const clearFieldErrors = (form) => {
    form.querySelectorAll('.nova-field-error').forEach((error) => error.remove());
    form.querySelectorAll('.field-invalid').forEach((field) => {
      field.classList.remove('field-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    });
  };

  const getFieldLabel = (field) => {
    const label = field.closest('div, label')?.querySelector('label');
    const explicit = label?.textContent || field.getAttribute('aria-label') || field.getAttribute('placeholder') || field.getAttribute('name');
    return explicit ? explicit.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim() : 'This field';
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const isValidPhone = (value) => /^\+?[0-9\s().-]{7,20}$/.test(value) && /\d{7,}/.test(value.replace(/\D/g, ''));

  const validateField = (field) => {
    if (!field || field.disabled || field.type === 'hidden' || field.type === 'file') return true;

    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const label = getFieldLabel(field);
    let message = '';

    if (field.required && (field.type === 'checkbox' ? !field.checked : !value)) {
      message = `${label} is required.`;
    } else if (value && field.type === 'email' && !isValidEmail(value)) {
      message = 'Enter a valid email address.';
    } else if (value && (field.type === 'tel' || /phone/i.test(field.name || label)) && !isValidPhone(value)) {
      message = 'Enter a valid phone number.';
    } else if (value && field.type === 'date') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(`${value}T00:00:00`);
      if (Number.isNaN(selected.getTime())) {
        message = 'Enter a valid date.';
      } else if (selected < today) {
        message = 'Choose today or a future date.';
      }
    } else if (field.minLength > -1 && value && String(value).length < field.minLength) {
      message = `${label} must be at least ${field.minLength} characters.`;
    } else if (field.maxLength > -1 && String(value).length > field.maxLength) {
      message = `${label} must be ${field.maxLength} characters or fewer.`;
    }

    setFieldError(field, message);
    return !message;
  };

  const validateForm = (form) => {
    let isValid = true;
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (!validateField(field)) isValid = false;
    });
    return isValid;
  };

  const setFormMessage = (form, message, type = 'success') => {
    const existing = form.parentNode ? form.parentNode.querySelector(`.nova-form-message[data-form-id="${form.dataset.formId}"]`) : null;
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = `nova-form-message is-${type}`;
    note.setAttribute('role', type === 'success' ? 'status' : 'alert');
    note.dataset.formId = form.dataset.formId;
    note.textContent = message;
    form.parentNode.insertBefore(note, form);

    window.setTimeout(() => {
      if (note.parentNode) note.remove();
    }, 6000);
  };

  const getSuccessMessage = (form) => {
    if (form.dataset.successMessage) return form.dataset.successMessage;
    if (form.classList.contains('newsletter-form')) return 'Thank you. You have been added to the NOVA newsletter.';
    if (form.id === 'contact-form') return 'Thank you. Your message has been sent and our concierge team will follow up shortly.';
    if (form.dataset.novaForm === 'comment') return 'Your comment has been received and is awaiting review.';
    if (form.dataset.novaForm === 'settings') return 'Settings saved successfully.';
    return 'Saved successfully.';
  };

  const isAppointmentForm = (form) => {
    if (form.dataset.novaForm === 'appointment') return true;
    if (form.closest('#appointment-modal, #appointment')) return true;
    const submitText = form.querySelector('button[type="submit"], button:not([type])')?.textContent || '';
    return /appointment|booking|session request/i.test(submitText) &&
      Boolean(form.querySelector('input[type="date"]')) &&
      Boolean(form.querySelector('input[type="tel"]'));
  };

  const fieldText = (field) => {
    const label = getFieldLabel(field);
    return normalizeText(`${field.name || ''} ${field.id || ''} ${field.placeholder || ''} ${label}`);
  };

  const findFormField = (form, keys, type) => {
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    if (type) {
      const byType = fields.find((field) => field.type === type);
      if (byType) return byType;
    }
    return fields.find((field) => keys.some((key) => fieldText(field).includes(key)));
  };

  const nameAppointmentFields = (form) => {
    const fields = {
      name: findFormField(form, ['full name', 'name']),
      phone: findFormField(form, ['phone', 'telephone']),
      service: findFormField(form, ['service category', 'service']),
      specialist: findFormField(form, ['preferred specialist', 'specialist', 'stylist']),
      date: findFormField(form, ['appointment date', 'date'], 'date'),
      bookingTime: findFormField(form, ['booking time', 'time'])
    };

    Object.entries(fields).forEach(([name, field]) => {
      if (field && !field.name) field.name = name;
    });

    ['name', 'phone', 'service', 'specialist', 'date'].forEach((key) => {
      if (fields[key]) fields[key].required = true;
    });

    if (fields.date && !fields.date.min) fields.date.min = todayISO();
    return fields;
  };

  const fieldValue = (field) => field ? field.value.trim() : '';

  const getCurrentUser = () => {
    try {
      return JSON.parse(storage.get('currentUser') || 'null');
    } catch (error) {
      return null;
    }
  };

  const getServiceTitleFromForm = (form) => {
    if (form.dataset.serviceId && window.NOVA_SERVICES) {
      const service = window.NOVA_SERVICES.find((item) => item.id === form.dataset.serviceId);
      if (service) return service.title;
    }
    const pageTitle = document.querySelector('h1')?.textContent?.trim();
    if (/service-details\.html$/i.test(window.location.pathname) && pageTitle) return pageTitle;
    return '';
  };

  const serializeAppointment = (form) => {
    const fields = nameAppointmentFields(form);
    const currentUser = getCurrentUser();
    const appointment = {
      id: makeId('appointment'),
      userId: currentUser?.id || '',
      name: fieldValue(fields.name) || currentUser?.fullName || '',
      phone: fieldValue(fields.phone) || currentUser?.phone || '',
      service: fieldValue(fields.service) || getServiceTitleFromForm(form),
      specialist: fieldValue(fields.specialist) || 'Any Available Stylist',
      date: fieldValue(fields.date),
      bookingTime: fieldValue(fields.bookingTime) || 'Pending confirmation',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    return { appointment, fields };
  };

  const setButtonLoading = (button, isLoading, label = 'Booking...') => {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalHtml = button.innerHTML;
      button.disabled = true;
      button.classList.add('is-disabled');
      button.innerHTML = `<span class="nova-btn-spinner" aria-hidden="true"></span>${label}`;
      return;
    }
    button.disabled = false;
    button.classList.remove('is-disabled');
    if (button.dataset.originalHtml) button.innerHTML = button.dataset.originalHtml;
    delete button.dataset.originalHtml;
  };

  const hideAppointmentModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const handleAppointmentSubmit = (form) => {
    form.dataset.formId = form.dataset.formId || `appointment-${Math.random().toString(36).slice(2)}`;
    form.setAttribute('novalidate', 'novalidate');
    nameAppointmentFields(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      clearFieldErrors(form);

      const { appointment, fields } = serializeAppointment(form);
      let isValid = validateForm(form);

      if (!appointment.service) {
        setFieldError(fields.service, 'Service is required.');
        isValid = false;
      }

      if (!appointment.specialist) {
        setFieldError(fields.specialist, 'Specialist is required.');
        isValid = false;
      }

      if (!isValid) {
        const firstInvalid = form.querySelector('.field-invalid');
        if (firstInvalid) firstInvalid.focus({ preventScroll: false });
        setFormMessage(form, 'Please review the highlighted fields.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"], button:not([type])');
      const modal = form.closest('#appointment-modal');
      setButtonLoading(submitBtn, true);
      form.classList.add('form-submitting');

      window.setTimeout(async () => {
        const appointments = getArray('appointments');
        appointments.push(appointment);
        setArray('appointments', appointments);

        form.reset();
        setButtonLoading(submitBtn, false);
        form.classList.remove('form-submitting');
        hideAppointmentModal(modal);

        await fireAlert({
          icon: 'success',
          title: 'Appointment Booked!',
          text: 'Your appointment has been submitted successfully. Our team will contact you shortly to confirm your booking.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D4AF37'
        });

      }, 1200);
    });

    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => validateField(field));
      field.addEventListener('blur', () => validateField(field));
    });
  };

  const initAppointmentForms = () => {
    document.querySelectorAll('input[type="date"]').forEach((field) => {
      if (!field.min) field.min = todayISO();
    });

    document.querySelectorAll('form').forEach((form) => {
      if (!isAppointmentForm(form) || form.dataset.appointmentReady === 'true') return;
      form.dataset.novaForm = 'appointment';
      form.dataset.appointmentReady = 'true';
      handleAppointmentSubmit(form);
    });
  };

  const initFormValidation = () => {
    document.querySelectorAll('form').forEach((form, index) => {
      if (
        form.id === 'login-form' ||
        form.id === 'register-form' ||
        form.dataset.novaSkip === 'true' ||
        form.dataset.appointmentReady === 'true'
      ) return;

      const shouldValidate = form.matches('.newsletter-form, #contact-form, [data-nova-form]') ||
        Boolean(form.querySelector('input[required], select[required], textarea[required]'));
      if (!shouldValidate) return;

      form.dataset.formId = form.dataset.formId || `nova-form-${index}`;
      form.setAttribute('novalidate', 'novalidate');

      form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!validateForm(form)) {
          const firstInvalid = form.querySelector('.field-invalid');
          if (firstInvalid) firstInvalid.focus({ preventScroll: false });
          setFormMessage(form, 'Please review the highlighted fields.', 'error');
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('is-disabled');
        }
        form.classList.add('form-submitting');
        setFormMessage(form, getSuccessMessage(form), 'success');

        const resetOnSuccess = form.classList.contains('newsletter-form') ||
          form.id === 'contact-form' ||
          form.dataset.novaForm === 'comment' ||
          form.dataset.resetOnSuccess === 'true';
        if (resetOnSuccess) form.reset();

        window.setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-disabled');
          }
          form.classList.remove('form-submitting');
        }, 700);
      });
    });
  };

  const initImages = () => {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (!img.hasAttribute('alt')) img.setAttribute('alt', 'NOVA Salon experience');
    });
  };

  const initLogout = () => {
    document.querySelectorAll('[data-logout], a[href="login.html"]').forEach((link) => {
      if (!/log\s*out/i.test(link.textContent || '') && !link.hasAttribute('data-logout')) return;
      link.setAttribute('data-logout', 'true');
      link.addEventListener('click', () => {
        storage.remove('currentUser');
        storage.remove('isLoggedIn');
        storage.remove('role');
      });
    });
  };

  initScrollPosition();
  initAOS();
  initDarkMode();
  initDirection();
  initGlobalControlClicks();
  initHeader();
  initNavigationStructure();
  initMobileDrawer();
  initDesktopDropdown();
  initActiveNavigation();
  initGlobalFooter();
  initDynamicLinks();
  initImages();
  initAppointmentForms();
  initFormValidation();
  initLogout();
});
