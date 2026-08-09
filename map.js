/* ============================================
   WHERE URDU TAKES YOU — D3.js Map
   
   Requires:
   - d3.js v7 (CDN in head)
   - pakistan.geojson in repo root
     (download from GADM: gadm41_PAK_1.json, 
      rename to pakistan.geojson)
   ============================================ */

(function() {
    'use strict';

    var mapContainer = document.getElementById('pakistan-map');
    if (!mapContainer) return;

    /* ----- CONFIG ----- */
    var WIDTH = 1000;
    var HEIGHT = 650;
    var GOLD = '#d4a853';

    /* ----- PROVINCE NAME MAPPING ----- */
    /* Maps GADM NAME_1 values to our region keys */
    var PROVINCE_MAP = {
        'Punjab': 'punjab',
        'Sindh': 'sindh',
        'Balochistan': 'balochistan',
        'Baluchistan': 'balochistan',
        'Khyber Pakhtunkhwa': 'kpk',
        'N.W.F.P.': 'kpk',
        'Khyber-Pakhtunkhwa': 'kpk',
        'F.A.T.A.': 'kpk',
        'Federally Administered Tribal Areas': 'kpk',
        'Gilgit-Baltistan': 'gb',
        'Gilgit Baltistan': 'gb',
        'Northern Areas': 'gb',
        'Azad Kashmir': 'azk',
        'Azad Jammu and Kashmir': 'azk',
        'Islamabad': 'ict'
    };

    /* ----- URDU LABELS ----- */
    var PROVINCE_URDU = {
        punjab: 'پنجاب',
        sindh: 'سندھ',
        balochistan: 'بلوچستان',
        kpk: 'خیبرپختونخوا',
        gb: 'گلگت بلتستان',
        azk: 'آزاد کشمیر',
        ict: 'اسلام آباد'
    };

    /* ----- REGION DATA (info cards) ----- */
    var REGIONS = {
        gb: {
            urdu: 'شمال', name: 'Gilgit-Baltistan',
            hook: 'K2, Hunza Valley, the Karakoram Highway. The most beautiful mountains on earth, and the most hospitable people.',
            phrase: '"Khush aamdeed" hits different at 4,000m.',
            stat: 'Home to 5 of the world\'s 14 peaks above 8,000m',
            link: '/travelers/', linkText: 'Explore the Travelers track'
        },
        azk: {
            urdu: 'کشمیر', name: 'Azad Kashmir',
            hook: 'Neelum Valley, Muzaffarabad, Rawalakot. Green mountains, roaring rivers, and a warmth that defies altitude.',
            phrase: 'Where every valley has its own accent.',
            stat: 'Some of the most lush landscapes in South Asia',
            link: '/travelers/', linkText: 'Explore the Travelers track'
        },
        kpk: {
            urdu: 'سرحد', name: 'Khyber Pakhtunkhwa',
            hook: 'The frontier. Peshawar\'s old city, Swat Valley, Chitral. Where hospitality is not a custom, it is a law.',
            phrase: '"Chai piyo" becomes a command here.',
            stat: 'Peshawar: one of the oldest living cities in Asia',
            link: '/travelers/', linkText: 'Explore the Travelers track'
        },
        punjab: {
            urdu: 'پنجاب', name: 'Punjab',
            hook: 'The heartland. Lahore\'s food streets, Mughal heritage, and 120 million people who believe their province is the best.',
            phrase: 'Where "bas ek aur roti" is never the last roti.',
            stat: 'Lahore: cultural capital, food capital, argument capital',
            link: '/diaspora/', linkText: 'Explore the Diaspora track'
        },
        ict: {
            urdu: 'اسلام آباد', name: 'Islamabad',
            hook: 'The planned capital. Margalla Hills, Faisal Mosque, diplomatic enclave. Where Pakistan meets the world.',
            phrase: 'The quietest city in Pakistan. Lahoris find it suspicious.',
            stat: 'Pakistan\'s most green and organized city',
            link: '/professionals/', linkText: 'Explore the Professionals track'
        },
        sindh: {
            urdu: 'سندھ', name: 'Sindh',
            hook: 'Karachi\'s 20 million people, Mohenjo-daro\'s 5,000 years, and the best biryani in the country.',
            phrase: '"Sab se pehle chai, phir baat" — Karachi runs on chai.',
            stat: 'Karachi: the city that never sleeps, never stops eating',
            link: '/media/', linkText: 'Explore the Media track'
        },
        balochistan: {
            urdu: 'بلوچستان', name: 'Balochistan',
            hook: 'Pakistan\'s wild west. The Makran coast, Quetta\'s orchards, Hingol National Park. Vast, remote, unforgettable.',
            phrase: 'The last frontier for real travelers.',
            stat: 'Largest province by area, least explored by tourists',
            link: '/travelers/', linkText: 'Explore the Travelers track'
        },
        london: {
            urdu: 'لندن', name: 'London & UK',
            hook: 'Over 1.5 million Urdu speakers. From Southall to Birmingham to Bradford, Urdu is the third most spoken language in Britain.',
            phrase: '"Beta, Urdu seekho" — every British Pakistani parent.',
            stat: '1.5M+ Urdu speakers in the UK',
            link: '/diaspora/', linkText: 'Explore the Diaspora track'
        },
        dubai: {
            urdu: 'دبئی', name: 'UAE',
            hook: 'Dubai, Abu Dhabi, Sharjah. Over 1.2 million Pakistanis live and work here. Urdu is the unofficial second language.',
            phrase: 'Business in English, trust in Urdu.',
            stat: '1.2M+ Pakistani residents in the UAE',
            link: '/professionals/', linkText: 'Explore the Professionals track'
        },
        toronto: {
            urdu: 'ٹورانٹو', name: 'Toronto & Canada',
            hook: 'One of the fastest-growing Pakistani diaspora communities. Urdu connects three generations across the Atlantic.',
            phrase: '"Ghar jaisa khana" — the eternal diaspora search.',
            stat: '500K+ Pakistani-Canadians',
            link: '/diaspora/', linkText: 'Explore the Diaspora track'
        },
        newyork: {
            urdu: 'نیویارک', name: 'New York & US',
            hook: 'Jackson Heights, Devon Avenue, Little Pakistan in Brooklyn. Urdu thrives in the world\'s biggest melting pot.',
            phrase: 'From cab driver to CEO, Urdu opens doors.',
            stat: '800K+ Pakistani-Americans',
            link: '/professionals/', linkText: 'Explore the Professionals track'
        },
        riyadh: {
            urdu: 'ریاض', name: 'Saudi Arabia',
            hook: 'Over 2 million Pakistanis. From Hajj pilgrims to professionals, Urdu is heard in every souk and every mosque.',
            phrase: 'Hajj in Urdu is a different experience.',
            stat: '2M+ Pakistanis in Saudi Arabia',
            link: '/muslims/', linkText: 'Explore the Muslims track'
        }
    };

    /* ----- CITIES ----- */
    var CITIES = [
        { name: 'Islamabad', lon: 73.04, lat: 33.69, region: 'ict', capital: true },
        { name: 'Lahore',    lon: 74.35, lat: 31.55, region: 'punjab' },
        { name: 'Karachi',   lon: 67.01, lat: 24.86, region: 'sindh' },
        { name: 'Peshawar',  lon: 71.58, lat: 34.01, region: 'kpk' },
        { name: 'Quetta',    lon: 67.00, lat: 30.18, region: 'balochistan' },
        { name: 'Gilgit',    lon: 74.31, lat: 35.92, region: 'gb' },
        { name: 'Multan',    lon: 71.47, lat: 30.20, region: 'punjab' },
        { name: 'Gwadar',    lon: 62.33, lat: 25.13, region: 'balochistan' }
    ];

    /* ----- DIASPORA (pixel positions in SVG) ----- */
    var DIASPORA = [
        { name: 'London',   x: 70,  y: 60,  region: 'london' },
        { name: 'Toronto',  x: 25,  y: 140, region: 'toronto' },
        { name: 'New York', x: 45,  y: 230, region: 'newyork' },
        { name: 'Dubai',    x: 880, y: 480, region: 'dubai' },
        { name: 'Riyadh',   x: 820, y: 540, region: 'riyadh' }
    ];

    /* ----- CREATE SVG ----- */
    var svg = d3.select('#pakistan-map')
        .append('svg')
        .attr('viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT)
        .style('width', '100%')
        .style('height', 'auto');

    /* ----- PROJECTION (will be fitted after data loads) ----- */
    var projection = d3.geoMercator();
    var pathGen = d3.geoPath().projection(projection);

    /* ----- INFO CARD ----- */
    var infoCard = document.getElementById('map-info');
    var activeProvince = null;

    function showInfo(key) {
        var data = REGIONS[key];
        if (!data || !infoCard) return;

        infoCard.querySelector('.map-info-urdu').textContent = data.urdu;
        infoCard.querySelector('.map-info-name').textContent = data.name;
        infoCard.querySelector('.map-info-hook').textContent = data.hook;
        infoCard.querySelector('.map-info-phrase').textContent = data.phrase;
        infoCard.querySelector('.map-info-stat').textContent = data.stat;
        var link = infoCard.querySelector('.map-info-link');
        link.href = data.link;
        link.textContent = data.linkText + ' \u2192';
        infoCard.classList.add('visible');

        /* highlight province */
        svg.selectAll('.province').classed('active', false);
        svg.selectAll('.province[data-region="' + key + '"]').classed('active', true);
        activeProvince = key;
    }

    function hideInfo() {
        if (infoCard) infoCard.classList.remove('visible');
        svg.selectAll('.province').classed('active', false);
        activeProvince = null;
    }

    if (infoCard) {
        infoCard.querySelector('.map-info-close').addEventListener('click', function(e) {
            e.stopPropagation();
            hideInfo();
        });
    }

    document.addEventListener('click', function(e) {
        if (infoCard && !infoCard.contains(e.target) && !e.target.closest('.province') && !e.target.closest('.city-marker') && !e.target.closest('.diaspora-marker')) {
            hideInfo();
        }
    });

    /* ----- LOAD GEOJSON & RENDER ----- */
    d3.json('pakistan.geojson').then(function(geojson) {

        /* Fit projection to Pakistan with padding */
        projection.fitExtent(
            [[120, 20], [WIDTH - 120, HEIGHT - 40]],
            geojson
        );

        /* Islamabad projected position (for diaspora lines) */
        var islamabadXY = projection([73.04, 33.69]);

        /* --- Diaspora connecting lines --- */
        var diasporaLines = svg.append('g').attr('class', 'diaspora-lines-group');
        DIASPORA.forEach(function(d) {
            var mx = (d.x + islamabadXY[0]) / 2;
            var my = Math.min(d.y, islamabadXY[1]) - 30;
            diasporaLines.append('path')
                .attr('class', 'diaspora-line')
                .attr('d', 'M' + d.x + ',' + d.y + ' Q' + mx + ',' + my + ' ' + islamabadXY[0] + ',' + islamabadXY[1]);
        });

        /* --- Province paths --- */
        var provinces = svg.append('g').attr('class', 'provinces-group');

        provinces.selectAll('.province')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('class', 'province')
            .attr('d', pathGen)
            .attr('data-region', function(d) {
                var name = d.properties.NAME_1 || d.properties.name || d.properties.NAME || '';
                return PROVINCE_MAP[name] || name.toLowerCase().replace(/\s+/g, '');
            })
            .on('click', function(event, d) {
                event.stopPropagation();
                var name = d.properties.NAME_1 || d.properties.name || d.properties.NAME || '';
                var key = PROVINCE_MAP[name] || name.toLowerCase().replace(/\s+/g, '');
                if (activeProvince === key) { hideInfo(); } else { showInfo(key); }
            });

        /* --- Province Urdu labels --- */
        geojson.features.forEach(function(feature) {
            var name = feature.properties.NAME_1 || feature.properties.name || '';
            var key = PROVINCE_MAP[name];
            if (!key || !PROVINCE_URDU[key]) return;
            var centroid = pathGen.centroid(feature);
            if (centroid[0] && centroid[1]) {
                var fontSize = (key === 'balochistan' || key === 'punjab') ? 18 :
                               (key === 'sindh') ? 15 : 12;
                provinces.append('text')
                    .attr('class', 'province-label')
                    .attr('x', centroid[0])
                    .attr('y', centroid[1])
                    .attr('text-anchor', 'middle')
                    .attr('font-size', fontSize)
                    .text(PROVINCE_URDU[key]);
            }
        });

        /* --- City markers --- */
        var citiesGroup = svg.append('g').attr('class', 'cities-group');

        CITIES.forEach(function(city) {
            var xy = projection([city.lon, city.lat]);
            if (!xy) return;
            var g = citiesGroup.append('g')
                .attr('class', 'city-marker')
                .attr('transform', 'translate(' + xy[0] + ',' + xy[1] + ')')
                .style('cursor', 'pointer')
                .on('click', function(event) {
                    event.stopPropagation();
                    showInfo(city.region);
                });

            g.append('circle').attr('class', 'city-pulse').attr('r', 4);
            g.append('circle')
                .attr('class', 'city-dot' + (city.capital ? ' capital' : ''))
                .attr('r', city.capital ? 5 : 3.5);

            var labelX = 10;
            var anchor = 'start';
            /* Put label left for western cities */
            if (city.name === 'Quetta' || city.name === 'Gwadar' || city.name === 'Peshawar') {
                labelX = -10;
                anchor = 'end';
            }
            g.append('text')
                .attr('class', 'city-label')
                .attr('x', labelX)
                .attr('y', 4)
                .attr('text-anchor', anchor)
                .text(city.name);
        });

        /* --- Diaspora markers --- */
        var diasporaGroup = svg.append('g').attr('class', 'diaspora-group');

        DIASPORA.forEach(function(d) {
            var g = diasporaGroup.append('g')
                .attr('class', 'diaspora-marker')
                .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
                .style('cursor', 'pointer')
                .on('click', function(event) {
                    event.stopPropagation();
                    showInfo(d.region);
                });

            g.append('circle').attr('class', 'diaspora-pulse').attr('r', 4);
            g.append('circle').attr('class', 'diaspora-dot').attr('r', 3.5);
            g.append('text')
                .attr('class', 'diaspora-label')
                .attr('x', 0)
                .attr('y', -12)
                .attr('text-anchor', 'middle')
                .text(d.name);
        });

        /* --- GSAP scroll animation --- */
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.from('#pakistan-map svg', {
                opacity: 0, y: 40, duration: 1,
                scrollTrigger: { trigger: '.map-section', start: 'top 75%', toggleActions: 'play none none none' }
            });
        }

    }).catch(function(err) {
        console.warn('Could not load pakistan.geojson:', err);
        mapContainer.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.3);padding:60px 0;">Map data not found. Place pakistan.geojson in the repo root.</p>';
    });

})();
