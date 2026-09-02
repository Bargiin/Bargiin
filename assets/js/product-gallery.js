/*==================================================
BARGIIN
PRODUCT GALLERY
==================================================*/

(function(){

    "use strict";


    var gallery =
        document.getElementById("productGallery");


    if(!gallery){
        return;
    }


    var track =
        gallery.querySelector(
            ".product-gallery-track"
        );


    var slides =
        gallery.querySelectorAll(
            ".product-gallery-slide"
        );


    var dots =
        gallery.querySelectorAll(
            ".product-gallery-dots button"
        );


    var prev =
        gallery.querySelector(
            ".product-gallery-prev"
        );


    var next =
        gallery.querySelector(
            ".product-gallery-next"
        );


    if(!track || slides.length === 0){
        return;
    }


    var current = 0;

    var timer = null;

    var delay = 4000;

    var startX = 0;


    /*==================================
    UPDATE SLIDER
    ==================================*/

function updateSlider() {

    var slideWidth =
        gallery.clientWidth;

    track.style.transform =
        "translateX(" +
        (-current * slideWidth) +
        "px)";


    for (var i = 0; i < dots.length; i++) {

        dots[i].classList.remove("active");

    }


    if (dots[current]) {

        dots[current].classList.add("active");

    }

}


    /*==================================
    NEXT
    ==================================*/

    function nextSlide(){

        current++;


        if(current >= slides.length){

            current = 0;

        }


        updateSlider();

    }


    /*==================================
    PREVIOUS
    ==================================*/

    function previousSlide(){

        current--;


        if(current < 0){

            current =
                slides.length - 1;

        }


        updateSlider();

    }


    /*==================================
    NEXT BUTTON
    ==================================*/

    if(next){

        next.addEventListener(
            "click",
            function(){

                nextSlide();

                restartAutoPlay();

            }
        );

    }


    /*==================================
    PREVIOUS BUTTON
    ==================================*/

    if(prev){

        prev.addEventListener(
            "click",
            function(){

                previousSlide();

                restartAutoPlay();

            }
        );

    }


    /*==================================
    DOTS
    ==================================*/

    for(var i = 0; i < dots.length; i++){

        (function(index){

            dots[index].addEventListener(
                "click",
                function(){

                    current = index;

                    updateSlider();

                    restartAutoPlay();

                }
            );

        })(i);

    }


    /*==================================
    TOUCH START
    ==================================*/

    gallery.addEventListener(
        "touchstart",
        function(event){

            if(!event.touches.length){
                return;
            }


            startX =
                event.touches[0].clientX;

        },
        {
            passive:true
        }
    );


    /*==================================
    TOUCH END
    ==================================*/

    gallery.addEventListener(
        "touchend",
        function(event){

            if(!event.changedTouches.length){
                return;
            }


            var endX =
                event.changedTouches[0].clientX;


            var distance =
                endX - startX;


            if(Math.abs(distance) < 50){
                return;
            }


            if(distance < 0){

                nextSlide();

            }else{

                previousSlide();

            }


            restartAutoPlay();

        },
        {
            passive:true
        }
    );


    /*==================================
    AUTOPLAY
    ==================================*/

    function startAutoPlay(){

        stopAutoPlay();


        timer =
            setInterval(
                function(){

                    nextSlide();

                },
                delay
            );

    }


    function stopAutoPlay(){

        if(timer !== null){

            clearInterval(timer);

            timer = null;

        }

    }


    function restartAutoPlay(){

        startAutoPlay();

    }


    /*==================================
    RESIZE
    ==================================*/

    window.addEventListener(
        "resize",
        function(){

            updateSlider();

        }
    );


	/*================================*/
	
	window.addEventListener(
    "resize",
    function(){

        updateSlider();

    }
);
	
	
    /*==================================
    INITIALIZE
    ==================================*/

    updateSlider();

    startAutoPlay();


})();