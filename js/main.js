// Main JS - GSAP, Lenis, Cursor, and Animations

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Get scroll value
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'bg-white/90');
            navbar.classList.remove('bg-white/70', 'border-white/20');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/90');
            navbar.classList.add('bg-white/70', 'border-white/20');
        }
    });

    // 4. Hero Animations (only if hero section exists)
    const tl = gsap.timeline();
    if(document.querySelector('.hero-title')) {
        tl.from(".hero-title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2
        })
        .to(".hero-fade-in", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.8");
    }

    // 5. Scroll Reveal Animations (reveal-up)
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 6. 3D Tilt Effect on Hero Image
    const tiltElement = document.querySelector('.tilt-element');
    const heroImg = document.querySelector('.hero-img');
    
    if(tiltElement && heroImg) {
        tiltElement.addEventListener('mousemove', (e) => {
            const rect = tiltElement.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation percentages
            const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPct = (y / rect.height - 0.5) * 2; // -1 to 1
            
            // Max rotation degree
            const maxRot = 15;
            
            gsap.to(heroImg, {
                rotationY: xPct * maxRot,
                rotationX: -yPct * maxRot,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        });

        tiltElement.addEventListener('mouseleave', () => {
            gsap.to(heroImg, {
                rotationY: 0,
                rotationX: 0,
                ease: "power2.out",
                duration: 1
            });
        });
    }

    // 7. Parallax Background inside sections
    const parallaxBg = document.getElementById('parallax-bg');
    if(parallaxBg) {
        gsap.to(parallaxBg, {
            scrollTrigger: {
                trigger: parallaxBg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: 100, // moves the image down as we scroll down
            ease: "none"
        });
    }
});
