/* Portfolio interactions: scroll reveal, nav highlight, progress bar, marquee, theme toggle */

(function(){
  document.getElementById('yr').textContent = new Date().getFullYear();
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bar = document.getElementById('progress'), totop = document.getElementById('totop');

  // Scroll progress bar + back-to-top button
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight || 1;
    bar.style.transform = 'scaleX(' + (h.scrollTop / max) + ')';
    totop.classList.toggle('show', h.scrollTop > 600);
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Count-up numbers
  function count(el){
    if (reduce) return;
    var end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), t0 = null;
    function step(t){
      t0 = t0 || t;
      var p = Math.min((t - t0) / 1200, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = (0).toFixed(dec);
    requestAnimationFrame(step);
  }

  // Reveal on scroll, staggered by position inside the parent
  var targets = document.querySelectorAll('section h2, .about > *, .stats > div, .item, .skills > div, .soft, .lead, .card, .ach li, .contact .wrap > *');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      var n = en.target.querySelector('[data-count]');
      if (n) count(n);
      io.unobserve(en.target);
    });
  }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
  targets.forEach(function(el){
    var i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty('--d', Math.min(i, 6) * 0.08 + 's');
    el.classList.add('reveal');
    io.observe(el);
  });

  // Highlight the nav link of the section in view
  var links = document.querySelectorAll('.nav a[href^="#"]');
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(function(s){ spy.observe(s); });
})();

(() => {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-linked marquee: drifts on its own and speeds up while you scroll
  const rows = [['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'MySQL', 'Hibernate', 'JPA', 'JWT', 'JavaScript', 'Maven', 'JDBC'],
                ['Figma', 'Prototyping', 'Wireframing', 'Design systems', 'Bootstrap', 'Responsive design', 'OpenAI API', 'Gemini API', 'DSA', 'Problem solving']];
  const mq = $('.marquee'); mq.innerHTML = rows.map((r) => `<div class="mq"><div class="track">${r.concat(r).map((x) => `<span>${x}</span>`).join('')}</div></div>`.replace(/<span>/g, '<span>')).join('');
  const tracks = [...mq.querySelectorAll('.track')], pos = [0, 0]; let last = scrollY;
  // duplicate again so the loop never shows a gap on wide screens
  tracks.forEach((t) => t.innerHTML += t.innerHTML);
  function tick() { const dy = Math.abs(scrollY - last); last = scrollY;
    tracks.forEach((t, k) => { const half = t.offsetWidth / 2; pos[k] = (pos[k] + 0.6 + dy * 0.6) % half; t.style.transform = `translateX(${k ? pos[k] - half : -pos[k]}px)`; });
    requestAnimationFrame(tick); }
  reduce ? tracks.forEach((t) => t.style.transform = 'none') : tick();

  // Light / dark toggle
  const root = document.documentElement, tbtn = $('#theme');
  const paint = () => tbtn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  paint();
  tbtn.addEventListener('click', () => {
    root.classList.add('fade');
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paint(); setTimeout(() => root.classList.remove('fade'), 450);
  });

  // Parallax for hero blobs + cursor glow on cards
  let busy = false; addEventListener('scroll', () => { if (busy) return; busy = true; requestAnimationFrame(() => { document.documentElement.style.setProperty('--sy', scrollY); busy = false; }); }, { passive: true });
  document.querySelectorAll('.card').forEach((c) => c.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px'); }));
})();
