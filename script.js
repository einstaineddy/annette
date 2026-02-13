/* ═══════════════════════════════════════════════════
   VIRTUAL VALENTINE — JAVASCRIPT
   Einstain Eddy for Asiyo Annette · February 2026
═══════════════════════════════════════════════════ */

// ── BOOT ─────────────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('pageLoader').classList.add('done');
        initAll();
    }, 900);
});

function initAll() {
    initCustomCursor();
    initNav();
    initMobileMenu();
    initScrollReveal();
    initHeroCanvas();
    initAffirmations();
    initHeartbeat();
    init3DBouquet();
    initLuxuryCard();
    initPoem();
    initCapsule();
    initMusicPlayer();
    initEasterEggs();
    initSpecialEffects();
    initSmoothScroll();
    initConsoleMessage();
}

// ── CUSTOM CURSOR ─────────────────────────────────────
function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
        requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,.luxury-card,.timeline-item,.capsule-btn,.wax-seal').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// ── NAVIGATION ───────────────────────────────────────
function initNav() {
    const nav = document.getElementById('luxuryNav');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        let cur = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ── MOBILE MENU ───────────────────────────────────────
function initMobileMenu() {
    const ham   = document.getElementById('hamburger');
    const menu  = document.getElementById('mobileMenu');
    const close = document.getElementById('mobileClose');
    const links = document.querySelectorAll('.mobile-link');
    if (!ham) return;

    const toggle = open => {
        menu.classList.toggle('open', open);
        ham.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    ham.addEventListener('click', () => toggle(!menu.classList.contains('open')));
    close.addEventListener('click', () => toggle(false));
    links.forEach(l => l.addEventListener('click', () => toggle(false)));
}

// ── SCROLL REVEAL ─────────────────────────────────────
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('[data-scroll-reveal]').forEach(el => obs.observe(el));
}

// ── HERO CANVAS (particle field) ──────────────────────
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 90;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.4 + .3,
            vx: (Math.random() - .5) * .3,
            vy: (Math.random() - .5) * .3,
            a: Math.random(),
            va: (Math.random() - .5) * .006,
        });
    }

    // Mouse parallax (desktop only)
    let mx = W / 2, my = H / 2;
    if (!isMobile) {
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    }

    let raf;
    (function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x  += p.vx + (mx / W - .5) * .08;
            p.y  += p.vy + (my / H - .5) * .08;
            p.a  += p.va;
            if (p.a <= 0 || p.a >= 1) p.va *= -1;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,175,55,${p.a * .55})`;
            ctx.fill();
        });
        // Subtle connecting lines
        particles.forEach((p, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(212,175,55,${(1 - d/100) * .08})`;
                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        });
        raf = requestAnimationFrame(draw);
    })();
}

// ── ROTATING AFFIRMATIONS ─────────────────────────────
function initAffirmations() {
    const el = document.getElementById('affirmItem');
    if (!el) return;
    const lines = [
        'I’ve been carrying this feeling for a while…',
        'and it’s reached a point where silence feels impossible',
        'I don’t even know how to say it perfectly…',
        'but I know it’s real.',
        'Somehow, without trying,',
        'you became someone my heart chose.',
        'I love you.',
        'Not loudly… not for attention…',
        'just deeply, honestly, and completely.',
        'This isn’t just a Valentine message…',
        'it’s me being brave enough to tell you',
        'what my heart has been whispering for so long.',
        'If love had a name, I LOVE YOU ANNETTE',
    ];
    let i = 0;
    setInterval(() => {
        el.classList.remove('active');
        setTimeout(() => {
            i = (i + 1) % lines.length;
            el.textContent = lines[i];
            el.classList.add('active');
        }, 600);
    }, 4500);
}

// ── HEARTBEAT COUNTER ─────────────────────────────────
// Counts seconds since Feb 14 2026 00:00:00 local
function initHeartbeat() {
    const el = document.getElementById('heartbeatNum');
    if (!el) return;
    const start = new Date('2026-02-14T00:00:00').getTime();
    const fmt = n => Math.max(0, n).toLocaleString('en-US');
    const tick = () => {
        const secs = Math.floor((Date.now() - start) / 1000);
        el.textContent = fmt(secs);
    };
    tick();
    setInterval(tick, 1000);
}

