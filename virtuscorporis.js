(function () {
  'use strict';
  var pBar = document.getElementById('preloader-bar');
  var pPct = document.getElementById('preloader-percent');
  var prog = 0;
  var preloadTimer = setInterval(function () {
    prog += Math.random() * 14 + 3;
    if (prog >= 100) { prog = 100; clearInterval(preloadTimer); onReady(); }
    pBar.style.width = prog + '%';
    pPct.textContent = Math.floor(prog) + '%';
  }, 110);
 
  function onReady() {
    setTimeout(function () { document.getElementById('preloader').classList.add('remove'); }, 400);
    setTimeout(revealHero, 900);
  }
 
  function revealHero() {
    ['heroEyebrow','heroLine1','heroLine2'].forEach(function (id) {
      document.getElementById(id).classList.add('show');
    });
    setTimeout(function () { document.getElementById('heroSub').classList.add('show'); }, 300);
    setTimeout(function () { document.getElementById('heroMeta').classList.add('show'); }, 600);
    setTimeout(function () { document.getElementById('heroScroll').classList.add('show'); }, 900);
  }
 
  function updateClock() {
    var d = new Date();
    var h = String(d.getHours()).padStart(2, '0');
    var m = String(d.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerHTML = h + '<span>:</span>' + m;
  }
  updateClock();
  setInterval(updateClock, 1000);
 
  var cursor = document.getElementById('cursor');
  var cx = 0, cy = 0;
  document.addEventListener('mousemove', function (e) {
    cx = e.clientX; cy = e.clientY;
    cursor.classList.add('visible');
  });
  (function cursorLoop() {
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(cursorLoop);
  }());
 
  function addCursorHover(el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('big'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('big'); });
  }
 
  var ioStrip = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('revealed'); ioStrip.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
 
  var ioReveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('show'); ioReveal.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
 
  document.querySelectorAll('.js-strip').forEach(function (el) {
    ioStrip.observe(el);
    addCursorHover(el);
  });
  document.querySelectorAll('.js-reveal').forEach(function (el) { ioReveal.observe(el); });
 
  var parallaxEls = document.querySelectorAll('.js-parallax');
 
  /* HERO PARALLAX */
  var heroImg = document.querySelector('.js-hero-parallax');
  function onScroll() {
    if (heroImg) {
      var scrollY = window.scrollY || window.pageYOffset;
      heroImg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
    }
    var vh = window.innerHeight;
    parallaxEls.forEach(function (strip) {
      var rect = strip.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var img = strip.querySelector('.strip-img');
      if (!img) return;
      var progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
      img.style.transform = 'translateY(' + (progress * 12) + '%)';
    });
  }
 
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 
}());