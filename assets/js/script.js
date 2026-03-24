/* ================================================================
   script.js — Desenrola AI — Enhanced Animations
   ================================================================ */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     ANIMAÇÃO DE ACENDER A LUZ
  ═══════════════════════════════════════════════════════════ */
  (function initLightOn() {
    const lightOverlay = document.getElementById('light-on-overlay');
    if (lightOverlay) {
      setTimeout(() => {
        lightOverlay.style.display = 'none';
      }, 3500); // Aumentado para 3.5s para coincidir com a animação
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     TELA DE ABERTURA (Opening Screen)
  ═══════════════════════════════════════════════════════════ */
  (function initOpeningScreen() {
    const openingScreen = document.getElementById('opening-screen');
    const cartaScreen = document.getElementById('carta-screen');
    const mainContent = document.getElementById('main-content');
    const seloIntro = document.getElementById('selo-intro');
    const textFirst = document.querySelector('.opening-screen__text--first');
    const textSecond = document.querySelector('.opening-screen__text--second');
    const textThird = document.querySelector('.opening-screen__text--third');
    const skipIntro = document.getElementById('skip-intro');
    const skipIntroCarta = document.getElementById('skip-intro-carta');
    
    if (!openingScreen || !cartaScreen || !mainContent) return;

    let currentStep = 0;
    let timeoutId;
    let isAutoPlaying = true;
    let skipIntroActivated = false; // Flag para indicar que pulou a intro

    // Função para pular direto para a hero
    function skipToHero() {
      skipIntroActivated = true; // Marcar que pulou a intro
      
      // Limpar todos os timeouts
      if (timeoutId) clearTimeout(timeoutId);
      
      // Esconder todas as telas de introdução
      openingScreen.style.display = 'none';
      cartaScreen.style.display = 'none';
      
      // Mostrar conteúdo principal
      mainContent.style.display = 'block';
      mainContent.classList.add('visible');
      mainContent.style.position = 'static';
      mainContent.style.top = 'auto';
      mainContent.style.height = 'auto';
      mainContent.style.zIndex = 'auto';
      mainContent.style.transform = 'none';
      mainContent.style.opacity = '1';
      mainContent.style.overflow = '';
      
      // Restaurar scroll da página
      document.body.style.overflow = '';
      
      // Scroll suave para a hero
      setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 100);
    }

    // Evento de clique no botão skip (tela de abertura)
    if (skipIntro) {
      skipIntro.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o clique na tela avance os textos
        skipToHero();
      });
    }

    // Evento de clique no botão skip (tela da carta)
    if (skipIntroCarta) {
      skipIntroCarta.addEventListener('click', (e) => {
        e.stopPropagation();
        skipToHero();
      });
    }

    // Função para mostrar a carta
    function showLetter() {
      // Se a intro foi pulada, não mostrar a carta
      if (skipIntroActivated) return;
      
      openingScreen.classList.add('fade-out');
      
      setTimeout(() => {
        openingScreen.style.display = 'none';
        cartaScreen.style.display = 'flex';
        
        setTimeout(() => {
          cartaScreen.classList.add('visible');
        }, 50);
      }, 500);
    }

    // Função para avançar para o próximo texto
    function nextStep() {
      if (timeoutId) clearTimeout(timeoutId);
      isAutoPlaying = false;
      
      currentStep++;
      
      if (currentStep === 1) {
        // Esconde primeiro, mostra segundo
        textFirst.style.display = 'none';
        textSecond.classList.add('active');
        
        timeoutId = setTimeout(() => {
          nextStep();
        }, 5000);
        
      } else if (currentStep === 2) {
        // Fade out segundo, mostra terceiro
        textSecond.classList.add('fade-out');
        
        setTimeout(() => {
          textSecond.style.display = 'none';
          textThird.classList.add('active');
          
          timeoutId = setTimeout(() => {
            showLetter();
          }, 5000);
        }, 800);
        
      } else if (currentStep >= 3) {
        showLetter();
      }
    }

    // Clique na tela de abertura avança para o próximo texto
    openingScreen.addEventListener('click', () => {
      if (isAutoPlaying) {
        isAutoPlaying = false;
      }
      nextStep();
    });

    // Timeline automática
    setTimeout(() => {
      if (currentStep === 0 && isAutoPlaying) {
        textFirst.style.display = 'none';
        textSecond.classList.add('active');
        currentStep = 1;
        
        // Após 5s, fade out do segundo e mostra terceiro
        setTimeout(() => {
          if (currentStep === 1 && isAutoPlaying) {
            textSecond.classList.add('fade-out');
            
            setTimeout(() => {
              textSecond.style.display = 'none';
              textThird.classList.add('active');
              currentStep = 2;
              
              // Após 5s, mostra carta
              setTimeout(() => {
                if (currentStep === 2 && isAutoPlaying) {
                  showLetter();
                }
              }, 5000);
            }, 800);
          }
        }, 5000);
      }
    }, 5500);

    // Quando clicar no selo, mostra o site completo
    if (seloIntro) {
      const cartaRevealIntro = document.getElementById('carta-reveal-intro');
      const clickHint = document.getElementById('click-hint');
      let envelopeOpened = false;
      let scrollEnabled = false;
      
      // Mostrar hint após 3.5 segundos
      setTimeout(() => {
        if (clickHint && cartaScreen.classList.contains('visible')) {
          clickHint.classList.add('visible');
        }
      }, 3500);
      
      console.log('Selo encontrado, adicionando evento de clique');
      seloIntro.addEventListener('click', (e) => {
        console.log('Selo clicado!');
        e.preventDefault();
        e.stopPropagation();
        
        // Se a intro foi pulada, não fazer nada
        if (skipIntroActivated) return;
        
        if (envelopeOpened) return;
        envelopeOpened = true;
        
        // Esconder mensagem de pular introdução
        if (skipIntroCarta) {
          skipIntroCarta.style.display = 'none';
        }
        
        // Esconder hint
        if (clickHint) {
          clickHint.style.opacity = '0';
        }
        
        // Parar animação de flutuação da carta
        if (cartaRevealIntro) {
          cartaRevealIntro.style.animation = 'none';
        }
        
        // Abrir envelope
        if (cartaRevealIntro) {
          cartaRevealIntro.classList.add('is-open');
        }
        
        // Após a animação de abertura, habilitar scroll
        setTimeout(() => {
          scrollEnabled = true;
          
          // Mostrar o conteúdo principal (mas ainda invisível)
          mainContent.style.display = 'block';
          mainContent.style.opacity = '1';
          mainContent.style.position = 'fixed';
          mainContent.style.top = '100vh';
          mainContent.style.left = '0';
          mainContent.style.right = '0';
          mainContent.style.bottom = 'auto';
          mainContent.style.height = '100vh';
          mainContent.style.zIndex = '9999';
          mainContent.style.overflow = 'hidden';
          
          // Remover transições para controle manual
          cartaScreen.style.transition = 'none';
          mainContent.style.transition = 'none';
          
          // Adicionar indicador de scroll
          const scrollHint = document.createElement('p');
          scrollHint.className = 'scroll-hint-carta';
          scrollHint.innerHTML = '<span class="hint-desktop">Role para continuar</span><span class="hint-mobile">Deslize para continuar</span>';
          cartaScreen.appendChild(scrollHint);
          
          setTimeout(() => {
            scrollHint.classList.add('visible');
          }, 500);
          
          // Listener de scroll
          let scrollProgress = 0;
          let isTransitioning = false;
          let animationFrame = null;
          
          const updateTransition = () => {
            if (animationFrame) {
              cancelAnimationFrame(animationFrame);
            }
            
            animationFrame = requestAnimationFrame(() => {
              // Limitar scrollProgress para os cálculos visuais
              const visualProgress = Math.min(scrollProgress, 1);
              
              // Carta apenas faz fade out (sem movimento)
              const cartaOpacity = 1 - visualProgress;
              cartaScreen.style.transform = 'none';
              cartaScreen.style.opacity = String(Math.max(0, cartaOpacity));
              
              // Hero sobe suavemente
              const heroTranslateY = 100 - visualProgress * 100; // De 100vh para 0vh
              const heroOpacity = visualProgress; // Fade in linear
              mainContent.style.transform = `translateY(${heroTranslateY}vh)`;
              mainContent.style.opacity = String(heroOpacity);
              
              // Esconder hint quando começar a rolar
              if (scrollProgress > 0.1 && scrollHint) {
                scrollHint.style.opacity = '0';
              } else if (scrollProgress <= 0.1 && scrollHint) {
                scrollHint.style.opacity = '';
              }
              
              // Quando completar o scroll (só finaliza se rolar além de 1.0)
              if (scrollProgress >= 1.0 && !isTransitioning) {
                isTransitioning = true;
                scrollEnabled = false;
                
                // Remover listeners
                window.removeEventListener('wheel', handleScroll);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchstart', handleTouchStart);
                document.body.style.overflow = '';
                
                // Finalizar transição
                cartaScreen.style.display = 'none';
                mainContent.style.position = 'static';
                mainContent.style.top = 'auto';
                mainContent.style.height = 'auto';
                mainContent.style.zIndex = 'auto';
                mainContent.style.transform = 'none';
                mainContent.style.opacity = '1';
                mainContent.style.overflow = '';
                
                // Reativar animações da hero
                const heroContent = document.querySelector('.hero__content');
                if (heroContent) {
                  // Remover animações existentes
                  heroContent.style.animation = 'none';
                  
                  // Forçar reflow
                  void heroContent.offsetWidth;
                  
                  // Reativar animações
                  heroContent.style.animation = '';
                  
                  // Adicionar classe para trigger de animações
                  setTimeout(() => {
                    heroContent.classList.add('animate-in');
                  }, 50);
                }
                
                // Scroll até o topo
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }, 50);
              }
            });
          };
          
          const handleScroll = (e) => {
            if (!scrollEnabled) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            // Detectar direção do scroll
            const delta = e.deltaY || e.detail || -e.wheelDelta;
            
            // Ajustar sensibilidade
            const sensitivity = 0.004;
            
            if (delta > 0) {
              // Scroll para baixo
              scrollProgress = Math.min(scrollProgress + sensitivity * Math.abs(delta), 1.2);
            } else {
              // Scroll para cima
              scrollProgress = Math.max(scrollProgress - sensitivity * Math.abs(delta), 0);
            }
            
            console.log('Scroll Progress:', scrollProgress); // Debug
            updateTransition();
          };
          
          // Touch support para mobile
          let touchStartY = 0;
          let lastTouchY = 0;
          
          const handleTouchStart = (e) => {
            if (!scrollEnabled) return;
            touchStartY = e.touches[0].clientY;
            lastTouchY = touchStartY;
          };
          
          const handleTouchMove = (e) => {
            if (!scrollEnabled) return;
            
            const touchY = e.touches[0].clientY;
            const delta = lastTouchY - touchY;
            
            e.preventDefault();
            e.stopPropagation();
            
            // Ajustar sensibilidade para touch
            const sensitivity = 0.0015;
            
            if (delta > 0) {
              scrollProgress = Math.min(scrollProgress + sensitivity * Math.abs(delta), 1.2);
            } else {
              scrollProgress = Math.max(scrollProgress - sensitivity * Math.abs(delta), 0);
            }
            
            updateTransition();
            lastTouchY = touchY;
          };
          
          // Bloquear scroll da página
          document.body.style.overflow = 'hidden';
          
          window.addEventListener('wheel', handleScroll, { passive: false });
          window.addEventListener('touchstart', handleTouchStart, { passive: false });
          window.addEventListener('touchmove', handleTouchMove, { passive: false });
          
        }, 3000);
      });
    } else {
      console.log('Selo não encontrado!');
    }
  })();

  /* ─── 1. Ambient canvas (aurora background) ─────────────── */
  (function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.15, y: 0.2,  r: 0.35, color: 'rgba(201,168,76,',  speed: 0.0004 },
      { x: 0.85, y: 0.7,  r: 0.3,  color: 'rgba(194,123,140,', speed: 0.0003 },
      { x: 0.5,  y: 0.95, r: 0.25, color: 'rgba(201,168,76,',  speed: 0.0005 },
    ];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 1;
      orbs.forEach((orb, i) => {
        const px = (orb.x + Math.sin(t * orb.speed + i) * 0.08) * w;
        const py = (orb.y + Math.cos(t * orb.speed + i * 0.8) * 0.08) * h;
        const rad = orb.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
        grad.addColorStop(0, orb.color + '0.06)');
        grad.addColorStop(1, orb.color + '0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ─── 2. Rose petals ────────────────────────────────────── */
  (function initPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const PETAL_SVGs = [
      // Narrow ellipse petal
      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20"><ellipse cx="7" cy="10" rx="5" ry="9" fill="rgba(194,123,140,VAR_OPACITY)" transform="rotate(VAR_ROT 7 10)"/></svg>`,
      // Rounded leaf petal
      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18"><path d="M7 0 C12 5 12 13 7 18 C2 13 2 5 7 0Z" fill="rgba(201,168,76,VAR_OPACITY)"/></svg>`,
      // Heart-shaped
      `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 10 C1 7 0 2 3 1 C4.5 0.5 6 2 6 2 C6 2 7.5 0.5 9 1 C12 2 11 7 6 10Z" fill="rgba(194,123,140,VAR_OPACITY)"/></svg>`,
    ];

    function createPetal() {
      const wrapper = document.createElement('div');
      wrapper.classList.add('petal');

      const type    = PETAL_SVGs[Math.floor(Math.random() * PETAL_SVGs.length)];
      const opacity = (Math.random() * 0.35 + 0.15).toFixed(2);
      const rot     = Math.floor(Math.random() * 360);
      const svg     = type.replace('VAR_OPACITY', opacity).replace('VAR_ROT', rot);

      wrapper.innerHTML = svg;

      const size     = Math.random() * 0.8 + 0.6;
      const left     = Math.random() * 105 - 2.5;
      const duration = Math.random() * 18 + 14;
      const delay    = Math.random() * 20;
      const drift    = (Math.random() - 0.5) * 120;

      wrapper.style.cssText = `
        left: ${left}%;
        transform: scale(${size});
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        --drift: ${drift}px;
      `;
      container.appendChild(wrapper);
    }

    // Add inline drift keyframe
    const style = document.createElement('style');
    style.textContent = `
      .petal { animation-name: petalFall; }
      @keyframes petalFall {
        0%   { transform: translateY(-60px) translateX(0) rotate(0deg) scale(var(--s,1)); opacity:0; }
        5%   { opacity:1; }
        50%  { transform: translateY(50vh) translateX(var(--drift)) rotate(180deg) scale(var(--s,1)); }
        90%  { opacity:0.6; }
        100% { transform: translateY(110vh) translateX(calc(var(--drift)*1.3)) rotate(400deg) scale(var(--s,1)); opacity:0; }
      }
    `;
    document.head.appendChild(style);

    const COUNT = window.innerWidth > 768 ? 28 : 14;
    for (let i = 0; i < COUNT; i++) createPetal();
  })();

  /* ─── 3. Gold dust particles ─────────────────────────────── */
  (function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 3.5 + 1;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        animation-duration:${Math.random()*14+14}s;
        animation-delay:-${Math.random()*18}s;
        opacity:${Math.random()*0.5+0.1};
      `;
      container.appendChild(p);
    }
  })();

  /* ─── 4. Scroll Reveal ───────────────────────────────────── */
  (function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  })();

  /* ─── 5. WhatsApp mask ───────────────────────────────────── */
  (function initPhoneMask() {
    const input = document.getElementById('whatsapp');
    if (!input) return;
    input.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      let f = '';
      if (v.length > 0) f = '(' + v.slice(0, 2);
      if (v.length > 2) f += ') ' + v.slice(2, 7);
      if (v.length > 7) f += '-' + v.slice(7, 11);
      this.value = f;
    });
  })();

  /* ─── 6. Form validation & submit ───────────────────────── */
  (function initForm() {
    const form      = document.getElementById('waitlist-form');
    const success   = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');
    if (!form) return;

    const setError = (el, err) => err ? el.classList.add('error') : el.classList.remove('error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const n = document.getElementById('name');
      const w = document.getElementById('whatsapp');
      const m = document.getElementById('email');
      let ok = true;

      if (!n.value.trim() || n.value.trim().length < 2) { setError(n, true); ok = false; } else setError(n, false);
      if (w.value.replace(/\D/g,'').length < 10)          { setError(w, true); ok = false; } else setError(w, false);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value))    { setError(m, true); ok = false; } else setError(m, false);

      if (!ok) return;

      submitBtn.classList.add('btn--loading');
      submitBtn.disabled = true;
      await new Promise(r => setTimeout(r, 1800));

      form.style.display = 'none';
      success.classList.add('visible');
      success.setAttribute('aria-hidden', 'false');
    });

    ['name','whatsapp','email'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => setError(el, false));
    });
  })();

  /* ─── 7. Parallax hero ───────────────────────────────────── */
  (function initParallax() {
    const hero = document.querySelector('.hero__content');
    const florals = document.querySelectorAll('.hero__floral');
    if (!hero || window.innerWidth < 768) return;

    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      const max = window.innerHeight;
      if (s > max) return;
      const r = s / max;
      hero.style.transform = `translateY(${r * 70}px)`;
      hero.style.opacity   = `${Math.max(0, 1 - r * 1.3)}`;
      florals.forEach((f, i) => {
        f.style.transform = `translateY(calc(-50% + ${r * (i === 0 ? 40 : -40)}px))`;
        f.style.opacity   = `${Math.max(0, 0.18 - r * 0.18)}`;
      });
    }, { passive: true });
  })();

  /* ─── 8. 3D card tilt ────────────────────────────────────── */
  (function initCardTilt() {
    if (window.innerWidth < 768) return;
    document.querySelectorAll('.pillar-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-8px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.4s';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease, box-shadow 0.5s ease, border-color 0.4s';
      });
    });
  })();

  /* ─── 9. Smooth scroll ───────────────────────────────────── */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
      });
    });
  })();

  /* ─── 10. Typewriter effect on hero ─────────────────────── */
  (function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 70);
  })();
  /* ─── 11. Envelope Click Animation ─────────────────────── */
  (function initEnvelopeClick() {
    const btn = document.getElementById('btn-open-carta');
    const container = document.querySelector('.carta-reveal-container');
    const actionWrapper = document.querySelector('.carta-action-wrapper');
    if (btn && container) {
      btn.addEventListener('click', () => {
        container.classList.add('is-open');
        if (actionWrapper) {
          actionWrapper.style.opacity = '0';
          actionWrapper.style.pointerEvents = 'none';
        }
      });
    }
  })();

})();