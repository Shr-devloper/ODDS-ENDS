

let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators li');

    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

function moveSlide(step) {
    showSlide(currentIndex += step);
}

// Initialize
showSlide(currentIndex);

// Optional: Auto-slide functionality
setInterval(() => {
    moveSlide(1);
}, 5000); // Change slide every 5 seconds



// navbar js is here

