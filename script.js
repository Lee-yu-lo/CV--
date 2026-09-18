(() => {
  'use strict';

  const data = JSON.parse(document.querySelector('#resume-data').textContent);
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // 将换行文本安全地渲染为带换行的 HTML。
  const withBreaks = value => String(value).replace(/\n/g, '<br>');
  const get = path => path.split('.').reduce((obj, key) => obj?.[key], data);

  function renderData() {
    $$('[data-field]').forEach(el => { el.textContent = data.meta[el.dataset.field] || ''; });
    $$('[data-content]').forEach(el => { el.innerHTML = withBreaks(get(el.dataset.content) || ''); });

    const nav = $('.desktop-nav');
    nav.innerHTML = data.nav.map((label, index) => `<a href="#${['about','responsibilities','method','contact'][index] || 'top'}">${label}</a>`).join('');
    $('.mobile-nav').innerHTML = nav.innerHTML;

    $('[data-stats]').innerHTML = data.about.stats.map(stat => `<div class="stat"><div class="stat-value">${stat.value}</div><div class="stat-label">${stat.label}</div></div>`).join('');
    $('[data-responsibilities]').innerHTML = data.responsibilities.items.map(item => `<article class="responsibility-card"><div class="card-num">${item.number}</div><div><div class="card-title">${item.title}</div><div class="card-subtitle">${item.subtitle}</div></div><div class="card-body"><span class="card-tag">${item.tag}</span>${item.body}</div></article>`).join('');
    $('[data-tools]').innerHTML = data.tools.items.map(item => `<li>${item}</li>`).join('');
    $('[data-method]').innerHTML = data.method.steps.map(step => `<article class="method-card"><span class="index">${step.index}</span><h3>${step.title}</h3><p>${step.text}</p></article>`).join('');

    const email = data.contact.email;
    $('[data-email]').href = `mailto:${email}`;
    $('[data-email-text]').textContent = email;
  }

  function initMotion() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    $$('.section-reveal').forEach(section => observer.observe(section));
    window.addEventListener('load', () => setTimeout(() => $('.loader').classList.add('done'), 550));
  }

  function initMenu() {
    const button = $('.menu-toggle');
    const mobile = $('.mobile-nav');
    const toggle = () => { const open = mobile.classList.toggle('open'); button.setAttribute('aria-expanded', open); mobile.setAttribute('aria-hidden', !open); };
    button.addEventListener('click', toggle);
    $$('.mobile-nav a').forEach(link => link.addEventListener('click', () => { if (mobile.classList.contains('open')) toggle(); }));
  }

  renderData();
  initMotion();
  initMenu();
})();
