/*==================================================
BARGIIN
ABOUT PAGE
==================================================*/

(function(){

    "use strict";


    var page =
        document.querySelector(".about-page");


    if(!page){
        return;
    }


    /*==================================
    REVEAL
    ==================================*/

    var elements =
        page.querySelectorAll(
            ".about-story-content, " +
            ".about-story-image, " +
            ".about-value, " +
            ".about-why-box, " +
            ".about-cta-content"
        );


    if(!elements.length){
        return;
    }


    for(
        var i = 0;
        i < elements.length;
        i++
    ){

        elements[i].style.opacity = "0";

        elements[i].style.transform =
            "translateY(20px)";

        elements[i].style.transition =
            "opacity .6s ease, transform .6s ease";

    }


    function reveal(){

        var windowHeight =
            window.innerHeight;


        for(
            var i = 0;
            i < elements.length;
            i++
        ){

            var rect =
                elements[i].getBoundingClientRect();


            if(
                rect.top <
                windowHeight - 80
            ){

                elements[i].style.opacity = "1";

                elements[i].style.transform =
                    "translateY(0)";

            }

        }

    }


    window.addEventListener(
        "scroll",
        reveal,
        {
            passive:true
        }
    );


    reveal();


})();