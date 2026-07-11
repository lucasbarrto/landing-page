document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".strategy-slide");
    const dots = document.querySelectorAll(".strategy-dot");
    const prevButton = document.querySelector(".strategy-arrow-prev");
    const nextButton = document.querySelector(".strategy-arrow-next");

    if (!slides.length) return;

    const AUTOPLAY_DELAY = 10000;

    let current = 0;
    let timer = null;

    function goTo(index) {

        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {

            slide.classList.toggle("active", i === current);

        });

        dots.forEach((dot, i) => {

            dot.classList.toggle("active", i === current);

        });

    }

    function next() {

        goTo(current + 1);

    }

    function prev() {

        goTo(current - 1);

    }

    function startAutoplay() {

        clearInterval(timer);

        timer = setInterval(next, AUTOPLAY_DELAY);

    }

    nextButton.addEventListener("click", () => {

        next();
        startAutoplay();

    });

    prevButton.addEventListener("click", () => {

        prev();
        startAutoplay();

    });

    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            goTo(Number(dot.dataset.slide));
            startAutoplay();

        });

    });

    startAutoplay();

});
