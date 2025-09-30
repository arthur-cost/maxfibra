// script.js

// Navegação suave ao clicar nos links do menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Carrossel de imagens
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel img');
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Rolagem automática do carrossel a cada 2,5 segundos
setInterval(() => moveSlide(1), 2500);



