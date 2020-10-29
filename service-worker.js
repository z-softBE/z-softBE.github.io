const CACHE_NAME = 'zsoft-V2';
const URLS_CACHE_ONLY = [
// Non changeable CSS
    'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700',
    '/assets/vendor/bootstrap/css/bootstrap.min.css',
    '/assets/vendor/animate.css/animate.min.css',
    '/assets/vendor/aos/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css',
    'https://fonts.googleapis.com/css?family=Lato:300,400,700,900',
    'https://fonts.googleapis.com/css?family=Raleway:400,300,700,900',
    'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.4.2/css/all.css',
    'https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.min.css',
    '/assets/css/offerte/themify-icons.css',
    '/assets/css/rangeslider.css',

    // Non changeable JS
    '/assets/vendor/jquery/jquery.min.js',
    '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/assets/vendor/jquery.easing/jquery.easing.min.js',
    '/assets/vendor/waypoints/jquery.waypoints.min.js',
    '/assets/vendor/aos/aos.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js',
    'https://code.jquery.com/jquery-3.3.1.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    'https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/locales/bootstrap-datepicker.nl.min.js',
    '/assets/js/rangeslider.js',
    '/assets/js/offerte/jquery.bootstrap.wizard.js',
    '/assets/js/offerte/jquery.validate.min.js',

    // Images
    '/assets/img/offerte-bg.jpg'
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS_CACHE_ONLY);
        }).catch((err) => {
            console.error(err);
            return new Promise((resolve, reject) => {
                reject('ERROR: ' + err);
            });
        })
    );
});

self.addEventListener("fetch", function (event) {
    const requestURL = new URL(event.request.url);

    if (URLS_CACHE_ONLY.includes(requestURL.href) || URLS_CACHE_ONLY.includes(requestURL.pathname)) {
        event.respondWith(getByCacheOnly(event.request));
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("feelio")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

const getByCacheOnly = (request) => {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
            return response;
        });
    });
};