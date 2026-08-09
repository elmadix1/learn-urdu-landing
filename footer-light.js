/* ============================================
   UrduAcademy — FOOTER CLAIR (Kids / Women)
   Footer autonome avec son propre CSS clair.
============================================= */
(function() {
    var u = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.urls : {};

    /* --- Inject light footer CSS --- */
    var css = document.createElement('style');
    css.textContent = ''
        + '#footer { background: #fff; border-top: 1px solid rgba(0,0,0,0.07); color: #3a2e22; margin-top: 40px; }'
        + '#footer .fl-grid { max-width: 1100px; margin: 0 auto; padding: 48px 5% 28px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr; gap: 30px; }'
        + '#footer .fl-brand .logo-urdu { font-family: "Noto Nastaliq Urdu", serif; font-size: 1.5rem; color: #ff6b6b; display: block; }'
        + '#footer .fl-brand .logo-text { font-family: "Baloo 2", "Outfit", sans-serif; font-weight: 800; font-size: 1.2rem; display: block; margin-top: 4px; }'
        + '#footer .fl-tag { color: #6b5d4d; font-size: 0.9rem; margin-top: 8px; max-width: 220px; }'
        + '#footer .fl-col h4 { font-family: "Baloo 2", "Outfit", sans-serif; font-size: 1rem; margin-bottom: 12px; color: #3a2e22; }'
        + '#footer .fl-col a { display: block; color: #6b5d4d; text-decoration: none; font-size: 0.92rem; padding: 4px 0; transition: color .2s; }'
        + '#footer .fl-col a:hover { color: #ff6b6b; }'
        + '#footer .fl-bottom { border-top: 1px solid rgba(0,0,0,0.06); text-align: center; padding: 18px 5%; color: #8a7c6c; font-size: 0.85rem; }'
        + '@media (max-width: 820px) { #footer .fl-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }';
    document.head.appendChild(css);

    var footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = ''
            + '<div class="fl-grid">'
            + '  <div class="fl-brand">'
            + '    <span class="logo-urdu">\u0627\u0631\u062F\u0648</span>'
            + '    <span class="logo-text">UrduAcademy</span>'
            + '    <p class="fl-tag">Making Urdu accessible to the world.</p>'
            + '  </div>'
            + '  <div class="fl-col">'
            + '    <h4>Live Lessons</h4>'
            + '    <a href="' + (u.home || '#') + '/kids/">Urdu for Kids</a>'
            + '    <a href="' + (u.home || '#') + '/women/">Urdu for Women</a>'
            + '  </div>'
            + '  <div class="fl-col">'
            + '    <h4>Courses</h4>'
            + '    <a href="' + (u.home || '#') + '">A1 to B1 Course</a>'
            + '    <a href="' + (u.punjabi || '#') + '">Punjabi</a>'
            + '    <a href="' + (u.home || '#') + '/#specializations">Specializations</a>'
            + '  </div>'
            + '  <div class="fl-col">'
            + '    <h4>Legal</h4>'
            + '    <a href="' + (u.terms || '#') + '">Terms</a>'
            + '    <a href="' + (u.privacy || '#') + '">Privacy</a>'
            + '    <a href="' + (u.refund || '#') + '">Refund</a>'
            + '  </div>'
            + '  <div class="fl-col">'
            + '    <h4>Connect</h4>'
            + '    <a href="' + (u.tiktok || '#') + '" target="_blank" rel="noopener">TikTok</a>'
            + '    <a href="' + (u.email || '#') + '">Email Us</a>'
            + '  </div>'
            + '</div>'
            + '<div class="fl-bottom">'
            + '  <p>&copy; 2026 UrduAcademy. All rights reserved.</p>'
            + '</div>';
    }
})();
