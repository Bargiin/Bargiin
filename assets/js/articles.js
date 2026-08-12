/*==================================================
BARGIIN
ARTICLES.JS
==================================================*/

(function(){

    "use strict";


    /*==================================
    CATEGORY FILTER
    ==================================*/

    const buttons =
        document.querySelectorAll(
            ".articles-category"
        );

    const cards =
        document.querySelectorAll(
            ".article-card"
        );


    if(buttons.length && cards.length){

        buttons.forEach(function(button){

            button.addEventListener(
                "click",
                function(e){

                    const filter =
                        this.getAttribute(
                            "data-filter"
                        );


                    buttons.forEach(function(item){

                        item.classList.remove(
                            "active"
                        );

                    });


                    this.classList.add(
                        "active"
                    );


                    cards.forEach(function(card){

                        const category =
                            card.getAttribute(
                                "data-category"
                            );


                        if(
                            filter === "all" ||
                            category === filter
                        ){

                            card.style.display =
                                "flex";

                        }

                        else{

                            card.style.display =
                                "none";

                        }

                    });

                }
            );

        });

    }


    /*==================================
    IMAGE ERROR
    ==================================*/

    const images =
        document.querySelectorAll(
            ".article-card-image img"
        );


    images.forEach(function(image){

        image.addEventListener(
            "error",
            function(){

                this.style.display =
                    "none";

            }
        );

    });


})();