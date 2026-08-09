/* ============================================
   urduacademy — CONFIG CENTRALISÉ
============================================= */

/* ============================================
   LAUNCH FLAG
   Tant que comingSoon = true, tous les boutons d'achat
   deviennent "Coming Soon" et ne mènent à aucun paiement.
   Le jour du lancement, passer comingSoon à false.
============================================= */
var SITE_LAUNCH = {
    comingSoon: true,
    comingSoonLabel: 'Coming Soon',
    /* Produits déjà en vente malgré le mode comingSoon.
       Chaque entrée est un morceau d'URL: tout bouton dont le
       href contient l'un de ces fragments reste actif.
       'diaspora' active le cours ET le bundle foundation-diaspora.
       Pour activer le tronc seul, ajouter: 'a1-to-b1'
       NB: liveProducts pilote AUSSI les badges de disponibilité
       des cartes de spécialisation (voir bloc en fin de fichier). */
    liveProducts: ['diaspora', 'a1-to-b1']
};

/* ============================================
   PRIX CENTRALISÉS
   Un seul endroit pour toute la grille.
   - list: le prix catalogue (le vrai prix, celui qui fait foi)
   - launch: le prix de lancement (barré affiché = list)
   - launchActive: true pendant la fenêtre de lancement de la spé
     (30 jours ou 15 ventes, puis repasser à false)
   Règle: le prix barré n'apparaît QUE si launchActive = true.
   Jamais de barré permanent.
============================================= */
var SITE_PRICING = {
    currency: '£',

    /* Le tronc commun: l'ancre du catalogue */
    foundation:     { list: 299, launch: null, launchActive: false },

    /* Les 8 spécialisations B2-C1: 249 au lieu de 299.
       launchActive = true affiche le barré (£299 barré, £249).
       Rappel: un barré doit rester une offre réelle et datée.
       À la fin de la fenêtre de chaque spé (30 jours ou 15 ventes
       après SA sortie), passer son launchActive à false: elle
       s'affiche alors à £299 plein tarif. */
    diaspora:       { list: 299, launch: 249, launchActive: true },
    couples:        { list: 299, launch: 249, launchActive: true },
    travelers:      { list: 299, launch: 249, launchActive: true },
    muslims:        { list: 299, launch: 249, launchActive: true },
    professionals:  { list: 299, launch: 249, launchActive: true },
    students:       { list: 299, launch: 249, launchActive: true },
    media:          { list: 299, launch: 249, launchActive: true },
    poetry:         { list: 299, launch: 249, launchActive: true },

    /* Companion course: passerelle courte, famille de prix à part */
    punjabi:        { list: 99, launch: null, launchActive: false },

    /* Bundles: l'économie vit ici, jamais dans des coupons.
       Fondation (299) + 1 spécialisation (299) = 598, bundle à 499:
       99 £ d'économie affichée. */
    foundation_bundle:  { list: 499, compareAt: 598, launch: null, launchActive: false },
    punjabi_bundle:     { list: 349, compareAt: 398, launch: null, launchActive: false }
};

var SITE_CONFIG = {
    courseUrl: 'https://class.learn-urdu.online/courses/urdu-a1-to-b1-complete-course/',
    urls: {
        home:           'https://learn-urdu.online',
        diaspora:       'https://learn-urdu.online/diaspora/',
        couples:        'https://learn-urdu.online/couples/',
        travelers:      'https://learn-urdu.online/travelers/',
        muslims:        'https://learn-urdu.online/muslims/',
        professionals:  'https://learn-urdu.online/professionals/',
        students:       'https://learn-urdu.online/students/',
        media:          'https://learn-urdu.online/media/',
        poetry:         'https://learn-urdu.online/poetry/',
        punjabi:        'https://learn-urdu.online/punjabi/',
        dashboard:      'https://class.learn-urdu.online/dashboard',
        terms:          'https://learn-urdu.online/terms/',
        privacy:        'https://learn-urdu.online/privacy/',
        refund:         'https://learn-urdu.online/refund/',
        tiktok:         'https://www.tiktok.com/@urduacademyofficial',
        email:          'mailto:contact@learn-urdu.online'
    },
    products: {
        foundation:         'https://class.learn-urdu.online/courses/urdu-a1-to-b1-complete-course/',
        punjabi:            'https://class.learn-urdu.online/courses/punjabi-after-urdu',
        punjabi_bundle:     'https://class.learn-urdu.online/course-bundle/urdu-foundation-punjabi',
        diaspora:           'https://class.learn-urdu.online/courses/urdu-diaspora-advanced',
        diaspora_bundle:    'https://class.learn-urdu.online/course-bundle/urdu-foundation-diaspora',
        couples:            'https://class.learn-urdu.online/courses/urdu-couples-advanced',
        couples_bundle:     'https://class.learn-urdu.online/course-bundle/urdu-foundation-couples',
        travelers:          'https://class.learn-urdu.online/courses/urdu-travelers-advanced',
        travelers_bundle:   'https://class.learn-urdu.online/course-bundle/urdu-foundation-travelers',
        muslims:            'https://class.learn-urdu.online/courses/urdu-muslims-advanced',
        muslims_bundle:     'https://class.learn-urdu.online/course-bundle/urdu-foundation-muslims',
        professionals:      'https://class.learn-urdu.online/courses/urdu-professionals-advanced',
        professionals_bundle: 'https://class.learn-urdu.online/course-bundle/urdu-foundation-professionals',
        students:           'https://class.learn-urdu.online/courses/urdu-students-advanced',
        students_bundle:    'https://class.learn-urdu.online/course-bundle/urdu-foundation-students',
        media:              'https://class.learn-urdu.online/courses/urdu-media-advanced',
        media_bundle:       'https://class.learn-urdu.online/course-bundle/urdu-foundation-media',
        poetry:             'https://class.learn-urdu.online/courses/urdu-poetry-advanced',
        poetry_bundle:      'https://class.learn-urdu.online/course-bundle/urdu-foundation-poetry',
        kids_trial:         'https://cal.com/urduacademy/kids-trial',
        kids_lesson:        'https://cal.com/urduacademy/kids-lesson',
        women_trial:        'https://cal.com/urduacademy/women-trial',
        women_lesson:       'https://cal.com/urduacademy/women-lesson'
    }
};

