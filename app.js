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
    
    // Hero image sequence animation
    const canvas = document.getElementById("hero-lightpass");
    if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 80;
        const currentFrame = index => (
            `hero/Components_unravels_elegantly_be…_202605182144_${index.toString().padStart(3, '0')}.jpg`
        );

        const img = new Image();
        img.src = currentFrame(0);
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };

        const preloadImages = () => {
            for (let i = 1; i < frameCount; i++) {
                const preloadImg = new Image();
                preloadImg.src = currentFrame(i);
            }
        };

        preloadImages();

        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            const scrollTop = window.scrollY - hero.offsetTop;
            const maxScrollTop = hero.scrollHeight - window.innerHeight;
            
            if (scrollTop >= 0 && scrollTop <= maxScrollTop) {
                const scrollFraction = scrollTop / maxScrollTop;
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(scrollFraction * frameCount)
                );
                
                requestAnimationFrame(() => {
                    const nextImg = new Image();
                    nextImg.src = currentFrame(frameIndex);
                    // Use a slightly different draw approach to ensure smooth frames
                    nextImg.onload = () => {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(nextImg, 0, 0);
                    }
                });
            }
        });
    }

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            if (isLight) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        });
    }
});
