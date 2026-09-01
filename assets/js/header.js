/*==================================================
BARGIIN
HEADER.JS
Unified Version
==================================================*/

(function () {

'use strict';

/*==============================
ELEMENTS
==============================*/

const header=document.querySelector('.header');

const menuBtn=document.querySelector('.menu-btn');

const navbar=document.querySelector('.navbar');

const overlay=document.querySelector('.header-overlay');

const searchBtn=document.querySelector('.search-btn');

const searchBox=document.querySelector('.search-box');

const searchInput=document.querySelector('.search-box input');

const dropdowns=document.querySelectorAll('.has-dropdown');

/*==============================
STICKY HEADER
==============================*/

function stickyHeader(){

if(!header)return;

if(window.scrollY>40){

header.classList.add('scrolled');

}else{

header.classList.remove('scrolled');

}

}

/*==============================
MOBILE MENU
==============================*/
/*==================================================
BARGIIN
MOBILE MENU
==================================================*/

(function(){

    "use strict";


    var menuBtn =
        document.getElementById("menuBtn");


    var navbar =
        document.getElementById("mainNavbar");


    var overlay =
        document.getElementById("headerOverlay");


    if(!menuBtn || !navbar){

        return;

    }


    /*==================================
OPEN / CLOSE MENU
==================================*/

    function openMenu(){

        menuBtn.classList.add("active");

        navbar.classList.add("active");

        document.body.classList.add("menu-open");


        if(overlay){

            overlay.classList.add("active");

        }


        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu(){

        menuBtn.classList.remove("active");

        navbar.classList.remove("active");

        document.body.classList.remove("menu-open");


        if(overlay){

            overlay.classList.remove("active");

        }


        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuBtn.addEventListener(
        "click",
        function(){

            if(navbar.classList.contains("active")){

                closeMenu();

            }else{

                openMenu();

            }

        }
    );


    /*==================================
OVERLAY CLOSE
==================================*/

    if(overlay){

        overlay.addEventListener(
            "click",
            closeMenu
        );

    }


    /*==================================
DROPDOWN
==================================*/

    var dropdowns =
        navbar.querySelectorAll(".dropdown");


    for(
        var i = 0;
        i < dropdowns.length;
        i++
    ){

        (function(dropdown){

            var toggle =
                dropdown.querySelector(
                    ".dropdown-toggle"
                );


            if(!toggle){

                return;

            }


            toggle.addEventListener(
                "click",
                function(event){

                    event.preventDefault();

                    dropdown.classList.toggle(
                        "active"
                    );

                }
            );

        })(dropdowns[i]);

    }


    /*==================================
CLOSE MENU AFTER CLICK
==================================*/

    var links =
        navbar.querySelectorAll(
            "a:not(.dropdown-toggle)"
        );


    for(
        var j = 0;
        j < links.length;
        j++
    ){

        links[j].addEventListener(
            "click",
            function(){

                if(
                    window.innerWidth <= 992
                ){

                    closeMenu();

                }

            }
        );

    }


    /*==================================
WINDOW RESIZE
==================================*/

    window.addEventListener(
        "resize",
        function(){

            if(window.innerWidth > 992){

                closeMenu();

            }

        }
    );


})();

/*==================================================
HEADER.JS
Part 2
HEADER EFFECTS
==================================================*/

(function () {

"use strict";

/*==============================
HEADER HOVER
==============================*/

const navLinks=document.querySelectorAll(".navbar a");

navLinks.forEach(function(link){

link.addEventListener("mouseenter",function(){

this.classList.add("hover");

});

link.addEventListener("mouseleave",function(){

this.classList.remove("hover");

});

});


/*==============================
HEADER SHADOW
==============================*/

const header=document.querySelector(".header");

function updateShadow(){

if(!header)return;

if(window.scrollY>10){

header.style.boxShadow="0 12px 35px rgba(0,0,0,.08)";

}else{

header.style.boxShadow="none";

}

}

window.addEventListener("scroll",updateShadow);

updateShadow();



/*==============================
HEADER HIDE
==============================*/

var lastScroll=0;

window.addEventListener("scroll",function(){

if(!header)return;

const current=window.pageYOffset;

if(current>150){

if(current>lastScroll){

header.classList.add("hide");

}else{

header.classList.remove("hide");

}

}

lastScroll=current;

});


/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(function(anchor){

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(!target)return;

e.preventDefault();

window.scrollTo({

top:target.offsetTop-90,

behavior:"smooth"

});

});

});

})();

/*==================================================
HEADER.JS
Part 3
ADVANCED FEATURES
==================================================*/

(function () {

"use strict";

/*==============================
PREVENT DOUBLE CLICK
==============================*/

var busy=false;

document.querySelectorAll(".menu-btn,.search-btn").forEach(function(btn){

btn.addEventListener("click",function(){

if(busy)return;

busy=true;

setTimeout(function(){

busy=false;

},250);

});

});


/*==============================
DROPDOWN HOVER DELAY
==============================*/

document.querySelectorAll(".has-dropdown").forEach(function(item){

var timer;

item.addEventListener("mouseenter",function(){

clearTimeout(timer);

item.classList.add("show");

});

item.addEventListener("mouseleave",function(){

timer=setTimeout(function(){

item.classList.remove("show");

},180);

});

});


/*==============================
HEADER BLUR
==============================*/

var header=document.querySelector(".header");

function updateHeader(){

if(!header)return;

if(window.scrollY>40){

header.style.backdropFilter="blur(18px)";

header.style.webkitBackdropFilter="blur(18px)";

}else{

header.style.backdropFilter="blur(12px)";

header.style.webkitBackdropFilter="blur(12px)";

}

}

window.addEventListener("scroll",updateHeader);

updateHeader();


/*==============================
CURRENT PAGE
==============================*/

var links=document.querySelectorAll(".navbar a");

var page=location.pathname.split("/").pop();

if(page===""){

page="index.html";

}

links.forEach(function(link){

if(link.getAttribute("href")===page){

link.classList.add("active");

}

});


/*==============================
EXTERNAL LINKS
==============================*/

document.querySelectorAll('a[target="_blank"]').forEach(function(link){

link.setAttribute("rel","noopener noreferrer");

});


/*==============================
KEYBOARD NAVIGATION
==============================*/

document.addEventListener("keyup",function(e){

if(e.key!=="Tab")return;

document.body.classList.add("keyboard-user");

});


document.addEventListener("mousedown",function(){

document.body.classList.remove("keyboard-user");

});


/*==============================
AUTO CLOSE MENU
==============================*/

document.querySelectorAll(".navbar a").forEach(function(link){

link.addEventListener("click",function(){

var nav=document.querySelector(".navbar");

var overlay=document.querySelector(".header-overlay");

var button=document.querySelector(".menu-btn");

if(window.innerWidth<=991){

nav.classList.remove("active");

if(overlay){

overlay.classList.remove("active");

}

if(button){

button.classList.remove("active");

}

document.body.style.overflow="";

}

});

});


/*==============================
END
==============================*/

})();