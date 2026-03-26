/**
 * Component loader — carrega os arquivos HTML de components/
 * e injeta nos slots do DOM antes de inicializar o script principal.
 */
(function () {
  var BASE = window.location.href.replace(/\/[^/]*$/, '/');

  var COMPONENTS = [
    { id: 'slot-opening',      src: 'components/opening-screen.html' },
    { id: 'slot-carta',        src: 'components/carta-screen.html' },
    { id: 'slot-hero',         src: 'components/hero.html' },
    { id: 'slot-sobre',        src: 'components/sobre.html' },
    { id: 'slot-tecnicas',     src: 'components/tecnicas.html' },
    { id: 'slot-autoridade',   src: 'components/autoridade.html' },
    { id: 'slot-idealizadora', src: 'components/idealizadora.html' },
    { id: 'slot-diamantes',    src: 'components/diamantes.html' },
    { id: 'slot-urgencia',     src: 'components/urgencia.html' },
    { id: 'slot-waitlist',     src: 'components/waitlist.html' },
    { id: 'slot-footer',       src: 'components/footer.html' },
  ];

  function loadComponent(id, src) {
    return fetch(BASE + src)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + src + ' (' + res.status + ')');
        return res.text();
      })
      .then(function (html) {
        var el = document.getElementById(id);
        if (el) {
          el.innerHTML = html;
          console.log('[components.js] Injected:', id);
        } else {
          console.warn('[components.js] Slot not found:', id);
        }
      })
      .catch(function (err) {
        console.error('[components.js] Error loading ' + src + ':', err);
      });
  }

  function forceReveal() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.classList.add('revealed');
    });
  }

  Promise.all(COMPONENTS.map(function (c) {
    return loadComponent(c.id, c.src);
  })).then(function () {
    // Dois rAF garantem que o browser pintou o innerHTML antes de rodar o script
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {

        var s = document.createElement('script');
        s.src = 'assets/js/script.js?' + Date.now(); // cache bust
        document.body.appendChild(s);

        forceReveal();
        setTimeout(forceReveal, 500);
        setTimeout(forceReveal, 1500);

      });
    });
  });

})();
