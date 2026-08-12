/*==================================
BARGIIN WELCOME POPUP
==================================*/

(function(){

    "use strict";


    const popup =
        document.getElementById(
            "welcomePopup"
        );

    const closeButton =
        document.getElementById(
            "welcomePopupClose"
        );

    const okButton =
        document.getElementById(
            "welcomePopupOk"
        );

    const overlay =
        popup
            ? popup.querySelector(
                ".welcome-popup-overlay"
            )
            : null;


    if(!popup){
        return;
    }


    function openPopup(){

        popup.classList.add(
            "active"
        );

    }


    function closePopup(){

        popup.classList.remove(
            "active"
        );

    }


    closeButton.addEventListener(
        "click",
        closePopup
    );


    okButton.addEventListener(
        "click",
        closePopup
    );


    overlay.addEventListener(
        "click",
        closePopup
    );


    document.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Escape"){

                closePopup();

            }

        }
    );


    /*
    نمایش Popup هنگام ورود
    */

    window.addEventListener(
        "load",
        function(){

            setTimeout(
                openPopup,
                700
            );

        }
    );

})();