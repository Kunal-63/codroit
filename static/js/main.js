document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup for particle cursor effect
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);

    // Style canvas to stay behind everything, covering the screen
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    window.addEventListener('resize', resize);
    resize();

    // Track mouse / target mouse for smooth interpolation
    let mouse = { x: width / 2, y: height / 2, moving: false };
    let targetMouse = { x: width / 2, y: height / 2 };

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX;
        targetMouse.y = e.clientY;
        mouse.moving = true;
    }, { passive: true });

    const particles = [];
    const colors = ['#034CAE']; // Single vibrant blue color

    class Particle {
        constructor() {
            this.reset();
            // Stagger initially
            this.life = Math.random() * this.maxLife;
        }

        reset() {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 120 + 150;
            this.x = mouse.x + Math.cos(angle) * radius;
            this.y = mouse.y + Math.sin(angle) * radius;

            this.baseAngle = angle;
            // Move out a little fast
            this.speed = Math.random() * 0.6 + 0.8;
            this.length = Math.random() * 6 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0;
            this.maxAlpha = Math.random() * 0.5 + 0.1;
            this.life = 0;
            this.maxLife = Math.random() * 150 + 100;
            this.angleOffset = (Math.random() - 0.5) * 0.05;
        }

        update() {
            this.x += Math.cos(this.baseAngle + this.angleOffset) * this.speed;
            this.y += Math.sin(this.baseAngle + this.angleOffset) * this.speed;

            // Subtle swirl so it feels like a flowing field
            this.baseAngle += 0.002;

            this.life++;

            // Ultra-smooth fade in and out to eliminate "respawning" pops
            const fadeFrames = this.maxLife * 0.4;
            if (this.life < fadeFrames) {
                this.alpha = (this.life / fadeFrames) * this.maxAlpha;
            } else if (this.life > this.maxLife - fadeFrames) {
                this.alpha = ((this.maxLife - this.life) / fadeFrames) * this.maxAlpha;
            } else {
                this.alpha = this.maxAlpha;
            }

            if (this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.baseAngle + this.angleOffset);
            ctx.moveTo(0, 0);
            ctx.lineTo(this.length, 0);
            ctx.restore();

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2.5;
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize array of particles
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Smoothly but quickly move the emission center to the real mouse coordinates
        mouse.x += (targetMouse.x - mouse.x) * 0.25;
        mouse.y += (targetMouse.y - mouse.y) * 0.25;

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Typing effect logic
    const phrases = [
        "We Don't Just Code, We Build Brands."
    ];
    let currentPhrase = 0;
    let isDeleting = false;
    let textIndex = 0;

    const typingElement = document.getElementById('hero-typing');
    const heroTitle = document.querySelector('.hero-title');

    if (typingElement && heroTitle) {
        function typeEffect() {
            const currentString = phrases[currentPhrase];

            typingElement.innerHTML = currentString.substring(0, textIndex + 1);
            textIndex++;

            if (textIndex === currentString.length) {
                // Done typing. Stop entirely.
                heroTitle.classList.add('typing-done');
                return;
            }

            let typeSpeed = 60;
            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 500);
    }

    // Scroll reveal logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up-scroll').forEach(el => observer.observe(el));

    // Navbar scroll-shrink effect
    const navbar = document.querySelector('.premium-nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Sleeping Video Cursor Logic
    const videoContainer = document.getElementById('videoContainer');
    const customCursor = document.getElementById('customCursor');

    if (videoContainer && customCursor) {
        videoContainer.addEventListener('mousemove', (e) => {
            const rect = videoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Adjust to center the 90x90 cursor perfectly
            customCursor.style.left = x + 'px';
            customCursor.style.top = y + 'px';

            customCursor.style.opacity = 1;
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        videoContainer.addEventListener('mouseleave', () => {
            customCursor.style.opacity = 0;
            customCursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });

        // Optional click listener for the video section
        videoContainer.addEventListener('click', () => {
            window.location.href = '/contact';
        });
    }
});