/* ============================================
   MOTEUR D'AFFICHAGE DES PRIX
   Dans les pages, plus aucun prix en dur. À la place:

   Prix simple (affiche 299 ou le prix de lancement selon le flag):
     <span data-price="diaspora"></span>

   Module complet avec barré (barré visible seulement si launchActive):
     <span data-price-block="diaspora"></span>
     rend: <s>£299</s> £249 · Launch offer
     ou simplement: £299 si pas de lancement actif

   Libellé personnalisable ci-dessous.
============================================= */
var SITE_PRICING_LABELS = {
    launchLabel: 'Launch offer',
    saveLabel: 'Save'
};

(function () {
    document.addEventListener('DOMContentLoaded', function () {

        function fmt(n) { return SITE_PRICING.currency + n; }

        /* Prix simple: le prix effectif du moment */
        document.querySelectorAll('[data-price]').forEach(function (el) {
            var key = el.getAttribute('data-price');
            var p = SITE_PRICING[key];
            if (!p) return;
            var effective = (p.launchActive && p.launch) ? p.launch : p.list;
            el.textContent = fmt(effective);
        });

        /* Prix barré seul, pour s'intégrer aux styles des pages
           (ex. le span.strike des cartes prix). Affiche le prix
           catalogue si un lancement est actif, le compareAt d'un
           bundle sinon, et se masque s'il n'y a rien à barrer.
           Usage: <span class="strike" data-price-strike="couples"></span> */
        document.querySelectorAll('[data-price-strike]').forEach(function (el) {
            var key = el.getAttribute('data-price-strike');
            var p = SITE_PRICING[key];
            if (!p) return;
            if (p.launchActive && p.launch) { el.textContent = fmt(p.list); }
            else if (p.compareAt) { el.textContent = fmt(p.compareAt); }
            else { el.style.display = 'none'; }
        });

        /* Montant de l'économie: £99 sur un bundle, £50 sur un
           lancement. Se masque s'il n'y a pas d'économie.
           Usage: save <span data-price-save="foundation_bundle"></span> */
        document.querySelectorAll('[data-price-save]').forEach(function (el) {
            var key = el.getAttribute('data-price-save');
            var p = SITE_PRICING[key];
            if (!p) return;
            if (p.launchActive && p.launch) { el.textContent = fmt(p.list - p.launch); }
            else if (p.compareAt) { el.textContent = fmt(p.compareAt - p.list); }
            else { el.style.display = 'none'; }
        });

        /* Libellé de lancement: visible seulement si launchActive.
           Usage: <div data-launch-label="couples"></div> */
        document.querySelectorAll('[data-launch-label]').forEach(function (el) {
            var key = el.getAttribute('data-launch-label');
            var p = SITE_PRICING[key];
            if (!p) return;
            if (p.launchActive && p.launch) { el.textContent = SITE_PRICING_LABELS.launchLabel; }
            else { el.style.display = 'none'; }
        });

        /* Rendu compact pour les pastilles et boutons:
           £299 barré puis £249 si lancement actif, sinon £299 seul.
           Usage: <span data-price-inline="diaspora"></span> */
        document.querySelectorAll('[data-price-inline]').forEach(function (el) {
            var key = el.getAttribute('data-price-inline');
            var p = SITE_PRICING[key];
            if (!p) return;
            if (p.launchActive && p.launch) {
                el.innerHTML = '<s style="opacity:.55;font-weight:400;">' + fmt(p.list) + '</s> ' + fmt(p.launch);
            } else if (p.compareAt) {
                el.innerHTML = '<s style="opacity:.55;font-weight:400;">' + fmt(p.compareAt) + '</s> ' + fmt(p.list);
            } else {
                el.textContent = fmt(p.list);
            }
        });

        /* Bloc prix avec barré conditionnel.
           Trois rendus possibles:
           - lancement actif: £299 barré, £249, libellé Launch offer
           - bundle avec compareAt: £598 barré, £499, libellé Save £99
           - sinon: prix simple en gras */
        document.querySelectorAll('[data-price-block]').forEach(function (el) {
            var key = el.getAttribute('data-price-block');
            var p = SITE_PRICING[key];
            if (!p) return;
            if (p.launchActive && p.launch) {
                el.innerHTML =
                    '<s style="opacity:.55;font-weight:400;margin-right:8px;">' + fmt(p.list) + '</s>' +
                    '<strong>' + fmt(p.launch) + '</strong>' +
                    '<span style="display:block;font-size:.72em;letter-spacing:.08em;text-transform:uppercase;color:#C9A24B;margin-top:2px;">' + SITE_PRICING_LABELS.launchLabel + '</span>';
            } else if (p.compareAt) {
                el.innerHTML =
                    '<s style="opacity:.55;font-weight:400;margin-right:8px;">' + fmt(p.compareAt) + '</s>' +
                    '<strong>' + fmt(p.list) + '</strong>' +
                    '<span style="display:block;font-size:.72em;letter-spacing:.08em;text-transform:uppercase;color:#C9A24B;margin-top:2px;">' + SITE_PRICING_LABELS.saveLabel + ' ' + fmt(p.compareAt - p.list) + '</span>';
            } else {
                el.innerHTML = '<strong>' + fmt(p.list) + '</strong>';
            }
        });
    });
})();

