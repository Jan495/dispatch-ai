document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load to show elements already in view
    revealOnScroll();
    
    // Parallax effect on hero visual
    const heroVisual = document.querySelector('.hero-visual-placeholder');
    if (heroVisual) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            heroVisual.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis + 10}deg)`;
        });
        
        // Reset on mouse leave (if leaving window)
        document.addEventListener('mouseleave', () => {
            heroVisual.style.transform = `perspective(1000px) rotateX(10deg)`;
        });
    }
});
