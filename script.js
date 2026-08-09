/* ============================================
   OURDOUACADEMY — SCRIPT PRINCIPAL
   
   Animation : Lettres ourdou calligraphiques 
   qui flottent et dérivent en arrière-plan.
   
   Dépendances (dans index.html) :
   - Three.js r128
   - GSAP 3.12.5 + ScrollTrigger
   - Paddle.js v2
============================================= */

(function() {
    'use strict';

    /* ============================================
       1. LETTRES OURDOU FLOTTANTES (Three.js)
    ============================================= */

    var CONFIG = {
        letterCount: 60,
        fieldWidth: 50,
        fieldHeight: 35,
        fieldDepth: 30,
        fallSpeed: 0.15,
        driftSpeed: 0.08,
        mouseInfluence: 0.0004,
        scrollSpeed: 0.0003,
        fogColor: 0x0a0a0f,
        fogNear: 15,
        fogFar: 50
    };

    var URDU_CHARS = [
        'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ',
        'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط',
        'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن',
        'و', 'ہ', 'ی', 'ے',
        'شعر', 'دل', 'عشق', 'زبان', 'خط', 'نور', 'روح', 'سفر'
    ];

    var LETTER_COLORS = [
        '#d4a853', '#e8c97a', '#b08930', '#f0a030',
        '#c4944a', '#a07830', '#ddb868'
    ];

    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(CONFIG.fogColor, 1);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(CONFIG.fogColor, CONFIG.fogNear, CONFIG.fogFar);
    scene.background = new THREE.Color(CONFIG.fogColor);

    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 28;

    function createLetterTexture(char, color) {
        var size = 256;
        var c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        var ctx = c.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        var fontSize = char.length > 1 ? 72 : 120;
        ctx.font = fontSize + 'px "Noto Nastaliq Urdu", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fillText(char, size / 2, size / 2);
        var texture = new THREE.CanvasTexture(c);
        texture.needsUpdate = true;
        return texture;
    }

    var letters = [];

    for (var i = 0; i < CONFIG.letterCount; i++) {
        var charIndex = Math.floor(Math.random() * URDU_CHARS.length);
        var colorIndex = Math.floor(Math.random() * LETTER_COLORS.length);
        var char = URDU_CHARS[charIndex];
        var color = LETTER_COLORS[colorIndex];
        var texture = createLetterTexture(char, color);

        var material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.08 + Math.random() * 0.18,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        var sprite = new THREE.Sprite(material);
        var scale = 1.5 + Math.random() * 4;
        sprite.scale.set(scale, scale, 1);
        sprite.position.x = (Math.random() - 0.5) * CONFIG.fieldWidth;
        sprite.position.y = (Math.random() - 0.5) * CONFIG.fieldHeight;
        sprite.position.z = (Math.random() - 0.5) * CONFIG.fieldDepth;

        scene.add(sprite);

        letters.push({
            sprite: sprite,
            fallSpeed: 0.005 + Math.random() * CONFIG.fallSpeed * 0.1,
            driftX: (Math.random() - 0.5) * CONFIG.driftSpeed * 0.05,
            driftZ: (Math.random() - 0.5) * 0.01,
            rotSpeed: (Math.random() - 0.5) * 0.003,
            baseY: sprite.position.y,
            phase: Math.random() * Math.PI * 2,
            amplitude: 0.2 + Math.random() * 0.5
        });
    }

    var mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', function(e) {
        targetMouseX = (e.clientX - window.innerWidth / 2) * CONFIG.mouseInfluence;
        targetMouseY = (e.clientY - window.innerHeight / 2) * CONFIG.mouseInfluence;
    });

    var scrollY = 0;
    window.addEventListener('scroll', function() {
        scrollY = window.pageYOffset;
    });

    var clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        var elapsed = clock.getElapsedTime();

        mouseX += (targetMouseX - mouseX) * 0.03;
        mouseY += (targetMouseY - mouseY) * 0.03;

        for (var i = 0; i < letters.length; i++) {
            var l = letters[i];
            var s = l.sprite;

            s.position.y -= l.fallSpeed;
            s.position.x += l.driftX + Math.sin(elapsed * 0.3 + l.phase) * 0.003;
            s.position.z += l.driftZ;
            s.material.rotation += l.rotSpeed;
            s.position.x += mouseX * 0.3;
            s.position.y += mouseY * 0.2;

            if (s.position.y < -CONFIG.fieldHeight / 2 - 3) {
                s.position.y = CONFIG.fieldHeight / 2 + 3;
                s.position.x = (Math.random() - 0.5) * CONFIG.fieldWidth;
                s.position.z = (Math.random() - 0.5) * CONFIG.fieldDepth;
            }

            if (Math.abs(s.position.x) > CONFIG.fieldWidth / 2 + 5) {
                s.position.x = (Math.random() - 0.5) * CONFIG.fieldWidth;
            }
        }

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /* ============================================
       2. ANIMATIONS GSAP + SCROLLTRIGGER
    ============================================= */

    gsap.registerPlugin(ScrollTrigger);

    var heroTimeline = gsap.timeline({ delay: 0.5 });
    heroTimeline
        .to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-title .line', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }, '-=0.4')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to('.hero-btn', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.scroll-indicator', { opacity: 0.6, duration: 1, ease: 'power2.out' }, '-=0.3');

    gsap.utils.toArray('[data-animate]').forEach(function(el, idx) {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 1, y: 0, x: 0, duration: 0.8, delay: (idx % 4) * 0.1, ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.pricing-card-main').forEach(function(el) {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.section-header').forEach(function(header) {
        gsap.fromTo(header,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none none' },
                y: 0, opacity: 1, duration: 1, ease: 'power3.out'
            }
        );
    });

})();
/* ============================================
   FIN DE LA IIFE — le code ci-dessous est global
============================================= */


/* ============================================
   3. PADDLE CHECKOUT
   
   Dashboard : https://vendors.paddle.com/ > Catalog > Prices
   En production : retirer environment: 'sandbox'
============================================= */

function openPaddleCheckout(priceId) {
    if (typeof Paddle === 'undefined') {
        console.error('Paddle.js non charge.');
        alert('Payment system is loading, please try again.');
        return;
    }
    try {
        Paddle.Checkout.open({
            items: [{ priceId: priceId, quantity: 1 }]
        });
    } catch (error) {
        console.error('Erreur Paddle:', error);
    }
}