// ── 3D BOUQUET ────────────────────────────────────────
function init3DBouquet() {
    const bouquet = document.getElementById('bouquet3d');
    if (!bouquet) return;
    const colors = [
        'linear-gradient(135deg,#d4af37,#c9a961)',
        'linear-gradient(135deg,#e8c84a,#d4af37)',
        'linear-gradient(135deg,#c9a961,#b8961e)',
    ];
    const count = window.innerWidth < 768 ? 8 : 12;
    for (let i = 0; i < count; i++) {
        const r = window.innerWidth < 768 ? 130 : 190;
        const angle = (i / count) * Math.PI * 2;
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.transform = `translate3d(${Math.cos(angle)*r}px,${Math.sin(i*.5)*45}px,${Math.sin(angle)*r}px) rotateY(${angle}rad)`;
        for (let j = 0; j < 8; j++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.transform = `rotate(${(j/8)*360}deg) translateY(-22px)`;
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.animationDelay = `${i * .12}s`;
            flower.appendChild(petal);
        }
        bouquet.appendChild(flower);
    }
    // Pause on hover/touch
    const pause = () => bouquet.style.animationPlayState = 'paused';
    const play  = () => bouquet.style.animationPlayState = 'running';
    bouquet.addEventListener('mouseenter', pause);
    bouquet.addEventListener('mouseleave', play);
    bouquet.addEventListener('touchstart', pause, { passive: true });
    bouquet.addEventListener('touchend', play, { passive: true });
}

// ── LUXURY CARD ───────────────────────────────────────
function initLuxuryCard() {
    const card = document.getElementById('valentineCard');
    const instr = document.getElementById('cardInstruction');
    if (!card) return;

    let flipped = false;
    let lock = false;

    const flip = () => {
        if (lock) return;
        lock = true;
        setTimeout(() => { lock = false; }, 900);

        flipped = !flipped;
        card.classList.toggle('flipped', flipped);
        if (instr) instr.textContent = flipped ? 'Tap to close' : 'Tap to open';

        const back = card.querySelector('.card-back');
        if (flipped) {
            setTimeout(() => back && back.classList.add('shimmer'), 850);
        } else {
            back && back.classList.remove('shimmer');
        }
    };

    card.addEventListener('click', flip);
    // Touch flip
    let touchStartX, touchStartY;
    card.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    card.addEventListener('touchend', e => {
        const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
        if (dx < 10 && dy < 10) flip(); // only tap, not swipe
    }, { passive: true });
}

