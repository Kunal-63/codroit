// GSAP Global Animations
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if(typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect — Floating Pill
    const navbar = document.getElementById('navbar');
    const navbarWrapper = document.getElementById('navbar-wrapper');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
                if (navbarWrapper) navbarWrapper.classList.replace('pt-4', 'pt-2');
            } else {
                navbar.classList.remove('scrolled');
                if (navbarWrapper) navbarWrapper.classList.replace('pt-2', 'pt-4');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run on load
    }

    // Common fade-in settings for smoothness
    const fadeConfig = {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
    };

    // Page Load Animation
    const loadTl = gsap.timeline();
    
    // Hero Title
    const heroLines = document.querySelectorAll('.hero-title-line');
    if(heroLines.length > 0) {
        loadTl.to(heroLines, {
            y: "0%",
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "power2.out"
        });
    }

    // Page Title
    const pageReveal = document.querySelector('.page-reveal');
    if(pageReveal) {
        loadTl.to(pageReveal, { ...fadeConfig, x: 0 }, "-=1");
    }

    // Hero Stagger items
    const staggerItems = document.querySelectorAll('.hero-stagger');
    if(staggerItems.length > 0) {
        loadTl.to(staggerItems, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=1");
    }

    // Scroll Animations - Smooth Fades for everything
    const fadeElements = [
        '.section-header', 
        '.feature-card', 
        '.timeline-item', 
        '.cta-box', 
        '.scroll-reveal',
        '.scale-on-scroll' // Re-purposing scale class to just fade for performance
    ];

    fadeElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                y: 0,
                x: 0,
                scale: 1, // Reset scale if it was set via CSS
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    });

    // Generic Stagger Boxes
    const staggerBoxes = gsap.utils.toArray('.stagger-box');
    if(staggerBoxes.length > 0) {
        ScrollTrigger.batch(staggerBoxes, {
            start: "top 90%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1, 
                y: 0, 
                stagger: 0.1, 
                duration: 1.2,
                ease: "power2.out"
            })
        });
    }

    // Parallax Images - Only slight Y movement, no heavy scrubbing
    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 2 // smooth scrub
            },
            y: 30, // reduce movement to prevent lag
            ease: "none"
        });
    });

    // Parallax Backgrounds
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.fromTo(bg, 
            { backgroundPosition: "50% 0px" },
            {
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                },
                backgroundPosition: "50% 50px", // reduced movement
                ease: "none"
            }
        );
    });

});
