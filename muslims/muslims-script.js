/* OURDOUACADEMY · MUSLIMS */

(function() {
    'use strict';
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.querySelectorAll('[data-animate], .hero-tag, .hero-title .line, .hero-subtitle, .hero-btn').forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; });
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    /* PRELOAD */
    document.querySelectorAll('.bg-photo').forEach(function(d) {
        d.style.opacity = '0';
        var img = d.querySelector('img');
        if (!img) return;
        function reveal() {
            img.classList.add('loaded');
            var t = d.classList.contains('bg-photo-1') ? 0.5 : 0;
            gsap.to(d, { opacity: t, duration: 1.2, ease: 'power2.out' });
        }
        if (img.complete) { reveal(); } else { img.addEventListener('load', reveal); }
    });

    var p1 = document.getElementById('bg-photo-1'), p2 = document.getElementById('bg-photo-2'), p3 = document.getElementById('bg-photo-3');
    var patSub = document.getElementById('bg-islamic-subtle'), patStr = document.getElementById('bg-islamic-strong');
    var bgCal = document.getElementById('bg-calligraphy');

    /* PHOTOS */
    if (p1 && p2) {
        gsap.fromTo(p1, { opacity: 0.5 }, { opacity: 0, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 85%', end: 'bottom 30%', scrub: 1.5 } });
        gsap.fromTo(p2, { opacity: 0 }, { opacity: 0.5, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 85%', end: 'bottom 30%', scrub: 1.5 } });
        gsap.fromTo('#bg-photo-2 img', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#shift', start: 'top 80%', end: 'bottom 20%', scrub: 2 } });
    }
    if (p2 && p3) {
        gsap.fromTo(p2, { opacity: 0.5 }, { opacity: 0, immediateRender: false, ease: 'none', scrollTrigger: { trigger: '#beyond', start: 'top 85%', end: 'bottom 40%', scrub: 1.5 } });
        gsap.fromTo(p3, { opacity: 0 }, { opacity: 0.4, ease: 'none', scrollTrigger: { trigger: '#beyond', start: 'top 85%', end: 'bottom 40%', scrub: 1.5 } });
        gsap.fromTo('#bg-photo-3 img', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#beyond', start: 'top 80%', end: 'bottom 30%', scrub: 2 } });
    }
    if (p3) {
        ScrollTrigger.create({ trigger: '#faq', start: 'top 80%', end: 'bottom 20%', scrub: 1,
            onUpdate: function(self) {
                var img = p3.querySelector('img');
                if (img) {
                    var b = 1 - (self.progress * 0.7);
                    var s = 1 - (self.progress * 0.3);
                    img.style.filter = 'brightness(' + b + ') saturate(' + s + ') blur(' + (self.progress * 5) + 'px)';
                }
            },
            onLeaveBack: function() {
                var img = p3.querySelector('img');
                if (img) img.style.filter = '';
            }
        });
    }

    /* ISLAMIC PATTERNS */
    if (patSub) { gsap.to(patSub, { opacity: 0.08, ease: 'none', scrollTrigger: { trigger: '#journey', start: 'top 80%', end: 'bottom 50%', scrub: 1 } }); }
    if (patStr) {
        gsap.fromTo(patStr, { opacity: 0 }, { opacity: 0.06, ease: 'none', scrollTrigger: { trigger: '#library', start: 'top 80%', end: 'bottom 50%', scrub: 1 } });
        gsap.to(patStr, { opacity: 0.12, ease: 'none', scrollTrigger: { trigger: '#inside', start: 'top 80%', end: 'bottom 40%', scrub: 1 } });
        gsap.to(patStr, { opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '#faq', start: 'top 80%', end: 'bottom 30%', scrub: 1 } });
    }

    /* CALLIGRAPHY */
    if (bgCal) { gsap.fromTo(bgCal, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '#beyond', start: 'top 80%', end: 'bottom 50%', scrub: 1 } }); }
    document.querySelectorAll('.cal-letter').forEach(function(l, i) {
        gsap.to(l, { y: -15 + Math.random() * 30, x: -8 + Math.random() * 16, rotation: -3 + Math.random() * 6, duration: 12 + Math.random() * 6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.4 });
    });

    /* BODY COLOR */
    ScrollTrigger.create({ trigger: '#shift', start: 'top 60%',
        onEnter: function() { gsap.to('body', { backgroundColor: '#08100a', duration: 2 }); },
        onLeaveBack: function() { gsap.to('body', { backgroundColor: '#0a100a', duration: 2 }); }
    });

    /* HERO */
    var tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-title .line', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }, '-=0.4')
      .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-btn', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

    /* CARDS */
    document.querySelectorAll('.problem-card').forEach(function(c, i) {
        gsap.fromTo(c, { opacity: 0, x: (i % 2 === 0) ? -60 : 60, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    /* SHIFT */
    gsap.fromTo('.shift-urdu', { opacity: 0, scale: 0.4 }, { opacity: 0.8, scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.fromTo('.shift-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.fromTo('.shift-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '#shift', start: 'top 70%', toggleActions: 'play none none none' } });
    gsap.to('.shift-urdu', { scale: 1.15, scrollTrigger: { trigger: '#shift', start: 'top 50%', end: 'bottom 30%', scrub: 2 } });

    /* GENERIC */
    document.querySelectorAll('[data-animate]').forEach(function(el) {
        if (el.classList.contains('problem-card') || el.classList.contains('shift-content')) return;
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    /* STATS */
    document.querySelectorAll('.stat-number').forEach(function(s) {
        gsap.fromTo(s, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: s, start: 'top 88%', toggleActions: 'play none none none' } });
    });

    /* BEFORE/AFTER */
    gsap.fromTo('.ba-before', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });
    gsap.fromTo('.ba-after', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });
    gsap.fromTo('.ba-divider', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(2)', scrollTrigger: { trigger: '.before-after', start: 'top 85%', toggleActions: 'play none none none' } });

    /* PRICING */
    gsap.fromTo('.pricing-card-main', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.pricing-card-main', start: 'top 85%', toggleActions: 'play none none none' } });

    /* CTA */
    gsap.fromTo('.final-urdu', { opacity: 0, scale: 0.7 }, { opacity: 0.5, scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta h2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.final-cta .hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.final-cta', start: 'top 80%', toggleActions: 'play none none none' } });
})();
