
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
            
            
            history.pushState(null, null, targetId);
        }
    });
});


class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.showSlide(this.currentSlide);
        this.startAutoPlay();
        this.addEventListeners();
    }
    
    showSlide(n) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
       
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
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
        }, 5000);
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
        header.style.padding = '5px 0';
    } else {
        header.style.background = '#5271ff';
        header.style.backdropFilter = 'none';
        header.style.padding = '10px 0';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
    new Carousel();
    
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    
    console.log('MAX FIBRA - Site carregado com sucesso!');
});