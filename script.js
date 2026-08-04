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
     3. Buyer worksheet (questions-for-buyers.html)
     Notes and ticks are kept in this browser only. Nothing is transmitted.
     If storage is unavailable the worksheet still works for the session.
     ------------------------------------------------------------------------ */

  var worksheet = document.querySelector('.worksheet');

  if (worksheet) {
    var STORE_KEY = 'gv-buyer-worksheet-v1';
    var checks = worksheet.querySelectorAll('[data-q]');
    var notes = worksheet.querySelectorAll('[data-note]');
    var progress = worksheet.querySelector('[data-progress]');

    var readStore = function () {
      try {
        return JSON.parse(window.localStorage.getItem(STORE_KEY)) || {};
      } catch (err) {
        return {};
      }
    };

    var writeStore = function (data) {
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
      } catch (err) {
        /* Private browsing or storage disabled: the worksheet still works,
           it just will not survive a reload. */
      }
    };

    var autoGrow = function (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };

    var updateProgress = function () {
      var done = 0;
      for (var i = 0; i < checks.length; i += 1) {
        if (checks[i].checked) { done += 1; }
      }
      if (progress) {
        progress.textContent = done + ' of ' + checks.length + ' marked';
      }
    };

    var save = function () {
      var data = {};
      var i;
      for (i = 0; i < checks.length; i += 1) {
        if (checks[i].checked) { data[checks[i].id] = true; }
      }
      for (i = 0; i < notes.length; i += 1) {
        if (notes[i].value.trim()) { data[notes[i].id] = notes[i].value; }
      }
      writeStore(data);
    };

    var restore = function () {
      var data = readStore();
      var i;
      for (i = 0; i < checks.length; i += 1) {
        if (data[checks[i].id]) { checks[i].checked = true; }
      }
      for (i = 0; i < notes.length; i += 1) {
        if (data[notes[i].id]) { notes[i].value = data[notes[i].id]; }
        autoGrow(notes[i]);
      }
      updateProgress();
    };

    worksheet.addEventListener('change', function (event) {
      if (event.target.hasAttribute('data-q')) {
        updateProgress();
        save();
      }
    });

    worksheet.addEventListener('input', function (event) {
      if (event.target.hasAttribute('data-note')) {
        autoGrow(event.target);
        save();
      }
    });

    var printBtn = worksheet.querySelector('[data-print]');
    if (printBtn) {
      printBtn.addEventListener('click', function () { window.print(); });
    }

    var emailBtn = worksheet.querySelector('[data-email]');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        var lines = ['Questions worth asking any buyer', ''];
        var groups = worksheet.querySelectorAll('.qgroup');
        for (var g = 0; g < groups.length; g += 1) {
          var heading = groups[g].querySelector('h2');
          lines.push((heading ? heading.textContent : 'Section').toUpperCase());
          var items = groups[g].querySelectorAll('.qitem');
          for (var i = 0; i < items.length; i += 1) {
            var box = items[i].querySelector('[data-q]');
            var label = items[i].querySelector('.qitem-label');
            var note = items[i].querySelector('[data-note]');
            lines.push((box && box.checked ? '[x] ' : '[ ] ') + label.textContent.trim());
            if (note && note.value.trim()) {
              lines.push('    ' + note.value.trim().replace(/\n/g, '\n    '));
            }
          }
          lines.push('');
        }
        lines.push('Source: Greenday Venture, greenday.venture@gmail.com');
        window.location.href = 'mailto:?subject=' +
          encodeURIComponent('Questions worth asking any buyer') +
          '&body=' + encodeURIComponent(lines.join('\n'));
      });
    }

    var clearBtn = worksheet.querySelector('[data-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (!window.confirm('Clear every tick and note on this worksheet?')) { return; }
        var i;
        for (i = 0; i < checks.length; i += 1) { checks[i].checked = false; }
        for (i = 0; i < notes.length; i += 1) { notes[i].value = ''; autoGrow(notes[i]); }
        try { window.localStorage.removeItem(STORE_KEY); } catch (err) { /* ignore */ }
        updateProgress();
      });
    }

    restore();
  }

  /* ------------------------------------------------------------------------
     4. Inquiry form
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

      var typeField = form.elements.inquiry_type;
      if (typeField) {
        var typeChosen = false;
        for (var t = 0; t < typeField.length; t += 1) {
          if (typeField[t].checked) { typeChosen = true; }
        }
        var typeError = document.getElementById('inquiry_type-error');
        var typeWrap = typeField[0].closest('.field');
        if (!typeChosen) {
          if (typeError) { typeError.textContent = 'Choose the option that best describes you.'; }
          if (typeWrap) { typeWrap.classList.add('has-error'); }
          problems.push(typeField[0]);
        } else {
          if (typeError) { typeError.textContent = ''; }
          if (typeWrap) { typeWrap.classList.remove('has-error'); }
        }
      }

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

      var typeField = form.elements.inquiry_type;
      if (typeField) {
        for (var t = 0; t < typeField.length; t += 1) {
          if (typeField[t].checked) {
            add('Inquiry type', typeField[t].value);
          }
        }
      }
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
        status.innerHTML = '<p>A few details are still needed. Check the highlighted fields above.</p>';
        problems[0].focus();
        return;
      }

      // Accurate, user-facing wording: nothing is sent from this page.
      status.innerHTML =
        '<p><strong>Your message is ready.</strong> Use the button below to open it ' +
        'in your email program, check it over, and send it.</p>' +
        '<p>If nothing opens, write to <a href="mailto:' + CONTACT_EMAIL + '">' +
        CONTACT_EMAIL + '</a> and include the same details.</p>' +
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
