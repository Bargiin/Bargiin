/*==================================================
BARGIIN SHOWCASE SLIDER
==================================================*/

(function () {

    "use strict";

    const showcase = document.getElementById("bargiinShowcase");

    if (!showcase) return;


    const track = showcase.querySelector(
        ".bargiin-showcase-track"
    );

    const slides = showcase.querySelectorAll(
        ".bargiin-showcase-slide"
    );

    const dots = showcase.querySelectorAll(
        ".bargiin-showcase-dots button"
    );

    const prev = showcase.querySelector(
        ".bargiin-showcase-prev"
    );

    const next = showcase.querySelector(
        ".bargiin-showcase-next"
    );


    let current = 0;

    let timer = null;

    const delay = 4000;


    function updateShowcase() {

        track.style.transform =
            `translateX(-${current * 100}%)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === current
            );

        });

    }


    function nextSlide() {

        current++;

        if (current >= slides.length) {

            current = 0;

        }

        updateShowcase();

    }


    function previousSlide() {

        current--;

        if (current < 0) {

            current = slides.length - 1;

        }

        updateShowcase();

    }


    /* Next */

    if (next) {

        next.addEventListener(
            "click",
            function () {

                nextSlide();

                restartAutoPlay();

            }
        );

    }


    /* Previous */

    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                previousSlide();

                restartAutoPlay();

            }
        );

    }


    /* Dots */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            function () {

                current = index;

                updateShowcase();

                restartAutoPlay();

            }
        );

    });


    /* Auto Play */

    function startAutoPlay() {

        stopAutoPlay();

        timer = setInterval(
            nextSlide,
            delay
        );

    }


    function stopAutoPlay() {

        if (timer) {

            clearInterval(timer);

            timer = null;

        }

    }


    function restartAutoPlay() {

        startAutoPlay();

    }


    /* Touch */

    let startX = 0;


    showcase.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.touches[0].clientX;

        },
        {
            passive:true
        }
    );


    showcase.addEventListener(
        "touchend",
        function (event) {

            const endX =
                event.changedTouches[0].clientX;

            const distance =
                endX - startX;


            if (Math.abs(distance) < 50) return;


            if (distance < 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            restartAutoPlay();

        },
        {
            passive:true
        }
    );


    /* Start */

    updateShowcase();

    startAutoPlay();

})();