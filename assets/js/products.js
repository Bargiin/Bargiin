/*==================================================
BARGIIN
PRODUCTS PAGE
FILTER
==================================================*/

(function(){

    "use strict";


    var buttons =
        document.querySelectorAll(
            ".product-filter"
        );

    var cards =
        document.querySelectorAll(
            ".product-card"
        );


    if(!buttons.length || !cards.length){
        return;
    }


    /*==================================
    FILTER PRODUCTS
    ==================================*/

    function filterProducts(category){

        for(var i = 0; i < cards.length; i++){

            var card =
                cards[i];

            var cardCategory =
                card.getAttribute(
                    "data-category"
                );


            if(
                category === "all" ||
                cardCategory === category
            ){

                card.classList.remove(
                    "is-hidden"
                );

                card.classList.remove(
                    "is-visible"
                );


                /* restart animation */

                void card.offsetWidth;


                card.classList.add(
                    "is-visible"
                );

            }

            else{

                card.classList.remove(
                    "is-visible"
                );

                card.classList.add(
                    "is-hidden"
                );

            }

        }

    }


    /*==================================
    BUTTON EVENTS
    ==================================*/

    for(var i = 0; i < buttons.length; i++){

        buttons[i].addEventListener(
            "click",
            function(){

                var category =
                    this.getAttribute(
                        "data-filter"
                    );


                for(
                    var j = 0;
                    j < buttons.length;
                    j++
                ){

                    buttons[j].classList.remove(
                        "active"
                    );

                }


                this.classList.add(
                    "active"
                );


                filterProducts(
                    category
                );

            }
        );

    }


    /*==================================
    INITIAL STATE
    ==================================*/

    filterProducts("all");


})();