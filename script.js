/* ==========================================================================
   Greenday Venture — script.js

   Vanilla JavaScript only. No dependencies, no build step.
   Every page remains readable and navigable if this file never loads.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Mobile navigation
     The nav list is plain markup. styles.css only hides it on small screens
     when the <html> element carries the "js" class, so a visitor without
     JavaScript keeps the full menu.
     ------------------------------------------------------------------------ */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setNavOpen = function (open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    setNavOpen(false);

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!isOpen);
    });

    // Close after choosing a destination.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setNavOpen(false);
      }
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        toggle.focus();
      }
    });

    // Reset state when the layout crosses into the desktop breakpoint.
    var desktop = window.matchMedia('(min-width: 900px)');
    var handleBreakpoint = function () {
      if (desktop.matches) {
        setNavOpen(false);
      }
    };
    if (typeof desktop.addEventListener === 'function') {
      desktop.addEventListener('change', handleBreakpoint);
    } else if (typeof desktop.addListener === 'function') {
      desktop.addListener(handleBreakpoint);
    }
  }

  /* ------------------------------------------------------------------------
     2. Current year in the footer
     The HTML contains a real year as a fallback; this keeps it accurate.
     ------------------------------------------------------------------------ */

  var yearTargets = document.querySelectorAll('[data-current-year]');
  var thisYear = String(new Date().getFullYear());
  for (var i = 0; i < yearTargets.length; i += 1) {
    yearTargets[i].textContent = thisYear;
  }

  /* ------------------------------------------------------------------------
     3. Inquiry form
     IMPORTANT: no endpoint is connected. The form never reports a successful
     submission. It validates, then tells the visitor plainly that the form is
     not wired up yet and offers a pre-filled email instead.

     When a real endpoint exists:
       - add action="..." method="post" to the <form> in contact.html
       - set FORM_ENDPOINT_CONNECTED to true below
     ------------------------------------------------------------------------ */

  var FORM_ENDPOINT_CONNECTED = false;
  var CONTACT_EMAIL = 'greenday.venture@gmail.com';

  var form = document.getElementById('inquiry-form');

  if (form) {
    var status = document.getElementById('form-status');

    var setFieldError = function (input, message) {
      var wrapper = input.closest('.field');
      var errorEl = document.getElementById(input.id + '-error');
      if (wrapper) {
        wrapper.classList.toggle('has-error', Boolean(message));
      }
      if (errorEl) {
        errorEl.textContent = message || '';
      }
      if (message) {
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    };

    var validate = function () {
      var problems = [];

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;

      if (!name.value.trim()) {
        setFieldError(name, 'Enter your name so Jermane knows who is writing.');
        problems.push(name);
      } else {
        setFieldError(name, '');
      }

      var emailValue = email.value.trim();
      if (!emailValue) {
        setFieldError(email, 'Enter an email address so a reply can reach you.');
        problems.push(email);
      } else if (emailValue.indexOf('@') < 1 || emailValue.indexOf('.', emailValue.indexOf('@')) < 0) {
        setFieldError(email, 'Check this email address — it looks incomplete.');
        problems.push(email);
      } else {
        setFieldError(email, '');
      }

      if (!message.value.trim()) {
        setFieldError(message, 'Add a short message, even a sentence or two.');
        problems.push(message);
      } else {
        setFieldError(message, '');
      }

      return problems;
    };

    var buildMailto = function () {
      var lines = [];
      var add = function (label, value) {
        if (value && value.trim()) {
          lines.push(label + ': ' + value.trim());
        }
      };

      add('Name', form.elements.name.value);
      add('Email', form.elements.email.value);
      add('Phone', form.elements.phone.value);
      add('Company', form.elements.company.value);
      add('State', form.elements.state.value);
      add('Industry', form.elements.industry.value);
      add('Reason for reaching out', form.elements.reason.value);
      lines.push('');
      lines.push(form.elements.message.value.trim());

      return 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Confidential inquiry — Greenday Venture') +
        '&body=' + encodeURIComponent(lines.join('\n'));
    };

    form.addEventListener('submit', function (event) {
      if (FORM_ENDPOINT_CONNECTED) {
        return; // Let the browser post to the configured endpoint.
      }

      event.preventDefault();

      var problems = validate();

      if (problems.length > 0) {
        status.innerHTML = '<p>Some details are still needed. Check the highlighted fields above.</p>';
        problems[0].focus();
        return;
      }

      // Honest development-safe result. This is not a success message.
      status.innerHTML =
        '<p><strong>This form is not connected yet.</strong> Your message has not been sent.</p>' +
        '<p>Use the button below to open the same details in your email program, ' +
        'or write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a> directly.</p>' +
        '<p><a class="btn btn--secondary" href="' + buildMailto() + '">Open this message in email</a></p>';
    });

    // Clear an error as soon as the visitor starts fixing it.
    form.addEventListener('input', function (event) {
      var field = event.target;
      if (field.getAttribute('aria-invalid') === 'true' && field.value.trim()) {
        setFieldError(field, '');
      }
    });
  }
})();
