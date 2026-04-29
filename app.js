document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});
    const navBtn = document.querySelector('.nav-btn');

    if (menuToggle && navLinks) {
        const toggleMenu = (e) => {
            if(e) e.stopPropagation();
            navLinks.classList.toggle('active');
            if(navBtn) navBtn.classList.toggle('active-mobile');
            
            const icon = menuToggle.querySelector('i');
            if(icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            if(navBtn) navBtn.classList.remove('active-mobile');
            const icon = menuToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Close when clicking a link
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
        if(navBtn) navBtn.addEventListener('click', closeMenu);

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // Hero Animation
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-img", {
        scale: 1.2,
        duration: 2.5,
        ease: "power3.out"
    })
    .from(".gs-hero", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=1.5");

    // General Fade Up Elements
    const revealElements = document.querySelectorAll(".gs-reveal");
    
    revealElements.forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // The Journey Scroll Animations
    const journeyItems = document.querySelectorAll(".gs-journey");
    
    journeyItems.forEach((item, index) => {
        const direction = item.classList.contains('reverse') ? 50 : -50;
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: direction,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
