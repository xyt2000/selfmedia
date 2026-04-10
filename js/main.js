/**
 * 浪漫情侣网站 - JavaScript
 * 使用 GSAP 实现动画效果
 */

// ============================================
// 倒计时功能
// ============================================
function initCountdown(targetDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    function updateCountdown() {
        const now = new Date();
        const diff = now - targetDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // 带动画更新数字
        gsap.to(daysEl, {
            duration: 0.5,
            textContent: days,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(hoursEl, {
            duration: 0.5,
            textContent: hours,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(minutesEl, {
            duration: 0.5,
            textContent: minutes,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
        gsap.to(secondsEl, {
            duration: 0.5,
            textContent: seconds,
            snap: { textContent: 1 },
            ease: "power1.out"
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// 粒子背景
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 15 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -20px;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
    `;

    container.appendChild(particle);

    // 鼠标跟随效果
    particle.addEventListener('mouseenter', () => {
        gsap.to(particle, {
            scale: 1.5,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    });
}

// ============================================
// 主页动画
// ============================================
function initHomeAnimation() {
    const title = document.querySelector('.title');
    const countdown = document.querySelector('.countdown');
    const sinceText = document.querySelector('.since-text');
    const entryBtn = document.querySelector('.entry-btn');

    if (!title) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3
    })
    .to('.title-heart', {
        scale: 1.2,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
    }, '-=0.5')
    .to(countdown, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3')
    .to(sinceText, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to(entryBtn, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5');
}

// ============================================
// 时间轴动画
// ============================================
function initTimeline() {
    const header = document.querySelector('.timeline-header h1');
    const headerDesc = document.querySelector('.timeline-header p');
    const backBtn = document.querySelector('.back-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.8
    })
    .to(headerDesc, {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to(backBtn, {
        opacity: 1,
        x: 0,
        duration: 0.6
    }, '-=0.5');

    // 时间节点依次动画进入
    timelineItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.3 + index * 0.15,
            ease: 'power2.out'
        });
    });

    // 滚动视差效果
    if (window.innerWidth > 768) {
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.to(item, {
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }
}

// ============================================
// 模态框功能
// ============================================
function initModals() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const overlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    // 点击时间卡片打开模态框
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // 点击关闭按钮
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // 点击遮罩关闭
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 模态框内容动画
    const content = modal.querySelector('.modal-content');
    gsap.fromTo(content,
        { scale: 0.8, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // 图片淡入
    const img = modal.querySelector('.modal-image');
    gsap.fromTo(img,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2 }
    );
}

function closeModal(modal) {
    gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// 音乐控制（可选功能）
// ============================================
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    const audio = new Audio('https://example.com/love-song.mp3');
    audio.loop = true;
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = '🎵';
        } else {
            audio.play();
            musicBtn.textContent = '🎶';
        }
        isPlaying = !isPlaying;
    });
}

// ============================================
// 心形点击特效
// ============================================
function initHeartEffect() {
    document.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(heart);

        gsap.to(heart, {
            y: -100,
            opacity: 0,
            scale: 1.5,
            duration: 1,
            ease: 'power1.out',
            onComplete: () => heart.remove()
        });
    });
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 根据页面初始化不同功能
    if (document.querySelector('.home')) {
        initHomeAnimation();
        initHeartEffect();
    }
});