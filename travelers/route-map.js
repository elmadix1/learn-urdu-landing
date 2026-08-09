/* ===== Route map · learn-urdu.online/travelers =====
   Animation en une seule passe au moment ou la section entre
   dans le viewport (IntersectionObserver). Aucun lien avec le
   scroll lui-meme : plus de scrub, plus de jank, plus de
   conflit avec travelers-script.js ou GSAP. */

(function () {
  'use strict';

  function initRouteMap() {
    var line = document.getElementById('routeLine');
    var svg = document.querySelector('.route-map-svg');
    if (!line || !svg) return;

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Animation de trace ---------- */
    svg.classList.add('route-anim');

    function reveal() {
      svg.classList.add('route-revealed');
      if (reduceMotion) return;

      var len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      /* Force le reflow avant de lancer la transition */
      line.getBoundingClientRect();
      line.style.transition = 'stroke-dashoffset 2.4s ease-in-out';
      line.style.strokeDashoffset = '0';

      line.addEventListener('transitionend', function restoreDashes() {
        line.removeEventListener('transitionend', restoreDashes);
        line.style.transition = 'none';
        line.style.strokeDasharray = '7 7';
        line.style.strokeDashoffset = '0';
      });
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      svg.classList.add('route-revealed');
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });
      observer.observe(svg);
    }

    /* ---------- Tooltip ---------- */
    var tip = document.getElementById('routeTooltip');
    var wrap = document.querySelector('.route-wrap');
    if (!tip || !wrap) return;

    document.querySelectorAll('.route-stop').forEach(function (stop) {
      stop.addEventListener('mouseenter', function () {
        tip.innerHTML = '<strong>' + stop.dataset.city + '</strong>' + stop.dataset.lessons;
        tip.classList.add('show');
      });
      stop.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        tip.style.left = (e.clientX - r.left) + 'px';
        tip.style.top = (e.clientY - r.top) + 'px';
      });
      stop.addEventListener('mouseleave', function () {
        tip.classList.remove('show');
      });
      /* Support tactile : tap pour afficher, tap ailleurs pour fermer */
      stop.addEventListener('click', function (e) {
        e.stopPropagation();
        var box = stop.getBoundingClientRect();
        var r = wrap.getBoundingClientRect();
        tip.innerHTML = '<strong>' + stop.dataset.city + '</strong>' + stop.dataset.lessons;
        tip.style.left = (box.left + box.width / 2 - r.left) + 'px';
        tip.style.top = (box.top - r.top) + 'px';
        tip.classList.add('show');
      });
    });
    document.addEventListener('click', function () {
      tip.classList.remove('show');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouteMap);
  } else {
    initRouteMap();
  }
})();
