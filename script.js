// ============================================
        // LOADING SCREEN
        // ============================================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // ============================================
        // THEME TOGGLE
        // ============================================
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }

        // ============================================
        // MOBILE MENU TOGGLE
        // ============================================
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        });

        // ============================================
        // NAVBAR SCROLL EFFECT
        // ============================================
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============================================
        // ACTIVE SECTION HIGHLIGHTING
        // ============================================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        // ============================================
        // SCROLL ANIMATIONS
        // ============================================
        const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animateElements.forEach(el => animateObserver.observe(el));

        // ============================================
        // SKILL BARS ANIMATION
        // ============================================
        const skillItems = document.querySelectorAll('.skill-item');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5
        });

        skillItems.forEach(item => skillObserver.observe(item));

        // ============================================
        // BACK TO TOP BUTTON
        // ============================================
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================
        // CONTACT FORM VALIDATION
        // ============================================
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (name && email && message) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });

        // ============================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });



        // Modern Experience Section Animation Controller - Responsive Fixed
const initExperienceAnimations = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create intersection observer for timeline items
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for each item
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold for better mobile detection
        rootMargin: '0px 0px -20px 0px' // Adjusted for mobile
    });

    // Observe each timeline item
    timelineItems.forEach(item => {
        experienceObserver.observe(item);
    });
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initExperienceAnimations);

// Re-initialize when page is fully loaded
window.addEventListener('load', () => {
    setTimeout(initExperienceAnimations, 500);
});

// Simple hover effects (disabled on touch devices)
const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

if (!isTouchDevice()) {
    const addHoverEffects = () => {
        const items = document.querySelectorAll('.timeline-item');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };
    
    addHoverEffects();
}