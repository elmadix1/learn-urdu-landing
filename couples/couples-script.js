/* OURDOUACADEMY · MIXED COUPLES */

(function() {
    'use strict';
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.querySelectorAll('[data-animate], .hero-tag, .hero-title .line, .hero-subtitle, .hero-btn').forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; });
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.bg-photo').forEach(function(photoDiv) {
        photoDiv.style.opacity = '0';
        var img = photoDiv.querySelector('img');
        if (!img) return;
        function reveal() {
            img.classList.add('loaded');
            var target = photoDiv.classList.contains('bg-photo-1') ? 0.5 : 0;
            gsap.to(photoDiv, { opacity: target, duration: 1.2, ease: 'power2.out' });
        }
        if (img.complete) { reveal(); } else { img.addEventListener('load', reveal); }
    });

    var orb1 = document.getElementById('orb1'), orb2 = document.getElementById('orb2'), orb3 = document.getElementById('orb3'), orb4 = document.getElementById('orb4');
    var bgIslamic = document.getElementById('bg-islamic'), bgCalligraphy = document.getElementById('bg-calligraphy');
    var bgPhoto1 = document.getElementById('bg-photo-1'), bgPhoto2 = document.getElementById('bg-photo-2'), bgPhoto3 = document.getElementById('bg-photo-3');

    if (bgPhoto1 && bgPhoto2) {
        gsap.fromTo(bgPhoto1, { opacity: 0.5 }, { opacity: 0, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 85%', end: 'bottom 30%', scrub: 1.5 } });
        gsap.fromTo(bgPhoto2, { opacity: 0 }, { opacity: 0.5, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 85%', end: 'bottom 30%', scrub: 1.5 } });
        gsap.fromTo('#bg-photo-2 img', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 80%', end: 'bottom 20%', scrub: 2 } });
    }
    if (bgPhoto2 && bgPhoto3) {
        gsap.fromTo(bgPhoto2, { opacity: 0.5 }, { opacity: 0, immediateRender: false, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 90%', end: 'bottom 40%', scrub: 1.5 } });
        gsap.fromTo(bgPhoto3, { opacity: 0 }, { opacity: 0.4, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 90%', end: 'bottom 40%', scrub: 1.5 } });
        gsap.fromTo('#bg-photo-3 img', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 80%', end: 'bottom 20%', scrub: 2 } });
    }
    if (bgPhoto3) {
        ScrollTrigger.create({ trigger: '#pricing', start: 'top 80%', end: 'bottom 20%', scrub: 1,
            onUpdate: function(self) {
                var img = bgPhoto3.querySelector('img');
                if (img) {
                    var b = 1 - (self.progress * 0.7);
                    var s = 1 - (self.progress * 0.3);
                    img.style.filter = 'brightness(' + b + ') saturate(' + s + ') blur(' + (self.progress * 5) + 'px)';
                }
            },
            onLeaveBack: function() {
                var img = bgPhoto3.querySelector('img');
                if (img) img.style.filter = '';
            }
        });
    }

    if (orb1) gsap.to(orb1, { x: 40, y: 30, duration: 12, ease: 'sine.inOut', repeat: -1, yoyo: true });
    if (orb2) gsap.to(orb2, { x: -30, y: -40, duration: 15, ease: 'sine.inOut', repeat: -1, yoyo: true });
    if (orb3) gsap.to(orb3, { x: 50, y: -20, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true });
    if (orb4) {
        gsap.fromTo(orb4, { opacity: 0 }, { opacity: 0.12, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 85%', end: 'bottom 30%', scrub: 1.5 } });
        gsap.to(orb4, { x: -30, y: 20, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }
    if (orb1) { gsap.to(orb1, { opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 80%', end: 'bottom 40%', scrub: 1 } }); }

    if (bgIslamic) {
        gsap.fromTo(bgIslamic, { opacity: 0 }, { opacity: 0.06, ease: 'none', scrollTrigger: { trigger: '#journey', start: 'top 80%', end: 'bottom 50%', scrub: 1 } });
        gsap.to(bgIslamic, { opacity: 0.12, ease: 'none', scrollTrigger: { trigger: '#numbers', start: 'top 80%', end: 'bottom 20%', scrub: 1 } });
        gsap.to(bgIslamic, { opacity: 0.18, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 80%', end: 'bottom 30%', scrub: 1 } });
    }

    if (bgCalligraphy) { gsap.fromTo(bgCalligraphy, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 80%', end: 'bottom 50%', scrub: 1 } }); }
    document.querySelectorAll('.cal-letter').forEach(function(l, i) {
        gsap.to(l, { y: -15 + Math.random() * 30, x: -10 + Math.random() * 20, rotation: -4 + Math.random() * 8, duration: 10 + Math.random() * 6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.6 });
    });

    var tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-title .line', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }, '-=0.4')
      .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-btn', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

    document.querySelectorAll('.problem-card').forEach(function(c, i) {
        gsap.fromTo(c, { opacity: 0, x: (i % 2 === 0) ? -60 : 60, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    gsap.fromTo('.shift-urdu', { opacity: 0, scale: 0.4 }, { opacity: 0.8, scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.fromTo('.shift-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.fromTo('.shift-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.to('.shift-urdu', { scale: 1.15, scrollTrigger: { trigger: '#shift', start: 'top 50%', end: 'bottom 30%', scrub: 2 } });

    document.querySelectorAll('[data-animate]').forEach(function(el) {
        if (el.classList.contains('problem-card') || el.classList.contains('shift-content')) return;
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    document.querySelectorAll('.stat-number').forEach(function(s) {
        gsap.fromTo(s, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: s, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    gsap.fromTo('.ba-before', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });
    gsap.fromTo('.ba-after', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });
    gsap.fromTo('.ba-divider', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(2)', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });

    gsap.fromTo('.pricing-card-main', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.pricing-card-main', start: 'top 85%', toggleActions: 'play none none none' } });

    gsap.fromTo('.final-urdu', { opacity: 0, scale: 0.7 }, { opacity: 0.5, scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta h2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta .hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
})();
