// Rolagem automática no clique do menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Código do carrossel de imagens
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel img');
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Função para mudar o slide automaticamente
function autoSlide() {
    moveSlide(1);
}

// Define o intervalo de 2.5 segundos
setInterval(autoSlide, 2500);


