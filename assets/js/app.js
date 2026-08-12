/*==================================================
File : assets/js/app.js
Version : ES5
Description : Main Application Controller
Status : COMPLETE
==================================================*/

(function (window, document) {

    "use strict";

    /*==================================
    App Constructor
    ==================================*/

    function App() {

        this.body = document.body;
        this.html = document.documentElement;

        this.init();

    }

    /*==================================
    Initialize
    ==================================*/

    App.prototype.init = function () {

        this.removeNoJs();
        this.addLoadedClass();
        this.initExternalLinks();
        this.initLazyImages();
        this.initBackToTop();
        this.initCurrentYear();

    };

    /*==================================
    Remove no-js
    ==================================*/

    App.prototype.removeNoJs = function () {

        if (this.html.className.indexOf("no-js") !== -1) {

            this.html.className =
                this.html.className.replace("no-js", "js");

        }

    };

    /*==================================
    Page Loaded
    ==================================*/

    App.prototype.addLoadedClass = function () {

        var body = this.body;

        if (document.readyState === "complete") {

            body.className += " page-loaded";

            return;

        }

        window.addEventListener("load", function () {

            if (body.className.indexOf("page-loaded") === -1) {

                body.className += " page-loaded";

            }

        });

    };

    /*==================================
    External Links
    ==================================*/

    App.prototype.initExternalLinks = function () {

        var links;
        var i;
        var href;

        links = document.getElementsByTagName("a");

        for (i = 0; i < links.length; i++) {

            href = links[i].getAttribute("href");

            if (!href) {
                continue;
            }

            if (
                href.indexOf("http://") === 0 ||
                href.indexOf("https://") === 0
            ) {

                links[i].setAttribute("target", "_blank");
                links[i].setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        }

    };

    /*==================================
    Lazy Images
    ==================================*/

    App.prototype.initLazyImages = function () {

        var images;
        var i;

        images = document.querySelectorAll("img[loading='lazy']");

        for (i = 0; i < images.length; i++) {

            images[i].addEventListener("load", function () {

                if (this.className.indexOf("loaded") === -1) {

                    this.className += " loaded";

                }

            });

        }

    };

    /*==================================
    Back To Top
    ==================================*/

    App.prototype.initBackToTop = function () {

        var button;

        button = document.getElementById("backToTop");

        if (!button) {
            return;
        }

        window.addEventListener("scroll", function () {

            var top =
                window.pageYOffset ||
                document.documentElement.scrollTop;

            if (top > 500) {

                button.className = "show";

            } else {

                button.className = "";

            }

        });

        button.addEventListener("click", function (event) {

            event.preventDefault();

            if ("scrollBehavior" in document.documentElement.style) {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else {

                window.scrollTo(0, 0);

            }

        });

    };


    /*==================================
    Current Year
    ==================================*/

    App.prototype.initCurrentYear = function () {

        var year;
        var currentYear;

        year = document.getElementById("currentYear");

        if (!year) {
            return;
        }

        currentYear = new Date().getFullYear();

        year.innerHTML = currentYear;

    };

    /*==================================
    DOM Ready
    ==================================*/

    document.addEventListener("DOMContentLoaded", function () {

        window.BargiinApp = new App();

    });

})(window, document);

// About Preview
// about-preview.js loaded

/*==================================
BACK TO TOP
==================================*/

const backToTop=document.querySelector(".back-to-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
END OF FILE
app.js COMPLETED
==================================================*/