// ── ANIMATED POEM ─────────────────────────────────────
function initPoem() {
    const stage = document.getElementById('poemStage');
    const fill  = document.getElementById('poemFill');
    if (!stage) return;

    const lines = stage.querySelectorAll('.poem-line');
    const total = lines.length;
    let revealed = 0;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            // Stagger reveal each line
            lines.forEach((line, i) => {
                setTimeout(() => {
                    line.classList.add('visible');
                    // Light up current line
                    lines.forEach(l => l.classList.remove('lit'));
                    line.classList.add('lit');
                    revealed = i + 1;
                    if (fill) fill.style.width = (revealed / total * 100) + '%';
                    // After all lines shown, keep last lit
                    if (i === total - 1) {
                        setTimeout(() => lines.forEach(l => l.classList.add('lit')), 600);
                    }
                }, i * 380);
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    obs.observe(stage);
}

// ── MESSAGE CAPSULE ───────────────────────────────────
function initCapsule() {
    const KEY = 'vv_capsule_asiyo_2026';
    const stateSealed = document.getElementById('stateSealed');
    const stateWrite  = document.getElementById('stateWrite');
    const stateSaved  = document.getElementById('stateSaved');
    const openBtn     = document.getElementById('openCapsuleBtn');
    const sealBtn     = document.getElementById('sealCapsuleBtn');
    const editBtn     = document.getElementById('editCapsuleBtn');
    const textarea    = document.getElementById('capsuleText');
    const charCount   = document.getElementById('charCount');
    const savedText   = document.getElementById('capsuleSavedText');

    if (!stateSealed) return;

    const show = id => {
        [stateSealed, stateWrite, stateSaved].forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
    };

    // Load existing
    const saved = localStorage.getItem(KEY);
    if (saved) {
        savedText.textContent = saved;
        show('stateSaved');
    }

    openBtn && openBtn.addEventListener('click', () => show('stateWrite'));

    textarea && textarea.addEventListener('input', () => {
        if (charCount) charCount.textContent = textarea.value.length;
    });

    sealBtn && sealBtn.addEventListener('click', () => {
        const val = textarea.value.trim();
        if (!val) { showToast('Please write something first 🌹'); return; }
        localStorage.setItem(KEY, val);
        savedText.textContent = val;
        show('stateSaved');
        showToast('Sealed with care ✦');
        // Golden rain celebration
        triggerGoldenRain();
    });

    editBtn && editBtn.addEventListener('click', () => {
        textarea.value = localStorage.getItem(KEY) || '';
        if (charCount) charCount.textContent = textarea.value.length;
        show('stateWrite');
    });
}

// ── AMBIENT MUSIC (Web Audio API — no file needed) ────
function initMusicPlayer() {
    const btn  = document.getElementById('musicBtn');
    const icon = document.getElementById('musicIcon');
    if (!btn) return;

    let ctx, playing = false, nodes = [];

    const buildAudio = () => {
        ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Soft pad: layered sine waves tuned to a calm chord (A minor feel)
        const frequencies = [220, 277.18, 329.63, 440, 554.37];
        const master = ctx.createGain();
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
        master.connect(ctx.destination);

        frequencies.forEach((f, i) => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            const lfo  = ctx.createOscillator();
            const lfoG = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = f;

            lfo.type = 'sine';
            lfo.frequency.value = 0.07 + i * 0.02;
            lfoG.gain.value = f * 0.003;

            lfo.connect(lfoG);
            lfoG.connect(osc.frequency);

            gain.gain.value = 1 / frequencies.length;
            osc.connect(gain);
            gain.connect(master);

            lfo.start();
            osc.start();
            nodes.push(osc, lfo, gain, lfoG);
        });

        nodes.push(master);
        return master;
    };

    btn.addEventListener('click', () => {
        if (!playing) {
            if (!ctx) buildAudio();
            else {
                // Resume existing
                ctx.resume();
                const master = nodes[nodes.length - 1];
                master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
                master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1);
            }
            playing = true;
            btn.classList.add('playing');
            icon.textContent = '♫';
            showToast('Ambient music on — enjoy ♪');
        } else {
            // Fade out
            if (ctx) {
                const master = nodes[nodes.length - 1];
                master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
                master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
                setTimeout(() => ctx.suspend(), 1300);
            }
            playing = false;
            btn.classList.remove('playing');
            icon.textContent = '♪';
        }
    });
}

// ── EASTER EGGS ───────────────────────────────────────
function initEasterEggs() {
    initKonami();
    initSecretWord();
    initTripleClick();
    initLongPress();
}

function initKonami() {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    document.addEventListener('keydown', e => {
        idx = (e.key === code[idx] || e.key.toLowerCase() === code[idx].toLowerCase()) ? idx + 1 : 0;
        if (idx === code.length) { showEasterModal(); idx = 0; }
    });
}

function initSecretWord() {
    let typed = '';
    document.addEventListener('keypress', e => {
        typed = (typed + e.key.toLowerCase()).slice(-5);
        if (typed === 'asiyo') { showToast('✨ Your name unlocks beauty wherever it appears.'); typed = ''; }
    });
}

function initTripleClick() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    let count = 0, timer;
    title.addEventListener('click', () => {
        count++;
        clearTimeout(timer);
        if (count === 3) { triggerGoldenRain(); count = 0; return; }
        timer = setTimeout(() => { count = 0; }, 500);
    });
}

