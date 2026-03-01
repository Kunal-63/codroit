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

    // Page Load Animation
    const loadTl = gsap.timeline();
    
    // Hero Title
    const heroLines = document.querySelectorAll('.hero-title-line');
    if(heroLines.length > 0) {
        loadTl.to(heroLines, {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.2
        });
    }

    // Page Title
    const pageReveal = document.querySelector('.page-reveal');
    if(pageReveal) {
        loadTl.to(pageReveal, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2
        });
    }

    // Hero Stagger items
    const staggerItems = document.querySelectorAll('.hero-stagger');
    if(staggerItems.length > 0) {
        loadTl.to(staggerItems, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.8");
    }

    // Scroll Animations
    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.to(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Feature Cards Stagger
    gsap.utils.toArray('.feature-card').forEach(card => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // CTA Box
    const ctaBox = document.querySelector('.cta-box');
    if(ctaBox) {
        gsap.to(ctaBox, {
            scrollTrigger: {
                trigger: ctaBox,
                start: "top 85%",
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.5)"
        });
    }

    // Generic Scroll Reveals
    gsap.utils.toArray('.scroll-reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Generic Stagger Boxes
    const staggerBoxes = gsap.utils.toArray('.stagger-box');
    if(staggerBoxes.length > 0) {
        ScrollTrigger.batch(staggerBoxes, {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1, 
                y: 0, 
                stagger: 0.15, 
                duration: 0.8,
                ease: "power3.out"
            })
        });
    }

    /* ---- NEW ADVANCED SCROLL ANIMATIONS ---- */

    // 1. Parallax Images
    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: 50,
            ease: "none"
        });
    });

    // 2. Continuous Element Rotation on Scroll
    gsap.utils.toArray('.rotate-on-scroll').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
            },
            rotation: 180,
            ease: "none"
        });
    });

    // 3. Floating Up Elements (Parallax reversed)
    gsap.utils.toArray('.float-up-scroll').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            },
            y: -100,
            ease: "none"
        });
    });

    // 4. Line Drawing Animation (Timeline process)
    const lineDraw = document.querySelector('.line-draw-scroll');
    if (lineDraw) {
        gsap.to(lineDraw, {
            scrollTrigger: {
                trigger: '.timeline-container',
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1
            },
            width: "100%",
            ease: "none"
        });
    }

    // 5. Scale In on Scroll
    gsap.utils.toArray('.scale-on-scroll').forEach(el => {
        gsap.fromTo(el, 
            { scale: 0.8, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1
                },
                scale: 1,
                opacity: 1,
                ease: "power2.out"
            }
        );
    });

    // 6. Parallax Backgrounds (CTA)
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.fromTo(bg, 
            { backgroundPosition: "50% 0px" },
            {
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                backgroundPosition: "50% 100px",
                ease: "none"
            }
        );
    });

    // 7. Text Reveal Hover effect (Letter staggering)
    const hoverReveals = document.querySelectorAll('.hover-reveal');
    hoverReveals.forEach(text => {
        const originalText = text.innerText;
        text.innerHTML = '';
        
        // Split text into words
        const words = originalText.split(' ');
        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block overflow-hidden mr-1';
            
            // Split word into letters
            const chars = word.split('');
            chars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char;
                charSpan.className = 'inline-block transform transition-transform duration-300';
                wordSpan.appendChild(charSpan);
            });
            text.appendChild(wordSpan);
        });

        // Add hover effect
        text.addEventListener('mouseenter', () => {
            gsap.to(text.querySelectorAll('span > span'), {
                y: -5,
                color: '#0EA5E9',
                stagger: 0.02,
                duration: 0.2,
                ease: "power1.out"
            });
        });
        
        text.addEventListener('mouseleave', () => {
            gsap.to(text.querySelectorAll('span > span'), {
                y: 0,
                color: 'inherit',
                stagger: 0.02,
                duration: 0.2,
                ease: "power1.in"
            });
        });
    });

    // 8. Dynamic Background Coding Elements
    gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
        // Create an organic floating animation using sine/cosine curves
        gsap.to(shape, {
            y: `random(-40, 40)`,
            x: `random(-30, 30)`,
            rotation: `random(-20, 20)`,
            duration: `random(4, 8)`,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: `random(0, 2)`
        });
    });

    // 9. Main Scroll Following Shape (Hero Shape)
    const mainShape = document.getElementById('main-scroll-shape');
    if (mainShape) {
        // Make the shape rotate continuously
        gsap.to(mainShape.querySelector('svg'), {
            rotation: 360,
            duration: 40,
            ease: "none",
            repeat: -1
        });

        // Make the shape follow the scroll, change size and color opacity
        gsap.to(mainShape, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            },
            y: () => window.innerHeight * 0.8, // Moves down significantly
            scale: 1.5,
            rotation: 90,
            ease: "power1.inOut"
        });
    }
});
