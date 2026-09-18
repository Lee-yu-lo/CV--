(() => {
  'use strict';
  const data = JSON.parse(document.querySelector('#resume-data').textContent);
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const withBreaks = value => escapeHTML(value).replace(/\n/g, '<br>');
  const get = path => path.split('.').reduce((obj, key) => obj?.[key], data);

  function renderData() {
    document.title = data.meta.pageTitle;
    $$('[data-field]').forEach(el => { el.textContent = data.meta[el.dataset.field] || ''; });
    $$('[data-content]').forEach(el => { el.innerHTML = withBreaks(get(el.dataset.content) || ''); });
    const ids = ['about', 'responsibilities', 'tools', 'method', 'contact'];
    const links = data.nav.map((label, index) => `<a href="#${ids[index] || 'top'}">${escapeHTML(label)}</a>`).join('');
    $('.desktop-nav').innerHTML = links;
    $('.mobile-nav').innerHTML = links;
    $('[data-stats]').innerHTML = data.about.stats.map(stat => `<div class="stat"><div class="stat-value">${escapeHTML(stat.value)}</div><div class="stat-label">${escapeHTML(stat.label)}</div></div>`).join('');
    $('[data-responsibilities]').innerHTML = data.responsibilities.items.map(item => `<article class="responsibility-card"><div class="card-num">${escapeHTML(item.number)}</div><div><div class="card-title">${escapeHTML(item.title)}</div><div class="card-subtitle">${escapeHTML(item.subtitle)}</div></div><p class="card-body">${escapeHTML(item.body)}</p></article>`).join('');
    $('[data-tools]').innerHTML = data.tools.items.map(item => `<li>${escapeHTML(item)}</li>`).join('');
    $('[data-method]').innerHTML = data.method.steps.map(step => `<article class="method-card"><span class="index">${escapeHTML(step.index)}</span><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p></article>`).join('');
    const email = escapeHTML(data.contact.email);
    $('[data-email]').href = `mailto:${data.contact.email}`;
    $('[data-email-text]').textContent = email;
  }

  function initMotion() {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } }), { threshold: .12 });
    $$('.section-reveal').forEach(section => reveal.observe(section));
    window.addEventListener('load', () => setTimeout(() => $('.loader').classList.add('done'), 550), { once: true });
  }

  function initMenu() {
    const button = $('.menu-toggle'); const mobile = $('.mobile-nav');
    const toggle = () => { const open = mobile.classList.toggle('open'); button.setAttribute('aria-expanded', String(open)); mobile.setAttribute('aria-label', open ? '关闭菜单' : '移动端导航'); mobile.setAttribute('aria-hidden', String(!open)); };
    button.addEventListener('click', toggle);
    $$('.mobile-nav a').forEach(link => link.addEventListener('click', () => { if (mobile.classList.contains('open')) toggle(); }));
  }
  renderData(); initMotion(); initMenu();
})();
