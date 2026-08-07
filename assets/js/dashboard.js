document.addEventListener('DOMContentLoaded', () => {
  const store = window.NOVAStorage || {
    getArray(key) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
      } catch (error) {
        return [];
      }
    },
    setArray(key, value) {
      try { localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : [])); } catch (error) { /* localStorage can be unavailable. */ }
    },
    makeId(prefix = 'nova') {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    },
    storage: {
      get(key) {
        try { return localStorage.getItem(key); } catch (error) { return null; }
      },
      set(key, value) {
        try { localStorage.setItem(key, value); } catch (error) { /* localStorage can be unavailable. */ }
      },
      remove(key) {
        try { localStorage.removeItem(key); } catch (error) { /* localStorage can be unavailable. */ }
      }
    }
  };

  const alertBox = (options) => {
    if (window.NOVASwal) return window.NOVASwal(options);
    window.alert(`${options.title || ''}\n\n${options.text || options.html || ''}`.replace(/<[^>]+>/g, ' ').trim());
    return Promise.resolve({ isConfirmed: true });
  };

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

  const todayISO = () => new Date().toISOString().split('T')[0];
  const formatDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set';
  const formatDateTime = (value) => value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set';
  const money = (value) => `$${Number(value || 0).toFixed(2)}`;
  const normalize = (value) => String(value || '').toLowerCase();
  const parsePrice = (value) => Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;

  const getCurrentUser = () => {
    try {
      return JSON.parse(store.storage.get('currentUser') || 'null');
    } catch (error) {
      return null;
    }
  };

  const setCurrentUser = (user) => {
    store.storage.set('currentUser', JSON.stringify(user));
    document.querySelectorAll('[data-current-user-name]').forEach((node) => {
      node.textContent = user.fullName;
    });
    document.querySelectorAll('[data-current-user-email]').forEach((node) => {
      node.textContent = user.email;
    });
  };

  const badge = (status = 'Pending') => {
    const normalized = normalize(status);
    const cls = normalized.includes('approved') || normalized.includes('confirmed') || normalized.includes('active') || normalized.includes('published') || normalized.includes('paid')
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400'
      : normalized.includes('cancel') || normalized.includes('inactive') || normalized.includes('draft')
        ? 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400';
    return `<span class="px-2 py-0.5 ${cls} rounded-full font-bold">${esc(status)}</span>`;
  };

  const serviceSeeds = [
    { id: 'luxury-haircut', title: 'Luxury Haircut & Styling', category: 'Hair Care', price: 85, duration: '60 mins', status: 'Active', image: './assets/images/img9.jpg' },
    { id: 'balayage', title: 'Balayage Highlight & Color', category: 'Hair Care', price: 180, duration: '180 mins', status: 'Active', image: './assets/images/img10.jpg' },
    { id: 'facial', title: 'Collagen Gold Facial', category: 'Skincare', price: 120, duration: '75 mins', status: 'Active', image: './assets/images/img11.jpg' },
    { id: 'gel-manicure', title: 'Signature Gel Manicure', category: 'Nail Art', price: 55, duration: '45 mins', status: 'Active', image: './assets/images/img12.jpg' },
    { id: 'bridal-makeup', title: 'Bridal Makeup & Styling', category: 'Makeup', price: 250, duration: '120 mins', status: 'Active', image: './assets/images/img13.jpg' },
    { id: 'massage', title: 'Aromatherapy Massage', category: 'Spa Rituals', price: 95, duration: '90 mins', status: 'Active', image: './assets/images/img14.jpg' }
  ];

  const blogSeeds = [
    { id: 'hair-trends', title: 'Top Haircut Trends For Everyday Salon Guests', category: 'Hair Care', author: 'Sophia Laurent', publishDate: '2026-01-15', status: 'Published' },
    { id: 'hair-aftercare', title: 'Essential Aftercare Tips For Fresh Hair Color', category: 'Hair Color', author: 'Liam Thorne', publishDate: '2026-01-10', status: 'Published' },
    { id: 'facial-prep', title: 'The Complete Guide To Pre-Facial Skin Prep', category: 'Skincare', author: 'Emma Watson', publishDate: '2026-01-05', status: 'Published' },
    { id: 'bridal-timeline', title: 'The Bridal Makeup Timeline Every Bride Should Know', category: 'Makeup', author: 'Mia Chen', publishDate: '2026-02-12', status: 'Published' },
    { id: 'summer-glow', title: '10 Skincare Secrets for Radiant Summer Glow', category: 'Skincare', author: 'Emma Watson', publishDate: '2026-07-28', status: 'Published' },
    { id: 'balayage-vs-highlights', title: 'Hair Balayage vs Highlights: The Full Guide', category: 'Hair Color', author: 'Sophia Laurent', publishDate: '2026-08-02', status: 'Published' },
    { id: 'wellness-2026', title: '5 Wellness Habits to Master in 2026', category: 'Lifestyle', author: 'Liam Thorne', publishDate: '2026-08-05', status: 'Published' }
  ];

  const seedData = () => {
    if (!store.getArray('services').length) store.setArray('services', serviceSeeds);
    if (!store.getArray('blogs').length) store.setArray('blogs', blogSeeds);
    if (!store.getArray('staff').length) {
      store.setArray('staff', [
        { id: 'staff-sophia', fullName: 'Sophia Laurent', title: 'Creative Director', specialty: 'Hair Design', email: 'sophia@nova.com', phone: '+1 (555) 111-1000', status: 'Active' },
        { id: 'staff-liam', fullName: 'Liam Thorne', title: 'Color Expert', specialty: 'Balayage', email: 'liam@nova.com', phone: '+1 (555) 111-2000', status: 'Active' },
        { id: 'staff-emma', fullName: 'Emma Watson', title: 'Senior Aesthetician', specialty: 'Skincare', email: 'emma@nova.com', phone: '+1 (555) 111-3000', status: 'Active' },
        { id: 'staff-mia', fullName: 'Mia Chen', title: 'Nail and Bridal Artist', specialty: 'Nails and Makeup', email: 'mia@nova.com', phone: '+1 (555) 111-4000', status: 'Active' }
      ]);
    }
    if (!store.getArray('gallery').length) {
      store.setArray('gallery', [
        { id: 'gallery-1', title: 'Hair Styling Suite', category: 'Hair', image: './assets/images/img1.jpg', status: 'Published' },
        { id: 'gallery-2', title: 'Gold Facial Ritual', category: 'Skincare', image: './assets/images/img11.jpg', status: 'Published' },
        { id: 'gallery-3', title: 'Nail Atelier Finish', category: 'Nails', image: './assets/images/img12.jpg', status: 'Published' }
      ]);
    }
    if (!store.getArray('testimonials').length) {
      store.setArray('testimonials', [
        { id: 'testimonial-1', name: 'Victoria Sterling', service: 'Luxury Haircut & Styling', rating: 5, message: 'The most polished blowout I have had this year.', status: 'Published' },
        { id: 'testimonial-2', name: 'Alexandra Dubois', service: 'Collagen Gold Facial', rating: 5, message: 'My skin looked calm and luminous for days.', status: 'Published' }
      ]);
    }
    if (!store.getArray('appointments').length) {
      const user = getCurrentUser();
      store.setArray('appointments', [
        { id: 'appt-1', userId: user?.role === 'customer' ? user.id : '', name: user?.role === 'customer' ? user.fullName : 'Victoria Sterling', phone: '+1 (555) 000-1111', service: 'Luxury Haircut & Styling', specialist: 'Sophia Laurent', date: todayISO(), bookingTime: '3:00 PM', status: 'Confirmed', createdAt: new Date().toISOString() },
        { id: 'appt-2', userId: '', name: 'Alexandra Dubois', phone: '+1 (555) 000-2222', service: 'Collagen Gold Facial', specialist: 'Emma Watson', date: todayISO(), bookingTime: '11:30 AM', status: 'Pending', createdAt: new Date().toISOString() }
      ]);
    }
    if (!store.getArray('notifications').length) {
      store.setArray('notifications', [
        { id: 'note-1', title: 'Appointment Confirmed', message: 'Your next NOVA appointment has been confirmed.', status: 'Unread', createdAt: new Date().toISOString() },
        { id: 'note-2', title: 'Reward Available', message: 'A $25 service credit is available for your next visit.', status: 'Unread', createdAt: new Date().toISOString() }
      ]);
    }
    if (!store.getArray('settings').length) {
      store.setArray('settings', [{ id: 'settings-main', salonName: 'NOVA Salon & Spa', email: 'concierge@nova-salon.com', location: '742 Evergreen Terrace, Luxury District', currency: 'USD' }]);
    }
  };

  const sidebarShell = (items, mode) => `
    ${items.map((item, index) => `
      <a href="#" data-panel="${item.panel}" class="sidebar-link flex items-center gap-3 px-4 py-3 ${index === 0 ? 'bg-brand-gold/10 text-brand-gold border-brand-gold' : 'text-stone-500 border-transparent hover:text-brand-gold'} border-l-4 rounded-r-lg font-semibold transition-all">
        <i class="${item.icon} w-5"></i> ${esc(item.label)}
      </a>
    `).join('')}
    <a href="login.html" data-logout class="sidebar-link flex items-center gap-3 px-4 py-3 text-red-500 border-l-4 border-transparent hover:bg-red-50 dark:hover:bg-red-950/20 rounded-r-lg transition-all">
      <i class="fa-solid fa-right-from-bracket w-5"></i> Logout
    </a>
  `;

  const initSidebarDrawer = () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    if (sidebarToggle && sidebar) sidebarToggle.addEventListener('click', () => sidebar.classList.remove('-translate-x-full'));
    if (sidebarClose && sidebar) sidebarClose.addEventListener('click', () => sidebar.classList.add('-translate-x-full'));
  };

  const switchPanel = (panelId) => {
    const sidebar = document.getElementById('sidebar');
    document.querySelectorAll('.sidebar-link[data-panel]').forEach((link) => {
      const active = link.getAttribute('data-panel') === panelId;
      link.classList.toggle('bg-brand-gold/10', active);
      link.classList.toggle('text-brand-gold', active);
      link.classList.toggle('border-brand-gold', active);
      link.classList.toggle('text-stone-500', !active);
      link.classList.toggle('border-transparent', !active);
    });
    document.querySelectorAll('.dashboard-panel').forEach((panel) => panel.classList.add('hidden'));
    const activePanel = document.getElementById(`${panelId}-panel`);
    if (activePanel) activePanel.classList.remove('hidden');
    if (window.innerWidth < 1024 && sidebar) sidebar.classList.add('-translate-x-full');
  };

  const initPanelSwitching = () => {
    document.querySelectorAll('[data-panel]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        const panelId = trigger.getAttribute('data-panel');
        if (!panelId) return;
        event.preventDefault();
        switchPanel(panelId);
      });
    });
  };

  const initLogout = () => {
    document.addEventListener('click', (event) => {
      const logout = event.target.closest('[data-logout]');
      if (!logout) return;
      store.storage.remove('currentUser');
      store.storage.remove('isLoggedIn');
      store.storage.remove('role');
    });
  };

  const initNotifications = () => {
    const bellBtn = document.getElementById('bell-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    if (!bellBtn || !notifDropdown) return;

    bellBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => notifDropdown.classList.add('hidden'));
  };

  const renderCharts = () => {
    if (typeof Chart === 'undefined') return;
    const revenueCtx = document.getElementById('revenueChart');
    const categoryCtx = document.getElementById('categoryChart');

    if (revenueCtx && !revenueCtx.dataset.chartReady) {
      revenueCtx.dataset.chartReady = 'true';
      const ctx = revenueCtx.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [{ label: 'Revenue', data: [8200, 9400, 11500, 10200, 13800, 14200, 16500], borderColor: '#D4AF37', borderWidth: 3, backgroundColor: gradient, fill: true, tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.08)' } } } }
      });
    }

    if (categoryCtx && !categoryCtx.dataset.chartReady) {
      categoryCtx.dataset.chartReady = 'true';
      new Chart(categoryCtx, {
        type: 'doughnut',
        data: { labels: ['Hair', 'Skincare', 'Nails', 'Spa', 'Makeup'], datasets: [{ data: [38, 24, 15, 13, 10], backgroundColor: ['#D4AF37', '#D9A38F', '#B76E79', '#2E5A44', '#AA8C2C'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } } } }
      });
    }
  };

  const users = () => store.getArray('users');
  const saveUsers = (value) => store.setArray('users', value);
  const services = () => store.getArray('services');
  const appointments = () => store.getArray('appointments');
  const customerAppointments = () => {
    const current = getCurrentUser();
    return appointments().filter((appointment) =>
      appointment.userId === current?.id ||
      normalize(appointment.name) === normalize(current?.fullName)
    );
  };

  const adminCollections = {
    customers: {
      key: 'users',
      label: 'Customers',
      singular: 'Customer',
      filter: (item) => item.role !== 'admin',
      columns: [
        ['fullName', 'Name'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['createdAt', 'Joined'],
        ['role', 'Role']
      ],
      fields: [
        { name: 'fullName', label: 'Full Name', required: true },
        { name: 'username', label: 'Username', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'role', label: 'Role', type: 'select', options: ['customer', 'admin'], required: true }
      ]
    },
    appointments: {
      key: 'appointments',
      label: 'Appointments',
      singular: 'Appointment',
      columns: [
        ['name', 'Guest'],
        ['service', 'Service'],
        ['specialist', 'Specialist'],
        ['date', 'Date'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'name', label: 'Guest Name', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'service', label: 'Service', type: 'select', options: () => services().map((service) => service.title), required: true },
        { name: 'specialist', label: 'Specialist', type: 'select', options: () => store.getArray('staff').map((staff) => staff.fullName), required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'bookingTime', label: 'Booking Time', type: 'select', options: ['10:30 AM', '1:00 PM', '3:00 PM', '4:00 PM', 'Pending confirmation'], required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], required: true }
      ]
    },
    services: {
      key: 'services',
      label: 'Services',
      singular: 'Service',
      columns: [
        ['title', 'Service'],
        ['category', 'Category'],
        ['price', 'Price'],
        ['duration', 'Duration'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'title', label: 'Service Title', required: true },
        { name: 'category', label: 'Category', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'duration', label: 'Duration', required: true },
        { name: 'image', label: 'Image URL' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], required: true }
      ]
    },
    blogs: {
      key: 'blogs',
      label: 'Blogs',
      singular: 'Blog',
      columns: [
        ['title', 'Title'],
        ['category', 'Category'],
        ['author', 'Author'],
        ['publishDate', 'Publish Date'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'title', label: 'Article Title', required: true },
        { name: 'category', label: 'Category', required: true },
        { name: 'author', label: 'Author', required: true },
        { name: 'publishDate', label: 'Publish Date', type: 'date', required: true },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'], required: true }
      ]
    },
    testimonials: {
      key: 'testimonials',
      label: 'Testimonials',
      singular: 'Testimonial',
      columns: [
        ['name', 'Name'],
        ['service', 'Service'],
        ['rating', 'Rating'],
        ['message', 'Message'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'name', label: 'Client Name', required: true },
        { name: 'service', label: 'Service', type: 'select', options: () => services().map((service) => service.title), required: true },
        { name: 'rating', label: 'Rating', type: 'number', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'], required: true }
      ]
    },
    gallery: {
      key: 'gallery',
      label: 'Gallery',
      singular: 'Gallery Item',
      columns: [
        ['title', 'Title'],
        ['category', 'Category'],
        ['image', 'Image'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'title', label: 'Image Title', required: true },
        { name: 'category', label: 'Category', required: true },
        { name: 'image', label: 'Image URL', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'], required: true }
      ]
    },
    staff: {
      key: 'staff',
      label: 'Staff',
      singular: 'Staff Member',
      columns: [
        ['fullName', 'Name'],
        ['title', 'Role'],
        ['specialty', 'Specialty'],
        ['email', 'Email'],
        ['status', 'Status']
      ],
      fields: [
        { name: 'fullName', label: 'Full Name', required: true },
        { name: 'title', label: 'Role Title', required: true },
        { name: 'specialty', label: 'Specialty', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], required: true }
      ]
    }
  };

  const collectionData = (collectionName) => {
    const config = adminCollections[collectionName];
    const data = store.getArray(config.key);
    return config.filter ? data.filter(config.filter) : data;
  };

  const saveCollectionData = (collectionName, rows) => {
    const config = adminCollections[collectionName];
    if (collectionName === 'customers') {
      const admins = users().filter((user) => user.role === 'admin');
      store.setArray(config.key, admins.concat(rows.map((row) => ({ ...row, role: row.role || 'customer' }))));
      return;
    }
    store.setArray(config.key, rows);
  };

  const adminState = {};

  const valueForDisplay = (key, value) => {
    if (key === 'status' || key === 'role') return key === 'status' ? badge(value) : `<span class="capitalize">${esc(value)}</span>`;
    if (/date/i.test(key) && /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return formatDate(value);
    if (key === 'createdAt') return formatDateTime(value);
    if (key === 'price') return money(value);
    if (key === 'image') return `<span class="inline-flex items-center gap-2"><i class="fa-regular fa-image text-brand-gold"></i><span class="max-w-[140px] truncate">${esc(value)}</span></span>`;
    return esc(value || '-');
  };

  const renderCrudTable = (collectionName) => {
    const config = adminCollections[collectionName];
    const mount = document.getElementById(`${collectionName}-table`);
    if (!mount) return;

    const state = adminState[collectionName] || { page: 1, sortKey: config.columns[0][0], sortDir: 'asc', search: '' };
    adminState[collectionName] = state;

    const allRows = collectionData(collectionName);
    const filtered = allRows.filter((row) => normalize(Object.values(row).join(' ')).includes(normalize(state.search)));
    const sorted = filtered.sort((a, b) => {
      const av = normalize(a[state.sortKey]);
      const bv = normalize(b[state.sortKey]);
      return state.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    const perPage = 5;
    const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
    state.page = Math.min(state.page, totalPages);
    const visible = sorted.slice((state.page - 1) * perPage, state.page * perPage);

    mount.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead class="bg-stone-50 dark:bg-brand-darkBg/60 text-stone-400 border-b border-stone-150 dark:border-brand-darkBorder">
            <tr>
              ${config.columns.map(([key, label]) => `
                <th class="p-4">
                  <button type="button" data-crud-sort="${collectionName}:${key}" class="font-bold uppercase tracking-widest hover:text-brand-gold">
                    ${esc(label)} ${state.sortKey === key ? `<i class="fa-solid fa-arrow-${state.sortDir === 'asc' ? 'up' : 'down'} ml-1"></i>` : ''}
                  </button>
                </th>
              `).join('')}
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-brand-darkBorder">
            ${visible.length ? visible.map((row) => `
              <tr>
                ${config.columns.map(([key]) => `<td class="p-4 ${key === config.columns[0][0] ? 'font-bold text-stone-900 dark:text-white' : ''}">${valueForDisplay(key, row[key])}</td>`).join('')}
                <td class="p-4 text-right whitespace-nowrap">
                  <button type="button" data-crud-view="${collectionName}:${row.id}" class="text-stone-400 hover:text-brand-gold mr-3" title="View"><i class="fa-regular fa-eye"></i></button>
                  <button type="button" data-crud-edit="${collectionName}:${row.id}" class="text-stone-400 hover:text-brand-gold mr-3" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button type="button" data-crud-delete="${collectionName}:${row.id}" class="text-red-500 hover:text-red-700" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
              </tr>
            `).join('') : `<tr><td colspan="${config.columns.length + 1}" class="p-6 text-center text-stone-400">No records found.</td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-stone-100 dark:border-brand-darkBorder">
        <span class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">${filtered.length} ${esc(config.label)}</span>
        <div class="flex gap-2">
          ${Array.from({ length: totalPages }, (_, index) => `
            <button type="button" data-crud-page="${collectionName}:${index + 1}" class="nova-pagination-btn w-9 h-9 rounded-full border border-stone-150 dark:border-brand-darkBorder text-xs font-bold hover:border-brand-gold hover:text-brand-gold" ${index + 1 === state.page ? 'aria-current="page"' : ''}>${index + 1}</button>
          `).join('')}
        </div>
      </div>
    `;
  };

  const renderAllCrudTables = () => Object.keys(adminCollections).forEach(renderCrudTable);

  const fieldInput = (field, value = '') => {
    const id = `crud-${field.name}`;
    const common = `id="${id}" data-crud-field="${field.name}" ${field.required ? 'required' : ''} class="swal2-input nova-swal-field"`;
    const options = typeof field.options === 'function' ? field.options() : field.options;
    if (field.type === 'select') {
      return `<select ${common}>${(options || []).map((option) => `<option value="${esc(option)}" ${String(value) === String(option) ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select>`;
    }
    if (field.type === 'textarea') {
      return `<textarea id="${id}" data-crud-field="${field.name}" ${field.required ? 'required' : ''} class="swal2-textarea nova-swal-field" placeholder="${esc(field.label)}">${esc(value)}</textarea>`;
    }
    return `<input ${common} type="${field.type || 'text'}" value="${esc(value)}" placeholder="${esc(field.label)}" ${field.type === 'date' ? `min="${todayISO()}"` : ''}>`;
  };

  const openRecordForm = async (collectionName, record = null) => {
    const config = adminCollections[collectionName];
    const isEdit = Boolean(record);
    const html = `<div class="nova-swal-grid">${config.fields.map((field) => `
      <label class="nova-swal-label">
        <span>${esc(field.label)}${field.required ? ' *' : ''}</span>
        ${fieldInput(field, record?.[field.name] || '')}
      </label>
    `).join('')}</div>`;

    const result = await alertBox({
      title: `${isEdit ? 'Edit' : 'Create'} ${config.singular}`,
      html,
      showCancelButton: true,
      confirmButtonText: isEdit ? 'Save Changes' : 'Create',
      confirmButtonColor: '#D4AF37',
      focusConfirm: false,
      preConfirm: () => {
        const popup = window.Swal ? Swal.getPopup() : document;
        const values = {};
        let valid = true;
        config.fields.forEach((field) => {
          const input = popup.querySelector(`[data-crud-field="${field.name}"]`);
          const value = input ? input.value.trim() : '';
          if (field.required && !value) valid = false;
          values[field.name] = value;
        });
        if (!valid && window.Swal) {
          Swal.showValidationMessage('Please complete all required fields.');
          return false;
        }
        return valid ? values : false;
      }
    });

    if (!result.isConfirmed || !result.value) return;

    const rows = collectionData(collectionName);
    const nextRecord = {
      ...(record || {}),
      ...result.value,
      id: record?.id || store.makeId(collectionName),
      createdAt: record?.createdAt || new Date().toISOString()
    };

    if (collectionName === 'customers') {
      nextRecord.role = nextRecord.role || 'customer';
      nextRecord.password = nextRecord.password || record?.password || 'customer123';
    }

    const nextRows = isEdit
      ? rows.map((row) => (row.id === record.id ? nextRecord : row))
      : rows.concat(nextRecord);
    saveCollectionData(collectionName, nextRows);
    renderCrudTable(collectionName);
    renderAdminDashboardPanel();
    await alertBox({ icon: 'success', title: `${config.singular} Saved`, text: 'Your changes have been saved.', confirmButtonColor: '#D4AF37' });
  };

  const viewRecord = async (collectionName, id) => {
    const config = adminCollections[collectionName];
    const record = collectionData(collectionName).find((row) => row.id === id);
    if (!record) return;
    await alertBox({
      title: config.singular,
      html: `<div class="text-left text-sm space-y-2">${Object.entries(record).map(([key, value]) => `<p><strong>${esc(key)}:</strong> ${esc(value)}</p>`).join('')}</div>`,
      confirmButtonColor: '#D4AF37'
    });
  };

  const deleteRecord = async (collectionName, id) => {
    const config = adminCollections[collectionName];
    const record = collectionData(collectionName).find((row) => row.id === id);
    if (!record) return;
    const result = await alertBox({
      icon: 'warning',
      title: `Delete ${config.singular}?`,
      text: 'This record will be removed from LocalStorage.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#D4AF37'
    });
    if (!result.isConfirmed) return;
    saveCollectionData(collectionName, collectionData(collectionName).filter((row) => row.id !== id));
    renderCrudTable(collectionName);
    renderAdminDashboardPanel();
    await alertBox({ icon: 'success', title: 'Deleted', text: 'The record was removed.', confirmButtonColor: '#D4AF37' });
  };

  const initAdminCrud = () => {
    document.addEventListener('input', (event) => {
      const input = event.target.closest('[data-crud-search]');
      if (!input) return;
      const collectionName = input.getAttribute('data-crud-search');
      adminState[collectionName] = { ...(adminState[collectionName] || {}), search: input.value, page: 1 };
      renderCrudTable(collectionName);
    });

    document.addEventListener('click', (event) => {
      const create = event.target.closest('[data-crud-create]');
      const sort = event.target.closest('[data-crud-sort]');
      const page = event.target.closest('[data-crud-page]');
      const view = event.target.closest('[data-crud-view]');
      const edit = event.target.closest('[data-crud-edit]');
      const remove = event.target.closest('[data-crud-delete]');

      if (create) {
        openRecordForm(create.getAttribute('data-crud-create'));
        return;
      }
      if (sort) {
        const [collectionName, key] = sort.getAttribute('data-crud-sort').split(':');
        const state = adminState[collectionName] || {};
        adminState[collectionName] = { ...state, sortKey: key, sortDir: state.sortKey === key && state.sortDir === 'asc' ? 'desc' : 'asc' };
        renderCrudTable(collectionName);
        return;
      }
      if (page) {
        const [collectionName, pageNumber] = page.getAttribute('data-crud-page').split(':');
        adminState[collectionName] = { ...(adminState[collectionName] || {}), page: Number(pageNumber) };
        renderCrudTable(collectionName);
        return;
      }
      if (view) {
        const [collectionName, id] = view.getAttribute('data-crud-view').split(':');
        viewRecord(collectionName, id);
        return;
      }
      if (edit) {
        const [collectionName, id] = edit.getAttribute('data-crud-edit').split(':');
        const record = collectionData(collectionName).find((row) => row.id === id);
        if (record) openRecordForm(collectionName, record);
        return;
      }
      if (remove) {
        const [collectionName, id] = remove.getAttribute('data-crud-delete').split(':');
        deleteRecord(collectionName, id);
      }
    });
  };

  const crudPanel = (collectionName) => {
    const config = adminCollections[collectionName];
    return `
      <div id="${collectionName}-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-150 dark:border-brand-darkBorder">
            <div>
              <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">${esc(config.label)}</h3>
              <p class="text-xs text-stone-400 mt-1">Search, sort, paginate, view, edit, and delete ${esc(config.label.toLowerCase())}.</p>
            </div>
            <button type="button" data-crud-create="${collectionName}" class="px-4 py-2 bg-brand-gold text-white text-xs font-semibold rounded-lg hover:shadow transition-all">
              <i class="fa-solid fa-plus mr-1"></i> Add ${esc(config.singular)}
            </button>
          </div>
          <div class="relative max-w-sm">
            <input type="search" data-crud-search="${collectionName}" placeholder="Search ${esc(config.label.toLowerCase())}..." class="nova-table-control w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-lg focus:outline-none focus:border-brand-gold text-xs dark:text-white">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 text-xs"></i>
          </div>
          <div id="${collectionName}-table"></div>
        </div>
      </div>
    `;
  };

  const adminMetricCard = (label, value, icon, note = '') => `
    <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder p-6 rounded-2xl flex items-center justify-between shadow-sm">
      <div>
        <span class="text-[10px] uppercase font-bold tracking-widest text-stone-400">${esc(label)}</span>
        <h4 class="font-serif text-3xl font-bold mt-1 text-stone-900 dark:text-white">${esc(value)}</h4>
        <span class="text-[10px] text-brand-gold font-bold block mt-1">${esc(note)}</span>
      </div>
      <span class="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xl shrink-0"><i class="${icon}"></i></span>
    </div>
  `;

  const renderAdminDashboardPanel = () => {
    const panel = document.getElementById('dashboard-panel');
    if (!panel) return;
    const appts = appointments();
    const serviceList = services();
    const customers = users().filter((user) => user.role !== 'admin');
    const blogList = store.getArray('blogs');
    const revenue = appts.reduce((sum, appointment) => {
      const service = serviceList.find((item) => item.title === appointment.service);
      return sum + parsePrice(service?.price || 0);
    }, 0);

    panel.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${adminMetricCard('Total Customers', customers.length, 'fa-regular fa-user', 'LocalStorage users')}
        ${adminMetricCard('Appointments', appts.length, 'fa-regular fa-calendar-check', `${appts.filter((item) => item.status === 'Pending').length} pending`)}
        ${adminMetricCard('Revenue', money(revenue), 'fa-solid fa-dollar-sign', 'Estimated from services')}
        ${adminMetricCard('Services', serviceList.length, 'fa-solid fa-scissors', `${blogList.length} blog posts`)}
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder p-6 rounded-2xl shadow-sm space-y-4">
          <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Monthly Revenue Trends</h4>
          <div class="h-80 w-full relative"><canvas id="revenueChart"></canvas></div>
        </div>
        <div class="lg:col-span-4 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder p-6 rounded-2xl shadow-sm space-y-4">
          <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Treatment Popularity</h4>
          <div class="h-80 w-full relative"><canvas id="categoryChart"></canvas></div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm overflow-hidden">
          <div class="p-6 border-b border-stone-150 dark:border-brand-darkBorder flex justify-between items-center">
            <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Recent Appointments</h4>
            <a href="#" data-panel="appointments" class="text-xs text-brand-gold font-bold hover:underline">View All</a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-stone-50 dark:bg-brand-darkBg/60 text-stone-400 border-b border-stone-150 dark:border-brand-darkBorder">
                <tr><th class="p-4">Guest</th><th class="p-4">Service</th><th class="p-4">Date / Time</th><th class="p-4">Status</th></tr>
              </thead>
              <tbody class="divide-y divide-stone-100 dark:divide-brand-darkBorder">
                ${appts.slice(0, 5).map((item) => `<tr><td class="p-4 font-bold">${esc(item.name)}</td><td class="p-4">${esc(item.service)}</td><td class="p-4">${formatDate(item.date)} - ${esc(item.bookingTime)}</td><td class="p-4">${badge(item.status)}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="lg:col-span-4 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder p-6 rounded-2xl shadow-sm space-y-5">
          <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Recent Customers</h4>
          ${customers.slice(-4).reverse().map((customer) => `
            <div class="flex items-center justify-between gap-3">
              <div>
                <h5 class="font-bold text-xs text-stone-900 dark:text-white">${esc(customer.fullName)}</h5>
                <span class="text-[9px] text-stone-400">${esc(customer.email)}</span>
              </div>
              <span class="text-xs text-brand-gold font-bold">${formatDateTime(customer.createdAt)}</span>
            </div>
          `).join('') || '<p class="text-xs text-stone-400">No customers yet.</p>'}
        </div>
      </div>
    `;
    renderCharts();
  };

  const renderAdminApp = () => {
    const nav = document.querySelector('#sidebar nav');
    const main = document.querySelector('main');
    if (!nav || !main) return;

    nav.innerHTML = sidebarShell([
      { panel: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
      { panel: 'customers', label: 'Customers', icon: 'fa-regular fa-user' },
      { panel: 'appointments', label: 'Appointments', icon: 'fa-regular fa-calendar-check' },
      { panel: 'services', label: 'Services', icon: 'fa-solid fa-scissors' },
      { panel: 'blogs', label: 'Blogs', icon: 'fa-regular fa-newspaper' },
      { panel: 'testimonials', label: 'Testimonials', icon: 'fa-regular fa-star' },
      { panel: 'gallery', label: 'Gallery', icon: 'fa-regular fa-image' },
      { panel: 'staff', label: 'Staff', icon: 'fa-solid fa-user-tie' },
      { panel: 'settings', label: 'Settings', icon: 'fa-solid fa-sliders' }
    ], 'admin');

    main.innerHTML = `
      <div id="dashboard-panel" class="dashboard-panel space-y-6"></div>
      ${Object.keys(adminCollections).map(crudPanel).join('')}
      <div id="settings-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-8 max-w-2xl">
          <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder mb-6">Salon Settings</h3>
          <form id="admin-settings-form" class="space-y-6">
            ${(() => {
              const settings = store.getArray('settings')[0] || {};
              return `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label class="block"><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Salon Name</span><input name="salonName" value="${esc(settings.salonName)}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
                  <label class="block"><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Concierge Email</span><input name="email" type="email" value="${esc(settings.email)}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
                </div>
                <label class="block"><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Location</span><input name="location" value="${esc(settings.location)}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
                <button type="submit" class="px-6 py-3 bg-brand-gold text-white text-xs font-semibold rounded-xl hover:shadow transition-all">Save General Settings</button>
              `;
            })()}
          </form>
        </div>
      </div>
    `;

    renderAdminDashboardPanel();
    renderAllCrudTables();
    initPanelSwitching();
    initAdminCrud();

    const settingsForm = document.getElementById('admin-settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(settingsForm).entries());
        store.setArray('settings', [{ id: 'settings-main', ...values }]);
        await alertBox({ icon: 'success', title: 'Settings Saved', text: 'Salon settings were saved to LocalStorage.', confirmButtonColor: '#D4AF37' });
      });
    }
  };

  const customerStatCard = (label, value, icon, note = '') => `
    <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder p-6 rounded-2xl flex items-center justify-between shadow-sm">
      <div>
        <span class="text-[10px] uppercase font-bold tracking-widest text-stone-400">${esc(label)}</span>
        <h4 class="font-serif text-2xl font-bold mt-1 text-stone-900 dark:text-white">${esc(value)}</h4>
        <span class="text-[10px] text-brand-gold font-bold block mt-1">${esc(note)}</span>
      </div>
      <span class="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xl shrink-0"><i class="${icon}"></i></span>
    </div>
  `;

  const renderCustomerAppointments = () => {
    const mount = document.getElementById('customer-appointments-list');
    const tableMount = document.getElementById('customer-appointments-table');
    const rows = customerAppointments();
    const cardHtml = rows.map((appointment) => `
      <div class="p-5 rounded-2xl bg-stone-50 dark:bg-brand-darkBg/60 border border-stone-100 dark:border-brand-darkBorder space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-serif text-xl font-bold text-stone-900 dark:text-white">${esc(appointment.service)}</h3>
            <p class="text-xs text-stone-400 mt-1">${formatDate(appointment.date)} - ${esc(appointment.bookingTime)} with ${esc(appointment.specialist)}</p>
          </div>
          ${badge(appointment.status)}
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" data-customer-edit-appt="${appointment.id}" class="px-4 py-2 rounded-lg border border-brand-gold text-brand-gold text-xs font-bold hover:bg-brand-gold hover:text-white transition-all">Update</button>
          <button type="button" data-customer-cancel-appt="${appointment.id}" class="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-600 text-xs font-bold hover:bg-yellow-500 hover:text-white transition-all">Cancel</button>
          <button type="button" data-customer-delete-appt="${appointment.id}" class="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Delete</button>
        </div>
      </div>
    `).join('');

    if (mount) mount.innerHTML = cardHtml || '<p class="text-xs text-stone-400">No appointments yet. Book your next visit from the Bookings panel.</p>';
    if (tableMount) {
      tableMount.innerHTML = rows.slice(0, 4).map((item) => `
        <tr>
          <td class="p-4 font-bold">${esc(item.service)}</td>
          <td class="p-4">${esc(item.specialist)}</td>
          <td class="p-4">${formatDate(item.date)} - ${esc(item.bookingTime)}</td>
          <td class="p-4">${badge(item.status)}</td>
          <td class="p-4 text-right"><button type="button" data-panel="appointments" class="text-brand-gold font-bold hover:underline">Manage</button></td>
        </tr>
      `).join('') || '<tr><td colspan="5" class="p-6 text-center text-stone-400">No bookings yet.</td></tr>';
    }
  };

  const renderWishlist = () => {
    const current = getCurrentUser();
    const wishlist = store.getArray('wishlist').filter((item) => item.userId === current?.id);
    const mount = document.getElementById('wishlist-list');
    if (!mount) return;
    mount.innerHTML = wishlist.map((item) => `
      <div class="p-5 rounded-2xl bg-stone-50 dark:bg-brand-darkBg/60 border border-stone-100 dark:border-brand-darkBorder flex justify-between items-center gap-4">
        <div>
          <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">${esc(item.title)}</h4>
          <p class="text-xs text-stone-400">Saved ${formatDateTime(item.createdAt)}</p>
        </div>
        <button type="button" data-wishlist-remove="${item.id}" class="text-red-500 hover:text-red-700"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `).join('') || '<p class="text-xs text-stone-400">Your wishlist is empty.</p>';
  };

  const renderCustomerDashboardPanel = () => {
    const current = getCurrentUser();
    const panel = document.getElementById('customer-dashboard-panel-content');
    if (!panel) return;
    const rows = customerAppointments();
    const next = rows.find((appointment) => appointment.status !== 'Cancelled');
    const completed = rows.filter((appointment) => appointment.status === 'Completed').length;
    const loyalty = 1200 + rows.length * 85;

    panel.innerHTML = `
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span class="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Customer Dashboard</span>
          <h1 class="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">Welcome back, ${esc(current?.fullName || 'NOVA Guest')}</h1>
          <p class="text-sm text-stone-500 dark:text-stone-400 mt-2">Book appointments, manage your profile, track wishlist items, and review notifications.</p>
        </div>
        <a href="#" data-panel="bookings" class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-gold text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-goldDark transition-all">
          <i class="fa-regular fa-calendar-plus"></i> Book Now
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        ${customerStatCard('Upcoming Appointment', next ? formatDate(next.date) : 'None', 'fa-regular fa-calendar-check', next ? `${next.bookingTime} with ${next.specialist}` : 'Ready to book')}
        ${customerStatCard('Recent Booking', rows[0]?.service || 'No booking', 'fa-solid fa-spa', rows[0] ? rows[0].status : 'Start with a service')}
        ${customerStatCard('Profile Completion', current?.phone ? '100%' : '75%', 'fa-regular fa-user', current?.phone ? 'Profile complete' : 'Add phone number')}
        ${customerStatCard('Loyalty Points', loyalty, 'fa-solid fa-gem', `${completed} completed visits`)}
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section class="lg:col-span-8 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm overflow-hidden">
          <div class="p-6 border-b border-stone-150 dark:border-brand-darkBorder flex items-center justify-between">
            <h2 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Upcoming Bookings</h2>
            <a href="#" data-panel="appointments" class="text-xs text-brand-gold font-bold hover:underline">View All</a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-stone-50 dark:bg-brand-darkBg/60 text-stone-400 border-b border-stone-150 dark:border-brand-darkBorder">
                <tr><th class="p-4">Service</th><th class="p-4">Stylist</th><th class="p-4">Date / Time</th><th class="p-4">Status</th><th class="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody id="customer-appointments-table" class="divide-y divide-stone-100 dark:divide-brand-darkBorder"></tbody>
            </table>
          </div>
        </section>
        <section class="lg:col-span-4 bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-5">
          <h2 class="font-serif text-lg font-bold text-stone-900 dark:text-white">Recent Activity</h2>
          <div class="space-y-3">
            ${rows.slice(0, 3).map((item) => `<div class="p-4 rounded-xl bg-stone-50 dark:bg-brand-darkBg/60 border border-stone-100 dark:border-brand-darkBorder"><span class="block text-xs font-bold">${esc(item.service)}</span><span class="text-[10px] text-stone-400">${formatDate(item.date)} - ${esc(item.status)}</span></div>`).join('') || '<p class="text-xs text-stone-400">No activity yet.</p>'}
          </div>
        </section>
      </div>
    `;
    renderCustomerAppointments();
  };

  const renderCustomerApp = () => {
    const nav = document.querySelector('#sidebar nav');
    const main = document.querySelector('main');
    const current = getCurrentUser();
    if (!nav || !main || !current) return;

    nav.innerHTML = sidebarShell([
      { panel: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-pie' },
      { panel: 'profile', label: 'My Profile', icon: 'fa-regular fa-user' },
      { panel: 'appointments', label: 'Appointments', icon: 'fa-regular fa-calendar-check' },
      { panel: 'bookings', label: 'Bookings', icon: 'fa-regular fa-calendar-plus' },
      { panel: 'wishlist', label: 'Wishlist', icon: 'fa-regular fa-heart' },
      { panel: 'notifications', label: 'Notifications', icon: 'fa-regular fa-bell' },
      { panel: 'settings', label: 'Settings', icon: 'fa-solid fa-sliders' }
    ], 'customer');

    main.innerHTML = `
      <div id="dashboard-panel" class="dashboard-panel space-y-6"><div id="customer-dashboard-panel-content"></div></div>
      <div id="profile-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-8 max-w-3xl">
          <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder mb-6">My Profile</h2>
          <form id="customer-profile-form" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Full Name</span><input name="fullName" value="${esc(current.fullName)}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
              <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Email</span><input name="email" type="email" value="${esc(current.email)}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
              <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Username</span><input name="username" value="${esc(current.username || '')}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
              <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Phone</span><input name="phone" type="tel" value="${esc(current.phone || '')}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
            </div>
            <button type="submit" class="px-6 py-3 bg-brand-gold text-white text-xs font-semibold rounded-xl hover:shadow transition-all">Save Profile</button>
          </form>
        </div>
      </div>
      <div id="appointments-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-6">
          <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder">Appointments</h2>
          <div id="customer-appointments-list" class="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
        </div>
      </div>
      <div id="bookings-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-6">
          <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder">Create Booking</h2>
          <form id="customer-booking-form" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Service</span><select name="service" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs">${services().map((service) => `<option>${esc(service.title)}</option>`).join('')}</select></label>
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Specialist</span><select name="specialist" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs">${store.getArray('staff').map((staff) => `<option>${esc(staff.fullName)}</option>`).join('')}</select></label>
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Date</span><input name="date" type="date" min="${todayISO()}" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Time</span><select name="bookingTime" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"><option>10:30 AM</option><option>1:00 PM</option><option>3:00 PM</option><option>4:00 PM</option></select></label>
            <div class="md:col-span-2 xl:col-span-4"><button type="submit" class="px-6 py-3 bg-brand-gold text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-goldDark transition-all">Confirm Booking</button></div>
          </form>
        </div>
      </div>
      <div id="wishlist-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-stone-150 dark:border-brand-darkBorder">
            <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Wishlist</h2>
            <select id="wishlist-service-select" class="px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs">${services().map((service) => `<option value="${esc(service.id)}">${esc(service.title)}</option>`).join('')}</select>
            <button type="button" id="wishlist-add-btn" class="px-4 py-3 bg-brand-gold text-white text-xs font-semibold rounded-xl">Add Service</button>
          </div>
          <div id="wishlist-list" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>
      </div>
      <div id="notifications-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-6 space-y-4">
          <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder">Notifications</h2>
          ${store.getArray('notifications').map((note) => `<div class="p-4 rounded-2xl bg-stone-50 dark:bg-brand-darkBg/60 border border-stone-100 dark:border-brand-darkBorder"><div class="flex justify-between gap-4"><h3 class="font-bold text-xs text-stone-900 dark:text-white">${esc(note.title)}</h3>${badge(note.status)}</div><p class="text-xs text-stone-500 dark:text-stone-400 mt-2">${esc(note.message)}</p></div>`).join('')}
        </div>
      </div>
      <div id="settings-panel" class="dashboard-panel space-y-6 hidden">
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl shadow-sm p-8 max-w-2xl">
          <h2 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pb-4 border-b border-stone-150 dark:border-brand-darkBorder mb-6">Settings</h2>
          <form id="customer-password-form" class="space-y-4">
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">Current Password</span><input name="currentPassword" type="password" required class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
            <label><span class="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-2">New Password</span><input name="newPassword" type="password" required minlength="8" class="w-full px-4 py-3 bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-xl focus:border-brand-gold focus:outline-none dark:text-white text-xs"></label>
            <button type="submit" class="px-6 py-3 bg-brand-gold text-white text-xs font-semibold rounded-xl hover:shadow transition-all">Change Password</button>
          </form>
        </div>
      </div>
    `;

    renderCustomerDashboardPanel();
    renderWishlist();
    initPanelSwitching();
    initCustomerEvents();
  };

  const initCustomerEvents = () => {
    const current = getCurrentUser();

    document.getElementById('customer-booking-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      if (!data.date || new Date(`${data.date}T00:00:00`) < new Date(`${todayISO()}T00:00:00`)) {
        await alertBox({ icon: 'error', title: 'Invalid Date', text: 'Please choose today or a future date.', confirmButtonColor: '#D4AF37' });
        return;
      }
      const rows = appointments();
      rows.push({ id: store.makeId('appointment'), userId: current.id, name: current.fullName, phone: current.phone || '', service: data.service, specialist: data.specialist, date: data.date, bookingTime: data.bookingTime, status: 'Pending', createdAt: new Date().toISOString() });
      store.setArray('appointments', rows);
      event.currentTarget.reset();
      renderCustomerDashboardPanel();
      await alertBox({ icon: 'success', title: 'Appointment Created', text: 'Your appointment was saved to LocalStorage.', confirmButtonColor: '#D4AF37' });
      switchPanel('appointments');
    });

    document.getElementById('customer-profile-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      const allUsers = users();
      const nextUser = { ...current, ...data };
      saveUsers(allUsers.map((user) => (user.id === current.id ? { ...user, ...data } : user)));
      setCurrentUser(nextUser);
      renderCustomerDashboardPanel();
      await alertBox({ icon: 'success', title: 'Profile Updated', text: 'Your profile changes were saved.', confirmButtonColor: '#D4AF37' });
    });

    document.getElementById('customer-password-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      const allUsers = users();
      const user = allUsers.find((item) => item.id === current.id);
      if (!user || user.password !== data.currentPassword) {
        await alertBox({ icon: 'error', title: 'Password Not Changed', text: 'Current password is incorrect.', confirmButtonColor: '#D4AF37' });
        return;
      }
      if (!data.newPassword || data.newPassword.length < 8 || !/[A-Za-z]/.test(data.newPassword) || !/\d/.test(data.newPassword)) {
        await alertBox({ icon: 'error', title: 'Weak Password', text: 'Use at least 8 characters with letters and numbers.', confirmButtonColor: '#D4AF37' });
        return;
      }
      saveUsers(allUsers.map((item) => (item.id === current.id ? { ...item, password: data.newPassword } : item)));
      event.currentTarget.reset();
      await alertBox({ icon: 'success', title: 'Password Changed', text: 'Your password was updated.', confirmButtonColor: '#D4AF37' });
    });

    document.addEventListener('click', async (event) => {
      const edit = event.target.closest('[data-customer-edit-appt]');
      const cancel = event.target.closest('[data-customer-cancel-appt]');
      const remove = event.target.closest('[data-customer-delete-appt]');
      const wishlistRemove = event.target.closest('[data-wishlist-remove]');
      const wishlistAdd = event.target.closest('#wishlist-add-btn');

      if (edit) {
        const id = edit.getAttribute('data-customer-edit-appt');
        const row = appointments().find((appointment) => appointment.id === id);
        if (!row) return;
        const result = await alertBox({
          title: 'Update Appointment',
          html: `<div class="nova-swal-grid">
            ${fieldInput({ name: 'date', label: 'Date', type: 'date', required: true }, row.date)}
            ${fieldInput({ name: 'bookingTime', label: 'Time', type: 'select', options: ['10:30 AM', '1:00 PM', '3:00 PM', '4:00 PM'], required: true }, row.bookingTime)}
            ${fieldInput({ name: 'specialist', label: 'Specialist', type: 'select', options: () => store.getArray('staff').map((staff) => staff.fullName), required: true }, row.specialist)}
          </div>`,
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#D4AF37',
          preConfirm: () => {
            const popup = Swal.getPopup();
            return {
              date: popup.querySelector('[data-crud-field="date"]').value,
              bookingTime: popup.querySelector('[data-crud-field="bookingTime"]').value,
              specialist: popup.querySelector('[data-crud-field="specialist"]').value
            };
          }
        });
        if (result.isConfirmed && result.value) {
          store.setArray('appointments', appointments().map((appointment) => appointment.id === id ? { ...appointment, ...result.value, status: 'Pending' } : appointment));
          renderCustomerDashboardPanel();
          await alertBox({ icon: 'success', title: 'Appointment Updated', text: 'Your appointment was updated.', confirmButtonColor: '#D4AF37' });
        }
      }

      if (cancel) {
        const id = cancel.getAttribute('data-customer-cancel-appt');
        store.setArray('appointments', appointments().map((appointment) => appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment));
        renderCustomerDashboardPanel();
        await alertBox({ icon: 'success', title: 'Appointment Cancelled', text: 'Your appointment status was updated.', confirmButtonColor: '#D4AF37' });
      }

      if (remove) {
        const id = remove.getAttribute('data-customer-delete-appt');
        const result = await alertBox({ icon: 'warning', title: 'Delete Appointment?', text: 'This booking will be removed from LocalStorage.', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#D4AF37' });
        if (result.isConfirmed) {
          store.setArray('appointments', appointments().filter((appointment) => appointment.id !== id));
          renderCustomerDashboardPanel();
        }
      }

      if (wishlistRemove) {
        const id = wishlistRemove.getAttribute('data-wishlist-remove');
        store.setArray('wishlist', store.getArray('wishlist').filter((item) => item.id !== id));
        renderWishlist();
      }

      if (wishlistAdd) {
        const select = document.getElementById('wishlist-service-select');
        const service = services().find((item) => item.id === select.value);
        if (!service) return;
        const wishlist = store.getArray('wishlist');
        if (!wishlist.some((item) => item.userId === current.id && item.serviceId === service.id)) {
          wishlist.push({ id: store.makeId('wishlist'), userId: current.id, serviceId: service.id, title: service.title, createdAt: new Date().toISOString() });
          store.setArray('wishlist', wishlist);
        }
        renderWishlist();
      }
    });
  };

  seedData();
  initSidebarDrawer();
  initNotifications();
  initLogout();

  const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (document.body.getAttribute('data-auth-required') === 'admin' || file === 'dashboard.html') {
    renderAdminApp();
  } else if (document.body.getAttribute('data-auth-required') === 'customer' || file === 'customer-dashboard.html') {
    renderCustomerApp();
  } else {
    initPanelSwitching();
  }
});
