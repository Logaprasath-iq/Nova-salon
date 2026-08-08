(() => {
  const APPOINTMENTS_KEY = 'appointments';
  const TRIGGER_SELECTOR = '[data-booking-trigger], .btn-book-now:not(.btn-sign-up), a[href="#appointment"], a[href="#quick-booking"], a[href="contact.html#appointment"], a[href="#booking-modal"]';
  let swalLoadPromise = null;

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (error) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (error) { /* localStorage can be unavailable. */ }
    }
  };

  const parseAppointments = () => {
    try {
      const value = JSON.parse(storage.get(APPOINTMENTS_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  };

  const makeId = () => {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `appointment-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const dateOffsetISO = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const getCurrentUser = () => {
    try {
      return JSON.parse(storage.get('currentUser') || 'null');
    } catch (error) {
      return null;
    }
  };

  const loadSweetAlert = () => {
    if (window.NOVASwal) return Promise.resolve(window.NOVASwal);
    if (window.Swal) return Promise.resolve((options) => window.Swal.fire(options));
    if (swalLoadPromise) return swalLoadPromise;

    swalLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-nova-swal]');
      if (existing) {
        existing.addEventListener('load', () => resolve((options) => window.Swal.fire(options)));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      script.async = true;
      script.dataset.novaSwal = 'true';
      script.onload = () => resolve((options) => window.Swal.fire(options));
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return swalLoadPromise;
  };

  const fireSuccessAlert = async () => {
    const options = {
      icon: 'success',
      title: 'Appointment Booked!',
      text: 'Your appointment has been submitted successfully. Our team will contact you shortly to confirm your booking.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#D4AF37'
    };

    try {
      const fireAlert = await loadSweetAlert();
      await fireAlert(options);
    } catch (error) {
      window.alert(`${options.title}\n\n${options.text}`);
    }
  };

  const isValidPhone = (value) => /^\+?[0-9\s().-]{7,20}$/.test(value) && /\d{7,}/.test(value.replace(/\D/g, ''));

  const setFieldError = (field, message) => {
    if (!field) return;
    const fieldId = field.id || `booking-field-${Math.random().toString(36).slice(2)}`;
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

    const wrapper = field.closest('label') || field.parentElement;
    if (wrapper && wrapper.parentNode) wrapper.parentNode.insertBefore(error, wrapper.nextSibling);
  };

  const clearBookingErrors = (form) => {
    form.querySelectorAll('.nova-field-error').forEach((error) => error.remove());
    form.querySelectorAll('.field-invalid').forEach((field) => {
      field.classList.remove('field-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    });
  };

  const setButtonLoading = (button, isLoading) => {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalHtml = button.innerHTML;
      button.disabled = true;
      button.classList.add('is-disabled');
      button.innerHTML = '<span class="nova-btn-spinner" aria-hidden="true"></span>Confirming...';
      return;
    }

    button.disabled = false;
    button.classList.remove('is-disabled');
    if (button.dataset.originalHtml) button.innerHTML = button.dataset.originalHtml;
    delete button.dataset.originalHtml;
  };

  const ensureBookingModal = () => {
    let modal = document.getElementById('appointment-modal');
    if (modal) return modal;

    const isSpaTheme = Boolean(document.querySelector('[class*="brand-spaGold"], [class*="brand-spaGreen"]'));
    const focusBorder = isSpaTheme ? 'focus:border-brand-spaGold' : 'focus:border-brand-gold';
    const modalGradient = isSpaTheme ? 'from-brand-spaGreen to-brand-spaGreenDark' : 'from-brand-gold to-brand-goldDark';

    modal = document.createElement('div');
    modal.id = 'appointment-modal';
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-60 hidden items-center justify-center p-4';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'booking-modal-title');
    modal.innerHTML = `
      <div class="bg-white dark:bg-brand-darkCard rounded-2xl max-w-xl w-full border border-stone-150 dark:border-brand-darkBorder overflow-hidden relative shadow-2xl animate-fade-in">
        <button id="close-appointment-modal" type="button" class="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-white z-10" aria-label="Close booking modal">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
        <div class="p-8">
          <h3 id="booking-modal-title" class="font-serif text-2xl font-bold mb-2">Book Now</h3>
          <p class="text-stone-500 dark:text-stone-400 text-xs mb-6">Complete the quick form below. Our concierge team will confirm your session shortly.</p>
          <form id="booking-form" class="space-y-4" data-nova-skip="true" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="booking-name" class="block text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 mb-1">Name</label>
                <input id="booking-name" name="name" type="text" required autocomplete="name" class="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-brand-darkBg border border-stone-100 dark:border-brand-darkBorder rounded-lg ${focusBorder} focus:outline-none dark:text-white">
              </div>
              <div>
                <label for="booking-phone" class="block text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 mb-1">Phone</label>
                <input id="booking-phone" name="phone" type="tel" required autocomplete="tel" class="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-brand-darkBg border border-stone-100 dark:border-brand-darkBorder rounded-lg ${focusBorder} focus:outline-none dark:text-white">
              </div>
            </div>
            <div>
              <label for="booking-service" class="block text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 mb-1">Service Category</label>
              <select id="booking-service" name="service" required class="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-brand-darkBg border border-stone-100 dark:border-brand-darkBorder rounded-lg ${focusBorder} focus:outline-none dark:text-white">
                <option value="">Select Service Category</option>
                <option>Hair Styling & Coloring</option>
                <option>Facials & Skincare</option>
                <option>Nail Care & Art</option>
                <option>Spa Aromatherapy Massage</option>
                <option>Special Bridal Styling</option>
              </select>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="booking-date" class="block text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 mb-1">Date</label>
                <input id="booking-date" name="date" type="date" required class="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-brand-darkBg border border-stone-100 dark:border-brand-darkBorder rounded-lg ${focusBorder} focus:outline-none dark:text-white">
              </div>
              <div>
                <label for="booking-specialist" class="block text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 mb-1">Specialist</label>
                <select id="booking-specialist" name="specialist" required class="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-brand-darkBg border border-stone-100 dark:border-brand-darkBorder rounded-lg ${focusBorder} focus:outline-none dark:text-white">
                  <option value="">Select Specialist</option>
                  <option>Any Available Stylist</option>
                  <option>Sophia Laurent</option>
                  <option>Liam Thorne</option>
                  <option>Emma Watson</option>
                  <option>Chloe Bennett</option>
                </select>
              </div>
            </div>
            <button type="submit" class="w-full py-3 bg-gradient-to-r ${modalGradient} text-white font-semibold rounded-lg text-sm hover:shadow transition-all mt-4">Confirm Appointment Slot</button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    initBookingForm(modal.querySelector('form'));
    modal.querySelector('#close-appointment-modal').addEventListener('click', closeBookingModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeBookingModal();
    });

    return modal;
  };

  const getBookingFields = (form) => ({
    name: form.elements.name,
    phone: form.elements.phone,
    service: form.elements.service,
    date: form.elements.date,
    specialist: form.elements.specialist
  });

  const validateBookingForm = (form = document.getElementById('booking-form')) => {
    if (!form) return { isValid: false, data: null };

    clearBookingErrors(form);
    const fields = getBookingFields(form);
    const data = {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      service: fields.service.value.trim(),
      date: fields.date.value,
      specialist: fields.specialist.value.trim()
    };
    let isValid = true;

    if (!data.name) {
      setFieldError(fields.name, 'Name is required.');
      isValid = false;
    }

    if (!data.phone) {
      setFieldError(fields.phone, 'Phone is required.');
      isValid = false;
    } else if (!isValidPhone(data.phone)) {
      setFieldError(fields.phone, 'Enter a valid phone number.');
      isValid = false;
    }

    if (!data.service) {
      setFieldError(fields.service, 'Service Category is required.');
      isValid = false;
    }

    if (!data.date) {
      setFieldError(fields.date, 'Date is required.');
      isValid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(`${data.date}T00:00:00`);
      if (Number.isNaN(selected.getTime()) || selected <= today) {
        setFieldError(fields.date, 'Choose a future date.');
        isValid = false;
      }
    }

    if (!data.specialist) {
      setFieldError(fields.specialist, 'Specialist is required.');
      isValid = false;
    }

    return { isValid, data };
  };

  const saveAppointment = (data) => {
    const currentUser = getCurrentUser();
    const appointment = {
      id: makeId(),
      userId: currentUser?.id || '',
      name: data.name,
      phone: data.phone,
      service: data.service,
      specialist: data.specialist,
      date: data.date,
      bookingTime: 'Pending confirmation',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const appointments = parseAppointments();
    appointments.push(appointment);
    storage.set(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return appointment;
  };

  const resetBookingForm = (form = document.getElementById('booking-form')) => {
    if (!form) return;
    clearBookingErrors(form);
    form.reset();
    const dateField = form.elements.date;
    if (dateField) dateField.min = dateOffsetISO(1);
    setButtonLoading(form.querySelector('button[type="submit"]'), false);
    form.classList.remove('form-submitting');
  };

  const closeBookingModal = () => {
    const modal = document.getElementById('appointment-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openBookingModal = (event) => {
    if (event) event.preventDefault();
    if (typeof window.closeDrawer === 'function') window.closeDrawer();

    const modal = ensureBookingModal();
    const form = modal.querySelector('form');
    const dateField = form?.elements.date;
    if (dateField) dateField.min = dateOffsetISO(1);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const firstField = modal.querySelector('input, select, button');
    if (firstField) firstField.focus({ preventScroll: true });
  };

  const initBookingForm = (form) => {
    if (!form || form.dataset.bookingReady === 'true') return;
    form.dataset.bookingReady = 'true';
    const fields = getBookingFields(form);
    if (fields.date) fields.date.min = dateOffsetISO(1);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const { isValid, data } = validateBookingForm(form);
      if (!isValid) {
        const firstInvalid = form.querySelector('.field-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      setButtonLoading(submitBtn, true);
      form.classList.add('form-submitting');

      window.setTimeout(async () => {
        saveAppointment(data);
        closeBookingModal();
        resetBookingForm(form);
        await fireSuccessAlert();
      }, 1200);
    });

    Object.values(fields).forEach((field) => {
      if (!field) return;
      field.addEventListener('input', () => validateBookingForm(form));
      field.addEventListener('blur', () => validateBookingForm(form));
    });
  };

  const initBookingTriggers = () => {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest(TRIGGER_SELECTOR);
      if (!trigger) return;

      const href = trigger.getAttribute('href') || '';
      const shouldOpen = trigger.hasAttribute('data-booking-trigger') ||
        (trigger.classList.contains('btn-book-now') && !trigger.classList.contains('btn-sign-up')) ||
        ['#appointment', '#quick-booking', '#booking-modal', 'contact.html#appointment'].includes(href);

      if (shouldOpen) openBookingModal(event);
    });

    document.addEventListener('keydown', (event) => {
      const modal = document.getElementById('appointment-modal');
      if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeBookingModal();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBookingTriggers();
  });

  window.openBookingModal = openBookingModal;
  window.closeBookingModal = closeBookingModal;
  window.validateBookingForm = validateBookingForm;
  window.saveAppointment = saveAppointment;
  window.resetBookingForm = resetBookingForm;
})();