/* ============================================
   APPLICATION DU MODE COMING SOON
   Transforme automatiquement tous les boutons d'achat
   en boutons "Coming Soon" non cliquables.
   Fonctionne avec les boutons portant la classe .buy-btn
   ou un attribut data-product.
============================================= */
(function () {
    if (!SITE_LAUNCH.comingSoon) return;

    document.addEventListener('DOMContentLoaded', function () {
        // Cible tous les liens d'achat : ceux qui pointent vers un cours ou un bundle
        var selectors = [
            'a[href*="/courses/urdu-"]',
            'a[href*="/course-bundle/"]',
            'a.buy-btn',
            'a[data-product]'
        ];
        var buttons = document.querySelectorAll(selectors.join(','));

        buttons.forEach(function (btn) {
            // Les produits de la liste blanche restent achetables
            var href = btn.getAttribute('href') || '';
            var product = btn.getAttribute('data-product') || '';
            var isLive = (SITE_LAUNCH.liveProducts || []).some(function (frag) {
                return href.indexOf(frag) !== -1 || product.indexOf(frag) !== -1;
            });
            if (isLive) return;

            btn.textContent = SITE_LAUNCH.comingSoonLabel;
            btn.removeAttribute('href');
            btn.style.background = '#cfc9bb';
            btn.style.color = '#6b6675';
            btn.style.cursor = 'not-allowed';
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.85';
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.add('coming-soon-btn');
        });
    });
})();

/* ============================================
   BADGES DE DISPONIBILITÉ DES SPÉCIALISATIONS
   Source de vérité: SITE_LAUNCH.liveProducts.
   Quand une spé est terminée, ajouter son fragment
   à liveProducts: le bouton d'achat s'active ET
   le badge passe à "Available now". Une seule ligne,
   zéro risque d'incohérence entre badge et bouton.

   Usage dans les cartes:
     <span class="availability-badge" data-availability="couples"></span>

   Bonus: sur les cartes non disponibles, le CTA
   "View course & bundle" devient "Preview the curriculum"
   pour éviter la déception au clic.
============================================= */
var SITE_AVAILABILITY_LABELS = {
    live: 'Available now',
    soon: 'Coming soon',
    soonCta: 'Preview the curriculum \u2192'
};

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-availability]').forEach(function (el) {
            var key = el.getAttribute('data-availability');
            var isLive = (SITE_LAUNCH.liveProducts || []).some(function (frag) {
                return key.indexOf(frag) !== -1;
            });
            el.textContent = isLive
                ? SITE_AVAILABILITY_LABELS.live
                : SITE_AVAILABILITY_LABELS.soon;
            el.classList.add(isLive ? 'badge-live' : 'badge-soon');

            if (!isLive) {
                var card = el.closest('.audience-card');
                var cta = card ? card.querySelector('.spec-cta') : null;
                if (cta) cta.textContent = SITE_AVAILABILITY_LABELS.soonCta;
            }
        });
    });
})();
