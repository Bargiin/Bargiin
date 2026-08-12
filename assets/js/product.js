/*==================================================
BARGIIN
PRODUCT DETAIL PAGE
==================================================*/

(function(){

    "use strict";


    var page =
        document.querySelector(".product-page");


    if(!page){
        return;
    }


    /*==================================
    IMAGE HOVER
    ==================================*/

    var image =
        page.querySelector(
            ".product-image img"
        );


    if(image){

        image.addEventListener(
            "mouseenter",
            function(){

                image.style.transform =
                    "scale(1.03)";

            }
        );


        image.addEventListener(
            "mouseleave",
            function(){

                image.style.transform =
                    "scale(1)";

            }
        );

    }


})();