// Premium Main JavaScript for Codroit Website with 3D Models

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 1200);
});

// Navbar scroll effect with enhanced animation
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link highlighting
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || 
        (currentPath === '/' && href === '/') ||
        (currentPath.includes('about') && href.includes('about')) ||
        (currentPath.includes('services') && href.includes('services')) ||
        (currentPath.includes('portfolio') && href.includes('portfolio')) ||
        (currentPath.includes('contact') && href.includes('contact'))) {
        link.classList.add('active');
    }
});

// Initialize AOS (Animate On Scroll) with enhanced settings
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 0
    });
}

// 3D Scene Setup for Hero Section - Disabled for better readability
let scene3d, camera3d, renderer3d, controls3d;
let animationId3d;

function init3DScene() {
    // Disabled 3D scene for better text readability
    return;
    const hero3dContainer = document.querySelector('.hero-3d-container');
    if (!hero3dContainer || typeof THREE === 'undefined') return;
    
    // Scene setup
    scene3d = new THREE.Scene();
    scene3d.background = null; // Transparent
    
    // Camera setup
    camera3d = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera3d.position.z = 5;
    camera3d.position.y = 1;
    
    // Renderer setup
    renderer3d = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer3d.setSize(window.innerWidth, window.innerHeight);
    renderer3d.setPixelRatio(window.devicePixelRatio);
    hero3dContainer.appendChild(renderer3d.domElement);
    
    // Create floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x00bcd4,
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
        opacity: 0.4,
        transparent: true
    });
    
    // Create multiple floating objects (reduced for better readability)
    for (let i = 0; i < 6; i++) {
        const mesh = new THREE.Mesh(geometry, material.clone());
        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        mesh.userData = {
            speed: 0.01 + Math.random() * 0.02,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };
        scene3d.add(mesh);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene3d.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x1e3a5f, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene3d.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00bcd4, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene3d.add(pointLight2);
    
    // Animation loop
    function animate() {
        animationId3d = requestAnimationFrame(animate);
        
        // Rotate and move objects
        scene3d.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
                child.rotation.z += child.userData.rotationSpeed.z;
                
                // Floating motion
                child.position.y += Math.sin(Date.now() * child.userData.speed) * 0.001;
                child.position.x += Math.cos(Date.now() * child.userData.speed) * 0.001;
            }
        });
        
        // Rotate camera slightly
        camera3d.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
        camera3d.position.y = Math.cos(Date.now() * 0.0003) * 0.3;
        camera3d.lookAt(0, 0, 0);
        
        renderer3d.render(scene3d, camera3d);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera3d.aspect = window.innerWidth / window.innerHeight;
        camera3d.updateProjectionMatrix();
        renderer3d.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D scene when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DScene);
} else {
    init3DScene();
}

// GSAP Animations with enhanced effects
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text animation with stagger
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 80,
        scale: 0.8,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.4
    });
    
    gsap.from('.hero-content .subtitle', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });
    
    gsap.from('.hero-buttons a', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2,
        stagger: 0.2
    });
    
    // Enhanced service cards animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 80,
            rotationX: -15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });
    
    // Enhanced portfolio items animation
    /* GSAP Portfolio Animation Disabled - using AOS instead */
    // gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    //     gsap.from(item, {
    //         opacity: 0,
    //         scale: 0.7,
    //         rotationY: -20,
    //         duration: 0.8,
    //         ease: 'back.out(1.7)',
    //         scrollTrigger: {
    //             trigger: item,
    //             start: 'top 85%',
    //             toggleActions: 'play none none none'
    //         },
    //         delay: index * 0.15
    //     });
    // });
    
    // Parallax effect for sections
    gsap.utils.toArray('.section').forEach((section, index) => {
        if (index % 2 === 0) {
            gsap.to(section, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });
    
    // Stats counter animation with enhanced effect
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        const hasPlus = text.includes('+');
        const duration = 2.5;
        const increment = target / (duration * 60);
        let current = 0;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.to({}, {
                    duration: duration,
                    ease: 'power2.out',
                    onUpdate: function() {
                        current = Math.min(target, current + increment);
                        stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                });
            }
        });
    });
}

// Enhanced back to top button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        const requiredInputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                gsap.to(input, {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// Mobile menu close on link click
const navCollapse = document.querySelector('.navbar-collapse');
const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');

navLinksMobile.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});

// Enhanced parallax effect for hero section
let heroParallax = null;
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        if (!heroParallax) {
            heroParallax = gsap.to(heroSection, {
                y: scrolled * 0.3,
                ease: 'none',
                duration: 0.3
            });
        }
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced ripple effect to buttons
document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .btn-submit, .service-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            pointer-events: none;
        `;
        ripple.classList.add('ripple');
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
    });
});

// Mouse move parallax effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(this, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Add cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #00bcd4;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    document.querySelectorAll('a, button, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});

// Console message
console.log('%c🚀 Codroit Website Loaded Successfully!', 'color: #1e3a5f; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern technologies and 3D animations', 'color: #00bcd4; font-size: 12px;');
