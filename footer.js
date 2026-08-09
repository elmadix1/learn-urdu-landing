/* ============================================
   Urdu Academy — FOOTER PARTAGÉ
============================================= */
(function() {
    var u = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.urls : {};
    var footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = ''
            + '<div class="footer-grid">'
            + '  <div class="footer-brand">'
            + '    <span class="logo-urdu">\u0627\u0631\u062F\u0648</span>'
            + '    <span class="logo-text">Urdu Academy</span>'
            + '    <p class="footer-tagline">Making Urdu accessible to the world.</p>'
            + '  </div>'
            + '  <div class="footer-col">'
            + '    <h4>Foundation</h4>'
            + '    <a href="' + (u.home || '#') + '">A1 to B1 Course</a>'
            + '    <a href="' + (u.punjabi || '#') + '">Punjabi</a>'
            + '  </div>'
            + '  <div class="footer-col">'
            + '    <h4>Specializations</h4>'
            + '    <a href="' + (u.diaspora || '#') + '">Diaspora</a>'
            + '    <a href="' + (u.couples || '#') + '">Couples</a>'
            + '    <a href="' + (u.travelers || '#') + '">Travelers</a>'
            + '    <a href="' + (u.muslims || '#') + '">Muslims</a>'
            + '    <a href="' + (u.professionals || '#') + '">Professionals</a>'
            + '    <a href="' + (u.students || '#') + '">Students</a>'
            + '    <a href="' + (u.media || '#') + '">Media Lovers</a>'
            + '    <a href="' + (u.poetry || '#') + '">Poetry</a>'
            + '  </div>'
            + '  <div class="footer-col">'
            + '    <h4>Legal</h4>'
            + '    <a href="' + (u.terms || '#') + '">Terms of Service</a>'
            + '    <a href="' + (u.privacy || '#') + '">Privacy Policy</a>'
            + '    <a href="' + (u.refund || '#') + '">Refund Policy</a>'
            + '  </div>'
            + '  <div class="footer-col">'
            + '    <h4>Connect</h4>'
            + '    <a href="' + (u.tiktok || '#') + '" target="_blank" rel="noopener">TikTok</a>'
            + '    <a href="' + (u.email || '#') + '">Email Us</a>'
            + '  </div>'
            + '</div>'
            + '<div class="footer-bottom">'
            + '  <p>&copy; 2026 Urdu Academy. All rights reserved.</p>'
            + '</div>';
    }
})();