function initLongPress() {
    const sig = document.querySelector('.signature');
    if (!sig) return;
    let t;
    const start = () => { t = setTimeout(() => showToast('🌹 Every signature carries intention. This one carries hope.'), 2000); };
    const cancel = () => clearTimeout(t);
    sig.addEventListener('mousedown', start);
    sig.addEventListener('mouseup', cancel);
    sig.addEventListener('mouseleave', cancel);
    sig.addEventListener('touchstart', e => { e.preventDefault(); start(); }, { passive: false });
    sig.addEventListener('touchend', cancel);
    sig.addEventListener('touchcancel', cancel);
}

function showEasterModal() {
    const modal = document.getElementById('easterModal');
    if (!modal) return;
    modal.classList.add('active');
    triggerGoldenRain();
    document.getElementById('easterClose').onclick = () => modal.classList.remove('active');
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
}

// ── GOLDEN RAIN ───────────────────────────────────────
function triggerGoldenRain() {
    const count = window.innerWidth < 768 ? 28 : 55;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            const size = 6 + Math.random() * 8;
            p.style.cssText = `
                position:fixed; top:-20px; left:${Math.random()*100}%;
                width:${size}px; height:${size}px;
                background:linear-gradient(135deg,#d4af37,#e8c84a);
                border-radius:${Math.random() > .5 ? '50%' : '0'};
                pointer-events:none; z-index:9500;
                opacity:${.6 + Math.random()*.4};
                animation:goldenFall ${2 + Math.random()*2.5}s linear forwards;
            `;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 5000);
        }, i * 80);
    }
}

// ── TOAST ─────────────────────────────────────────────
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3800);
}

// ── SPECIAL EFFECTS ───────────────────────────────────
function initSpecialEffects() {
    // Parallax on hero background (only desktop)
    if (window.innerWidth >= 768) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const hero = document.querySelector('.hero-overlay');
                    if (hero) hero.style.transform = `translateY(${window.scrollY * .3}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 3D tilt on floating quote frame (desktop)
    const frame = document.getElementById('floatingFrame');
    if (frame && window.innerWidth >= 1024) {
        document.addEventListener('mousemove', e => {
            const rx = ((e.clientY / window.innerHeight) - .5) * 10;
            const ry = ((e.clientX / window.innerWidth)  - .5) * 10;
            frame.style.transform = `perspective(900px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
        }, { passive: true });
    }

    // Timeline hover glow
    document.querySelectorAll('.timeline-item').forEach(item => {
        const content = item.querySelector('.timeline-content');
        item.addEventListener('mouseenter', () => { if (content) content.style.boxShadow = '0 0 28px rgba(212,175,55,.2)'; });
        item.addEventListener('mouseleave', () => { if (content) content.style.boxShadow = 'none'; });
    });

    // Hero subtitle typewriter
    const sub = document.getElementById('heroSubtitle');
    if (sub) {
        const txt = sub.textContent.trim();
        sub.textContent = '';
        let i = 0;
        const type = setInterval(() => {
            sub.textContent += txt[i++];
            if (i >= txt.length) clearInterval(type);
        }, 80);
    }
}

// ── SMOOTH SCROLL ─────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
}

// ── DYNAMIC STYLES (golden rain, etc.) ───────────────
;(function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
        @keyframes goldenFall {
            0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(${360 + Math.random()*360}deg); opacity: 0; }
        }
        @keyframes fadeOut { from{opacity:1} to{opacity:0} }
    `;
    document.head.appendChild(s);
})();

// ── CONSOLE MESSAGE ───────────────────────────────────
function initConsoleMessage() {
    console.log('%c✨ Virtual Valentine ✨', 'font-size:22px;font-weight:bold;color:#d4af37;');
    console.log('%cMade with ♡ by Einstain Eddy for Asiyo Annette', 'font-size:13px;color:#c0c0c0;');
    console.log('%cFebruary 2026', 'font-size:11px;color:#d4af37;font-style:italic;');
    console.log('%c\nTry: ↑↑↓↓←→←→BA for a surprise 🌹', 'font-size:11px;color:#e8c84a;');
}

console.log('%c❤ All systems loaded.', 'font-size:12px;color:#d4af37;');
