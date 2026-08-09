/* ============================================
   Urdu Academy — NAV PARTAGÉE
   
   Gère : injection HTML nav, logo cliquable,
   menu mobile, scroll class, smooth scroll,
   dropdown Live Lessons (Kids / Women).
   
   Chaque page peut définir avant ce script :
   <script>var NAV_SECTION = { text: 'Regions', href: '#regions' };</script>

   Pour masquer le lien Pricing (pages sans section pricing,
   ex : kids, women), définir avant ce script :
   <script>var NAV_HIDE_PRICING = true;</script>

   Le thème du dropdown (clair/sombre) est détecté
   automatiquement selon le fond de la page. Pour forcer :
   <script>var NAV_LIGHT = true;</script>  (ou false)
============================================= */
(function() {
    var u = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.urls : {};
    var home = u.home || 'https://learn-urdu.online';
    var dashboard = u.dashboard || 'https://class.learn-urdu.online/dashboard';
    var courseUrl = 'https://class.learn-urdu.online/courses/urdu-a1-to-b1-complete-course/';
    var midLink = '';
    if (typeof NAV_SECTION !== 'undefined' && NAV_SECTION.text) {
        midLink = '<a href="' + NAV_SECTION.href + '">' + NAV_SECTION.text + '</a>';
    }

    /* --- Lien Pricing : masquable par page, et absolu par sécurité --- */
    var hidePricing = (typeof NAV_HIDE_PRICING !== 'undefined') && NAV_HIDE_PRICING;
    var pricingLink = hidePricing ? '' : '<a href="' + home + '/#pricing">Pricing</a>';

    /* --- Thème du dropdown : détection automatique du fond de page.
       Fond clair = dropdown clair, fond sombre = dropdown sombre.
       NAV_LIGHT = true/false reste utilisable pour forcer manuellement.
       Les valeurs clair passent en !important pour battre tout CSS
       .nav-drop-menu résiduel déjà présent dans la page. --- */
    function pageIsLight() {
        try {
            var el = document.body || document.documentElement;
            var bg = window.getComputedStyle(el).backgroundColor;
            var m = bg && bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (!m) return true; /* pas de fond lisible : clair par défaut */
            if (m[4] !== undefined && parseFloat(m[4]) === 0) {
                /* body transparent : regarder html */
                bg = window.getComputedStyle(document.documentElement).backgroundColor;
                m = bg && bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (!m) return true;
            }
            var lum = 0.299 * m[1] + 0.587 * m[2] + 0.114 * m[3];
            return lum > 128;
        } catch (e) { return true; }
    }
    var isLight = (typeof NAV_LIGHT !== 'undefined') ? !!NAV_LIGHT : pageIsLight();
    var imp       = isLight ? ' !important' : '';
    var ddBg      = (isLight ? '#ffffff' : '#1a1622') + imp;
    var ddBorder  = (isLight ? '1px solid rgba(212,168,83,0.35)' : '1px solid rgba(212,168,83,0.25)') + imp;
    var ddShadow  = (isLight ? '0 16px 40px rgba(0,0,0,0.12)' : '0 16px 40px rgba(0,0,0,0.35)') + imp;
    var ddText    = (isLight ? '#2d2438' : 'inherit') + imp;
    var ddHoverBg = (isLight ? 'rgba(212,168,83,0.15)' : 'rgba(212,168,83,0.12)') + imp;
    var ddHoverTx = (isLight ? '#b8862f' : '#d4a853') + imp;
    var ddMobile  = (isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)') + imp;

    /* --- Inject dropdown CSS --- */
    var navStyle = document.createElement('style');
    navStyle.textContent = ''
        + '.nav-dropdown { position: relative; display: inline-block; }'
        + '.nav-dropdown > .nav-drop-toggle { cursor: pointer; }'
        + '.nav-dropdown > .nav-drop-toggle::after { content: " \\25BE"; font-size: 0.75em; opacity: 0.8; }'
        + '.nav-drop-menu { position: absolute; top: 100%; left: 0; min-width: 210px; background: ' + ddBg + '; border: ' + ddBorder + '; border-radius: 12px; padding: 8px; box-shadow: ' + ddShadow + '; opacity: 0; visibility: hidden; transform: translateY(8px); transition: all .2s ease; z-index: 1000; }'
        + '.nav-dropdown:hover .nav-drop-menu, .nav-dropdown.open .nav-drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }'
        + '.nav-drop-menu a { display: block; padding: 11px 14px; border-radius: 8px; white-space: nowrap; font-size: 0.95rem; color: ' + ddText + '; }'
        + '.nav-drop-menu a:hover { background: ' + ddHoverBg + '; color: ' + ddHoverTx + '; }'
        + '.nav-drop-menu .drop-sub { display: block; font-size: 0.78rem; opacity: 0.6; margin-top: 2px; }'
        + '@media (max-width: 880px) {'
        + '  .nav-dropdown { display: block; width: 100%; }'
        + '  .nav-drop-menu { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none !important; border: none !important; background: ' + ddMobile + '; margin-top: 6px; padding: 0 !important; }'
        + '}';
    document.head.appendChild(navStyle);

    /* --- Inject nav HTML --- */
    var navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = ''
            + '<a href="' + home + '" class="nav-logo">'
            + '  <span class="logo-urdu">\u0627\u0631\u062F\u0648</span>'
            + '  <span class="logo-text">Urdu Academy</span>'
            + '</a>'
            + '<div class="nav-links">'
            + '  <a href="' + home + '/#audience">All Courses</a>'
            +    midLink
            + '  <span class="nav-dropdown" id="nav-live">'
            + '    <a class="nav-drop-toggle">Live Lessons</a>'
            + '    <span class="nav-drop-menu">'
            + '      <a href="' + home + '/kids/">Urdu for Kids<span class="drop-sub">1-on-1 with Maryam, ages up to 12</span></a>'
            + '      <a href="' + home + '/women/">Urdu for Women<span class="drop-sub">For women &amp; girls, with Maryam</span></a>'
            + '    </span>'
            + '  </span>'
            +    pricingLink
            + '  <a href="' + courseUrl + '" class="nav-cta">Start Now</a>'
            + '</div>'
            + '<button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">'
            + '  <span></span><span></span><span></span>'
            + '</button>';
    }

    /* --- Navbar scroll effect --- */
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- Mobile menu toggle --- */
    var btn = document.getElementById('mobile-menu-btn');
    var links = document.querySelector('.nav-links');
    if (btn && links) {
        btn.addEventListener('click', function() {
            links.classList.toggle('open');
            var spans = btn.querySelectorAll('span');
            if (links.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        links.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                links.classList.remove('open');
                var spans = btn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* --- Dropdown toggle on mobile (tap) --- */
    var drop = document.getElementById('nav-live');
    if (drop) {
        var toggle = drop.querySelector('.nav-drop-toggle');
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 880) {
                e.preventDefault();
                drop.classList.toggle('open');
            }
        });
    }

    /* --- Smooth scroll for anchor links (same-page only) --- */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
