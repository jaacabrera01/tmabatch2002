/* TMA Reunion 2027 – Survey Script */

(function () {
  'use strict';

  const form = document.getElementById('surveyForm');
  const successMessage = document.getElementById('successMessage');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ── Validation helpers ──────────────────────────────────────────
  function setError(inputId, errorId, message) {
    const el = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    if (el) el.classList.add('invalid');
    if (err) err.textContent = message;
  }

  function clearError(inputId, errorId) {
    const el = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    if (el) el.classList.remove('invalid');
    if (err) err.textContent = '';
  }

  function clearAllErrors() {
    document.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
    document.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
  }

  function validate() {
    let valid = true;
    clearAllErrors();

    // Full name
    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName) {
      setError('fullName', 'fullNameError', 'Please enter your full name.');
      valid = false;
    }

    // Email
    const email = document.getElementById('email').value.trim();
    if (!email) {
      setError('email', 'emailError', 'Please enter your email address.');
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    // Graduation year
    const gradYear = parseInt(document.getElementById('gradYear').value, 10);
    const currentYear = new Date().getFullYear();
    if (!gradYear) {
      setError('gradYear', 'gradYearError', 'Please enter your graduation year.');
      valid = false;
    } else if (gradYear < 1950 || gradYear > currentYear) {
      setError('gradYear', 'gradYearError', `Please enter a year between 1950 and ${currentYear}.`);
      valid = false;
    }

    // Attendance
    const attendance = document.querySelector('input[name="attendance"]:checked');
    if (!attendance) {
      document.getElementById('attendanceError').textContent = 'Please select your attendance status.';
      valid = false;
    }

    // Preferred format
    const format = document.querySelector('input[name="format"]:checked');
    if (!format) {
      document.getElementById('formatError').textContent = 'Please select a preferred format.';
      valid = false;
    }

    return valid;
  }

  // ── Inline validation on blur ───────────────────────────────────
  document.getElementById('fullName').addEventListener('blur', function () {
    if (this.value.trim()) {
      clearError('fullName', 'fullNameError');
    }
  });

  document.getElementById('email').addEventListener('blur', function () {
    if (this.value.trim() && EMAIL_REGEX.test(this.value.trim())) {
      clearError('email', 'emailError');
    }
  });

  document.getElementById('gradYear').addEventListener('blur', function () {
    const year = parseInt(this.value, 10);
    const currentYear = new Date().getFullYear();
    if (year >= 1950 && year <= currentYear) {
      clearError('gradYear', 'gradYearError');
    }
  });

  // ── Form submission ─────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-msg:not(:empty), .invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Collect form data
    const data = collectFormData();
    console.log('Survey submitted:', data);

    // Show success message
    form.hidden = true;
    successMessage.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Collect all form data ───────────────────────────────────────
  function collectFormData() {
    const activities = Array.from(
      document.querySelectorAll('input[name="activities"]:checked')
    ).map((el) => el.value);

    return {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      gradYear: document.getElementById('gradYear').value,
      attendance: (document.querySelector('input[name="attendance"]:checked') || {}).value,
      guests: document.getElementById('guests').value,
      format: (document.querySelector('input[name="format"]:checked') || {}).value,
      season: (document.querySelector('input[name="season"]:checked') || {}).value,
      activities,
      dietary: document.getElementById('dietary').value.trim(),
      memories: document.getElementById('memories').value.trim(),
      suggestions: document.getElementById('suggestions').value.trim(),
      volunteer: document.getElementById('volunteer').checked,
      updates: document.getElementById('updates').checked,
    };
  }

  // ── Reset / resubmit ────────────────────────────────────────────
  window.resetForm = function () {
    form.reset();
    clearAllErrors();
    form.hidden = false;
    successMessage.hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Reset button clears errors ──────────────────────────────────
  form.addEventListener('reset', function () {
    clearAllErrors();
  });
})();
