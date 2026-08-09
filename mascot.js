/* ============================================
   UrduAcademy — MASCOTTE BALADEUSE
   Partagée par /kids/ et /women/.
   Chaque page définit AVANT ce script :
   <script>
   var MASCOT_CONFIG = {
     image: '../prof-chat.png',
     bookHref: '#book',
     messages: [ { ur: '...', en: '...' }, ... ]
   };
   </script>
============================================= */
(function() {
    var cfg = (typeof MASCOT_CONFIG !== 'undefined') ? MASCOT_CONFIG : {};
    var img = cfg.image || '../prof-chat.png';
    var messages = cfg.messages || [{ ur: 'آؤ اردو سیکھیں', en: "Let's learn Urdu!" }];
    var bookHref = cfg.bookHref || '#book';

    /* --- Inject CSS --- */
    var css = document.createElement('style');
    css.textContent = ''
        + '.mascot-wrap { position: fixed; z-index: 940; width: 92px; cursor: pointer; transition: left 2.6s ease-in-out, top 2.6s ease-in-out, transform .25s; will-change: left, top; }'
        + '.mascot-wrap:hover { transform: scale(1.08) rotate(-3deg); }'
        + '.mascot-wrap img { width: 100%; filter: drop-shadow(0 10px 18px rgba(0,0,0,0.22)); display: block; animation: mascotBob 2.2s ease-in-out infinite; }'
        + '@keyframes mascotBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }'
        + '.mascot-bubble { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-8px); background: #fff; border: 2px solid var(--mascot-accent, #ff6b6b); border-radius: 16px; padding: 10px 14px; min-width: 150px; max-width: 220px; text-align: center; box-shadow: 0 10px 26px rgba(0,0,0,0.16); opacity: 0; visibility: hidden; transition: opacity .35s, visibility .35s; pointer-events: none; }'
        + '.mascot-bubble.show { opacity: 1; visibility: visible; }'
        + '.mascot-bubble .b-ur { font-family: "Noto Nastaliq Urdu", serif; font-size: 1.05rem; color: var(--mascot-accent, #ff6b6b); line-height: 1.8; display: block; margin-bottom: 3px; }'
        + '.mascot-bubble .b-en { font-family: "Baloo 2", "Outfit", sans-serif; font-weight: 600; font-size: 0.82rem; color: #4a4a4a; display: block; }'
        + '.mascot-bubble::after { content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 8px solid transparent; border-top-color: #fff; }'
        + '@media (max-width: 600px) { .mascot-wrap { width: 66px; } .mascot-bubble { min-width: 120px; font-size: 0.9em; } }';
    document.head.appendChild(css);

    /* --- Build mascot --- */
    var wrap = document.createElement('div');
    wrap.className = 'mascot-wrap';
    wrap.innerHTML = ''
        + '<div class="mascot-bubble" id="mascot-bubble"></div>'
        + '<img src="' + img + '" alt="Maryam mascot">';
    document.body.appendChild(wrap);

    var bubble = document.getElementById('mascot-bubble');

    /* --- Positions to roam between (in % of viewport) --- */
    var spots = [
        { left: '4%',  top: '78%' },
        { left: '85%', top: '70%' },
        { left: '8%',  top: '45%' },
        { left: '82%', top: '40%' },
        { left: '45%', top: '80%' }
    ];
    var idx = 0;

    function placeInstant() {
        wrap.style.left = spots[0].left;
        wrap.style.top = spots[0].top;
    }

    function moveNext() {
        idx = (idx + 1) % spots.length;
        wrap.style.left = spots[idx].left;
        wrap.style.top = spots[idx].top;
    }

    var msgI = 0;
    function showMessage() {
        var m = messages[msgI % messages.length];
        msgI++;
        bubble.innerHTML = '<span class="b-ur">' + m.ur + '</span><span class="b-en">' + m.en + '</span>';
        bubble.classList.add('show');
        setTimeout(function(){ bubble.classList.remove('show'); }, 4200);
    }

    /* --- Start --- */
    placeInstant();
    setTimeout(showMessage, 1500);

    setInterval(moveNext, 7000);
    setInterval(showMessage, 9000);

    /* --- Click → go to booking --- */
    wrap.addEventListener('click', function() {
        var p = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.products) || {};
        var link = cfg.productKey && p[cfg.productKey] && p[cfg.productKey].indexOf('#REPLACE') === -1 ? p[cfg.productKey] : null;
        if (link) { window.open(link, '_blank'); }
        else {
            var t = document.querySelector(bookHref);
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        }
    });
})();
