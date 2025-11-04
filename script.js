document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
            
            history.pushState(null, null, targetId);
        }
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.videos = document.querySelectorAll('.carousel-video');
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.showSlide(this.currentSlide);
        this.startAutoPlay();
        this.addEventListeners();
        this.pauseAllVideos();
        this.playCurrentVideo();
    }
    
    showSlide(n) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        
        this.pauseAllVideos();
        
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        
        setTimeout(() => {
            this.playCurrentVideo();
            this.isAnimating = false;
        }, 500);
    }
    
    pauseAllVideos() {
        this.videos.forEach(video => {
            video.pause();
            video.currentTime = 0; 
        });
    }
    
    playCurrentVideo() {
        const currentVideo = this.slides[this.currentSlide].querySelector('.carousel-video');
        if (currentVideo) {
            currentVideo.play().catch(e => {
                console.log('Autoplay prevented, waiting for interaction');
            });
        }
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    goToSlide(n) {
        this.showSlide(n);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); 
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addEventListeners() {
        document.querySelector('.prev').addEventListener('click', () => {
            this.prevSlide();
            this.restartAutoPlay();
        });
        
        document.querySelector('.next').addEventListener('click', () => {
            this.nextSlide();
            this.restartAutoPlay();
        });
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
        
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        carousel.addEventListener('focusin', () => this.stopAutoPlay());
        carousel.addEventListener('focusout', () => this.startAutoPlay());
        
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('.carousel-video');
                    if (video && entry.target.classList.contains('active')) {
                        video.play().catch(e => {
                            console.log('Video play prevented');
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        this.slides.forEach(slide => observer.observe(slide));
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            this.restartAutoPlay();
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(82, 113, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '8px 0';
    } else {
        header.style.background = '#5271ff';
        header.style.backdropFilter = 'none';
        header.style.padding = '12px 0';
    }
});

document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        mensagem: formData.get('mensagem')
    };
    
    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    this.reset();
});

document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        showMessage('Obrigado por se inscrever na nossa newsletter!', 'success');
        this.reset();
    }
});

function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transition: all 0.3s ease;
        max-width: 300px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    new Carousel();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .feature, .plan-card, .contact-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    console.log('MAX FIBRA - Site carregado com sucesso!');
});

const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
`;
document.head.appendChild(style);