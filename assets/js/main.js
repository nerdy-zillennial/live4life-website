// Mobile navigation
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); }
    });
  }

  // Web3Forms AJAX submit — keeps the visitor on the site
  var form = document.querySelector('form[data-ajax]');
  if (!form) return;
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var hp = form.querySelector('.hp'); // honeypot
    if (hp && (hp.type === 'checkbox' ? hp.checked : hp.value)) return;
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          status.textContent = 'Thank you. We have your message and will reply soon.';
          status.style.color = '#1E7E34';
        } else {
          status.textContent = 'Something went wrong. Please email crew@live4lifecrew.org instead.';
          status.style.color = '#C0392B';
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please email crew@live4lifecrew.org instead.';
        status.style.color = '#C0392B';
      })
      .finally(function () { btn.disabled = false; btn.textContent = 'Send message'; });
  });
});
