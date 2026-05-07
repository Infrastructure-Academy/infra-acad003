// Auto-highlight active nav link based on current URL
// Covers: Row 1 (primary nav) + Row 2 (secondary nav)
// Handles: direct page match, volume sub-pages, /play routes, archive→vault, charter hash
(function() {
    var path = window.location.pathname;
    var hash = window.location.hash;
    var page = path.split('/').pop() || 'site.html';

    // --- Row 1: Primary Navigation ---
    var nav1 = document.getElementById('nav-menu');
    if (nav1) {
        var links1 = nav1.querySelectorAll('a');
        links1.forEach(function(a) {
            a.classList.remove('active');
            var href = a.getAttribute('href') || '';
            var hrefPage = href.split('/').pop().split('#')[0].split('?')[0];
            if (page === hrefPage || (page === '' && hrefPage === 'site.html') ||
                (page === 'index.html' && href.indexOf(path.replace('/index.html','')) > -1) ||
                (path.indexOf('/volumes/volume1/') > -1 && href.indexOf('volume1/index') > -1) ||
                (path.indexOf('/volumes/volume2/') > -1 && href.indexOf('volume2/index') > -1) ||
                (path.indexOf('/volumes/volume3/') > -1 && href.indexOf('volume3/index') > -1) ||
                (path.indexOf('/play') === 0 && href === '/play')) {
                a.classList.add('active');
            }
        });
    }

    // --- Row 2: Secondary Navigation ---
    var nav2 = document.getElementById('nav-row2');
    if (nav2) {
        var links2 = nav2.querySelectorAll('a');
        links2.forEach(function(a) {
            a.classList.remove('active');
            var href = a.getAttribute('href') || '';
            var hrefPage = href.split('/').pop().split('#')[0].split('?')[0];
            if (page === hrefPage ||
                (href === 'site.html#charter' && page === 'site.html' && hash === '#charter') ||
                (path.indexOf('/play/founders') === 0 && href === '/play/founders') ||
                (path.indexOf('/archive') > -1 && hrefPage === 'vault.html')) {
                a.classList.add('active');
            }
        });
    }
})();
