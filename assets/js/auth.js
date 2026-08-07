document.addEventListener('DOMContentLoaded', () => {
  const USERS_KEY = 'users';
  const LEGACY_USERS_KEY = 'novaUsers';
  const CURRENT_USER_KEY = 'currentUser';
  const LOGGED_IN_KEY = 'isLoggedIn';
  const ROLE_KEY = 'role';

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

  const alertBox = (options) => {
    if (window.NOVASwal) return window.NOVASwal(options);
    window.alert(`${options.title || ''}\n\n${options.text || ''}`.trim());
    return Promise.resolve({ isConfirmed: true });
  };

  const makeId = () => {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const makeSalt = () => {
    const bytes = new Uint8Array(16);
    if (window.crypto && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  };

  const hashPassword = async (password, salt = '') => {
    const source = `${salt}:${password}`;
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(source);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    return btoa(unescape(encodeURIComponent(source)));
  };

  const parseArray = (key) => {
    try {
      const value = JSON.parse(storage.get(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  };

  const normalizeUser = (user) => ({
    id: user.id || makeId(),
    fullName: user.fullName || user.name || 'NOVA Guest',
    username: user.username || (user.email || 'guest').split('@')[0].replace(/[^A-Za-z0-9_]/g, '_'),
    email: String(user.email || '').trim().toLowerCase(),
    phone: user.phone || '',
    password: user.password || '',
    passwordHash: user.passwordHash || '',
    salt: user.salt || '',
    avatar: user.avatar || '',
    role: user.role === 'admin' ? 'admin' : 'customer',
    createdAt: user.createdAt || new Date().toISOString(),
    demo: Boolean(user.demo)
  });

  const getUsers = () => {
    const users = parseArray(USERS_KEY).map(normalizeUser).filter((user) => user.email);
    const legacyUsers = parseArray(LEGACY_USERS_KEY).map(normalizeUser).filter((user) => user.email);
    let merged = users.slice();

    legacyUsers.forEach((legacyUser) => {
      if (!merged.some((user) => user.email === legacyUser.email)) merged.push(legacyUser);
    });

    return merged;
  };

  const saveUsers = (users) => {
    storage.set(USERS_KEY, JSON.stringify(users.map(normalizeUser)));
  };

  const publicUser = (user) => ({
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar || '',
    role: user.role || 'customer'
  });

  const startSession = (user) => {
    const sessionUser = publicUser(user);
    storage.set(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    storage.set(LOGGED_IN_KEY, 'true');
    storage.set(ROLE_KEY, sessionUser.role);
  };

  const getCurrentUser = () => {
    try {
      return JSON.parse(storage.get(CURRENT_USER_KEY) || 'null');
    } catch (error) {
      return null;
    }
  };

  const setFieldError = (field, message) => {
    if (!field) return;
    const fieldId = field.id || `auth-field-${Math.random().toString(36).slice(2)}`;
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

  const clearErrors = (form) => {
    form.querySelectorAll('.nova-field-error').forEach((error) => error.remove());
    form.querySelectorAll('.field-invalid').forEach((field) => {
      field.classList.remove('field-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    });
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const isPhone = (value) => /^\+?[0-9\s().-]{7,20}$/.test(value) && /\d{7,}/.test(value.replace(/\D/g, ''));
  const isStrongPassword = (value) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);

  const verifyPassword = async (user, password) => {
    if (user.password && user.password === password) return true;
    if (user.passwordHash && user.salt) {
      const passwordHash = await hashPassword(password, user.salt);
      return passwordHash === user.passwordHash;
    }
    return false;
  };

  const updateUserRecord = (nextUser) => {
    const users = getUsers();
    const index = users.findIndex((user) => user.id === nextUser.id || user.email === nextUser.email);
    if (index > -1) users[index] = normalizeUser({ ...users[index], ...nextUser });
    else users.push(normalizeUser(nextUser));
    saveUsers(users);
    return users[index > -1 ? index : users.length - 1];
  };

  const ensureDemoUser = (role) => {
    const users = getUsers();
    const demo = role === 'admin'
      ? {
          fullName: 'NOVA Admin',
          username: 'nova_admin',
          email: 'admin@nova.com',
          phone: '+1 (555) 789-1000',
          password: 'admin123',
          role: 'admin'
        }
      : {
          fullName: 'NOVA Customer',
          username: 'nova_customer',
          email: 'customer@nova.com',
          phone: '+1 (555) 789-2000',
          password: 'customer123',
          role: 'customer'
        };

    let user = users.find((item) => item.email === demo.email);
    if (!user) {
      user = normalizeUser({
        id: makeId(),
        avatar: '',
        createdAt: new Date().toISOString(),
        demo: true,
        ...demo
      });
      users.push(user);
      saveUsers(users);
      return user;
    }

    user = normalizeUser({ ...user, ...demo, demo: true });
    saveUsers(users.map((item) => (item.email === user.email ? user : item)));
    return user;
  };

  const initRegister = () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearErrors(form);

      const fields = {
        fullName: form.elements.fullName,
        username: form.elements.username,
        email: form.elements.email,
        phone: form.elements.phone,
        password: form.elements.password,
        confirmPassword: form.elements.confirmPassword,
        terms: form.elements.terms
      };

      const fullName = fields.fullName.value.trim();
      const username = fields.username.value.trim();
      const email = fields.email.value.trim().toLowerCase();
      const phone = fields.phone.value.trim();
      const password = fields.password.value;
      const confirmPassword = fields.confirmPassword.value;
      const users = getUsers();
      let isValid = true;

      if (fullName.length < 2 || fullName.length > 70) {
        setFieldError(fields.fullName, 'Enter a full name between 2 and 70 characters.');
        isValid = false;
      }

      if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
        setFieldError(fields.username, 'Use 3-20 letters, numbers, or underscores.');
        isValid = false;
      } else if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
        setFieldError(fields.username, 'This username is already registered.');
        isValid = false;
      }

      if (!isEmail(email)) {
        setFieldError(fields.email, 'Enter a valid email address.');
        isValid = false;
      } else if (users.some((user) => user.email === email)) {
        setFieldError(fields.email, 'This email is already registered.');
        isValid = false;
      }

      if (!isPhone(phone)) {
        setFieldError(fields.phone, 'Enter a valid phone number.');
        isValid = false;
      }

      if (!isStrongPassword(password)) {
        setFieldError(fields.password, 'Use at least 8 characters with letters and numbers.');
        isValid = false;
      }

      if (confirmPassword !== password) {
        setFieldError(fields.confirmPassword, 'Passwords must match.');
        isValid = false;
      }

      if (!fields.terms.checked) {
        setFieldError(fields.terms, 'Please accept the terms and conditions.');
        isValid = false;
      }

      if (!isValid) {
        await alertBox({
          icon: 'error',
          title: 'Registration Needs Attention',
          text: 'Please correct the highlighted fields.',
          confirmButtonColor: '#D4AF37'
        });
        const firstInvalid = form.querySelector('.field-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const avatarPreview = document.getElementById('avatar-preview');
      const avatar = avatarPreview && avatarPreview.src.startsWith('data:image') && avatarPreview.src.length < 400000
        ? avatarPreview.src
        : '';

      const user = normalizeUser({
        id: makeId(),
        fullName,
        username,
        email,
        phone,
        password,
        avatar,
        role: 'customer',
        createdAt: new Date().toISOString()
      });

      users.push(user);
      saveUsers(users);
      startSession(user);

      await alertBox({
        icon: 'success',
        title: 'Account Created',
        text: 'Your NOVA customer account is ready.',
        confirmButtonColor: '#D4AF37'
      });
      window.location.href = 'customer-dashboard.html';
    });
  };

  const initLogin = () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearErrors(form);

      const emailField = form.elements.email;
      const passwordField = form.elements.password;
      const email = emailField.value.trim().toLowerCase();
      const password = passwordField.value;
      let isValid = true;

      if (!isEmail(email)) {
        setFieldError(emailField, 'Enter a valid registered email address.');
        isValid = false;
      }

      if (!password) {
        setFieldError(passwordField, 'Password is required.');
        isValid = false;
      }

      if (!isValid) return;

      const users = getUsers();
      const user = users.find((item) => item.email === email);
      if (!user || !(await verifyPassword(user, password))) {
        setFieldError(passwordField, 'Invalid email or password.');
        await alertBox({
          icon: 'error',
          title: 'Login Failed',
          text: 'The email and password combination is invalid.',
          confirmButtonColor: '#D4AF37'
        });
        return;
      }

      startSession(user);
      window.location.href = user.role === 'admin' ? 'dashboard.html' : 'customer-dashboard.html';
    });

    document.querySelectorAll('[data-demo-login]').forEach((link) => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        const role = link.getAttribute('data-demo-login') === 'admin' ? 'admin' : 'customer';
        const user = ensureDemoUser(role);
        startSession(user);
        await alertBox({
          icon: 'success',
          title: `${role === 'admin' ? 'Admin' : 'Customer'} Demo Ready`,
          text: `Logged in as ${user.email}.`,
          timer: 900,
          showConfirmButton: false
        });
        window.location.href = role === 'admin' ? 'dashboard.html' : 'customer-dashboard.html';
      });
    });
  };

  const initForgotPassword = () => {
    const trigger = document.querySelector('[data-forgot-password]');
    if (!trigger) return;

    trigger.addEventListener('click', async (event) => {
      event.preventDefault();

      const result = await alertBox({
        title: 'Forgot Password',
        text: 'Enter your registered email address.',
        input: 'email',
        inputPlaceholder: 'email@example.com',
        showCancelButton: true,
        confirmButtonText: 'Send Reset Link',
        confirmButtonColor: '#D4AF37',
        preConfirm: (value) => {
          if (!isEmail(value || '')) return 'Enter a valid email address.';
          return value;
        }
      });

      let email = (result.value || '').trim().toLowerCase();
      if (result.isConfirmed && !email && !window.Swal) {
        email = String(window.prompt('Enter your registered email address') || '').trim().toLowerCase();
      }
      if (!result.isConfirmed && !email) return;

      if (!isEmail(email)) {
        await alertBox({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Please enter a valid email address.',
          confirmButtonColor: '#D4AF37'
        });
        return;
      }

      const exists = getUsers().some((user) => user.email === email);
      await alertBox({
        icon: exists ? 'success' : 'error',
        title: exists ? 'Reset Request Sent' : 'Email Not Found',
        text: exists
          ? 'If this were connected to email, password reset instructions would be sent now.'
          : 'No NOVA account exists with that email address.',
        confirmButtonColor: '#D4AF37'
      });
    });
  };

  const populateCurrentUser = (currentUser) => {
    if (!currentUser) return;
    document.querySelectorAll('[data-current-user-name]').forEach((node) => {
      node.textContent = currentUser.fullName;
    });
    document.querySelectorAll('[data-current-user-email]').forEach((node) => {
      node.textContent = currentUser.email;
    });
    document.querySelectorAll('[data-current-user-avatar]').forEach((img) => {
      if (currentUser.avatar) img.src = currentUser.avatar;
    });
  };

  const initProtectedPages = () => {
    const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const requiredRole = document.body.getAttribute('data-auth-required') ||
      (file === 'dashboard.html' ? 'admin' : '');
    const currentUser = getCurrentUser();

    populateCurrentUser(currentUser);
    if (!requiredRole) return;

    if (storage.get(LOGGED_IN_KEY) !== 'true' || !currentUser) {
      window.location.href = 'login.html';
      return;
    }

    if (requiredRole !== 'any' && currentUser.role !== requiredRole) {
      window.location.href = currentUser.role === 'admin' ? 'dashboard.html' : 'customer-dashboard.html';
    }
  };

  const initLogout = () => {
    document.querySelectorAll('[data-logout]').forEach((link) => {
      link.addEventListener('click', () => {
        storage.remove(CURRENT_USER_KEY);
        storage.remove(LOGGED_IN_KEY);
        storage.remove(ROLE_KEY);
      });
    });
  };

  ensureDemoUser('customer');
  ensureDemoUser('admin');
  initRegister();
  initLogin();
  initForgotPassword();
  initProtectedPages();
  initLogout();

  window.NOVAAuth = {
    getUsers,
    saveUsers,
    getCurrentUser,
    startSession,
    updateUserRecord,
    ensureDemoUser
  };
});
