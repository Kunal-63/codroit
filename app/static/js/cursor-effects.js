// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    // Only init on desktop
    if(window.innerWidth <= 768) return;
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if(!cursorDot || !cursorOutline) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = window.innerWidth / 2;
    let outlineY = window.innerHeight / 2;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Animate outline for smooth trailing effect
    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX = outlineX + (distX * 0.15);
        outlineY = outlineY + (distY * 0.15);
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Hover Effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic-item, input, textarea');
    
    hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
            
            // magnetic reset
            if(el.classList.contains('magnetic-item')) {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            }
        });
        
        // Magnetic effect logic
        if(el.classList.contains('magnetic-item')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * 0.2, // move by 20% of distance from center
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    });
});
