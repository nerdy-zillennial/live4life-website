// Donation card on support.html
// Card payment is not live yet, so every gift is a bank transfer pledge:
// the pledge is emailed to us through Web3Forms, and the donor is shown
// the account details, the amount and a reference to use.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('donate-form');
  if (!form) return;

  var freqInput = form.querySelector('input[name=frequency]');
  var amtInput = form.querySelector('input[name=amount]');
  var btn = document.getElementById('donate-btn');
  var err = document.getElementById('donate-err');
  var otherWrap = document.getElementById('other-wrap');
  var otherAmt = document.getElementById('other-amt');
  var otherToggle = document.getElementById('other-toggle');
  var thanks = document.getElementById('donate-thanks');
  var MIN = 500;

  function naira(n) { return '₦' + Number(n).toLocaleString('en-NG'); }

  function amount() {
    if (!otherWrap.hidden) {
      var v = Math.round(Number(otherAmt.value));
      return v > 0 ? v : 0;
    }
    return Number(amtInput.value);
  }

  function updateButton() {
    var a = amount();
    var f = freqInput.value === 'Monthly' ? ' monthly' : '';
    btn.textContent = a ? 'Give ' + naira(a) + f : 'Give';
  }

  function pick(group, attr, el) {
    form.querySelectorAll(group).forEach(function (b) {
      var on = b === el;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  form.querySelectorAll('.segbtn').forEach(function (b) {
    b.addEventListener('click', function () {
      pick('.segbtn', 'data-freq', b);
      freqInput.value = b.getAttribute('data-freq');
      updateButton();
    });
  });

  form.querySelectorAll('.amt').forEach(function (b) {
    b.addEventListener('click', function () {
      pick('.amt', 'data-amt', b);
      amtInput.value = b.getAttribute('data-amt');
      otherWrap.hidden = true;
      otherToggle.setAttribute('aria-expanded', 'false');
      updateButton();
    });
  });

  otherToggle.addEventListener('click', function () {
    otherWrap.hidden = false;
    otherToggle.setAttribute('aria-expanded', 'true');
    pick('.amt', 'data-amt', null);
    otherAmt.focus();
    updateButton();
  });
  otherAmt.addEventListener('input', updateButton);

  var isOrg = document.getElementById('d-isorg');
  var orgWrap = document.getElementById('org-wrap');
  isOrg.addEventListener('change', function () {
    orgWrap.hidden = !isOrg.checked;
    if (isOrg.checked) document.getElementById('d-org').focus();
  });

  function check() {
    var problems = [];
    form.querySelectorAll('.bad').forEach(function (el) { el.classList.remove('bad'); });
    var a = amount();
    if (!a || a < MIN) { problems.push('choose an amount of at least ' + naira(MIN)); otherAmt.classList.add('bad'); }
    ['d-first', 'd-last'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el.value.trim()) { el.classList.add('bad'); if (problems.indexOf('fill in your name') < 0) problems.push('fill in your name'); }
    });
    var email = document.getElementById('d-email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('bad'); problems.push('enter a valid email'); }
    var consent = document.getElementById('d-consent');
    if (!consent.checked) { consent.closest('.radio').classList.add('bad'); problems.push('tick the consent box'); }
    return problems;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var hp = form.querySelector('.hp');
    if (hp && hp.checked) return;

    var problems = check();
    if (problems.length) {
      err.textContent = 'Please ' + problems.join(', ') + '.';
      var first = form.querySelector('.bad input, input.bad');
      if (first) first.focus();
      return;
    }
    err.textContent = '';

    var a = amount();
    amtInput.value = a;
    var first = document.getElementById('d-first').value.trim();
    var last = document.getElementById('d-last').value.trim();
    var monthly = freqInput.value === 'Monthly';
    var ref = 'L4L-' + last.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 10);

    var data = new FormData(form);
    data.append('reference', ref);
    data.append('amount_formatted', naira(a) + (monthly ? ' per month' : ' one-time'));

    btn.disabled = true; btn.textContent = 'One moment...';

    function showThanks() {
      document.getElementById('t-name').textContent = ', ' + first;
      document.getElementById('t-line').textContent = 'Please transfer ' + naira(a) + (monthly ? ' each month' : '') +
        ' to the account below, using the reference shown so we can match your gift to you.';
      document.getElementById('t-amt').textContent = naira(a) + (monthly ? ' per month' : '');
      document.getElementById('t-ref').textContent = ref;
      document.getElementById('t-monthly').hidden = !monthly;
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
      var top = thanks.getBoundingClientRect().top + window.pageYOffset - 90;
      if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: 'smooth' });
    }

    // Show the bank details even if the notification email fails to send.
    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .catch(function () {})
      .finally(function () {
        btn.disabled = false; updateButton();
        showThanks();
      });
  });

  document.getElementById('donate-again').addEventListener('click', function () {
    thanks.hidden = true;
    form.hidden = false;
    updateButton();
  });

  updateButton();
});
