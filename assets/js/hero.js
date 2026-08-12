/*==================================================
BARGIIN
HERO.JS
Unified Version
==================================================*/

(function () {

"use strict";

/*==============================
ELEMENTS
==============================*/

const hero=document.querySelector(".hero");
const heroImage=document.querySelector(".hero-main-image");
const floatingLeaves=document.querySelectorAll(".floating-leaf");
const heroButtons=document.querySelectorAll(".hero-buttons .btn");

/*==============================
PARALLAX IMAGE
==============================*/

function heroParallax(e){

    if(!hero || !heroImage) return;

    const rect=hero.getBoundingClientRect();

    const x=((e.clientX-rect.left)/rect.width-.5)*20;
    const y=((e.clientY-rect.top)/rect.height-.5)*20;

    heroImage.style.transform=
        "translate("+x+"px,"+y+"px)";

}

if(hero){

    hero.addEventListener("mousemove",heroParallax);

    hero.addEventListener("mouseleave",function(){

        heroImage.style.transform="translate(0,0)";

    });

}

/*==============================
FLOATING LEAVES
==============================*/

floatingLeaves.forEach(function(leaf,index){

    var speed=(index+1)*4;

    window.addEventListener("scroll",function(){

        leaf.style.transform=
        "translateY("+(window.scrollY/speed)+"px)";

    });

});

/*==============================
BUTTON RIPPLE
==============================*/

heroButtons.forEach(function(button){

button.addEventListener("mouseenter",function(){

button.classList.add("hover");

});

button.addEventListener("mouseleave",function(){

button.classList.remove("hover");

});

});

/*==============================
REVEAL
==============================*/

const revealItems=document.querySelectorAll(

".hero-badge,.hero-title,.hero-description,.hero-buttons,.hero-features,.hero-image"

);

const observer=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

revealItems.forEach(function(item){

observer.observe(item);

});

/*==============================
COUNTER
==============================*/

const counters=document.querySelectorAll("[data-count]");

function runCounter(counter){

var end=parseInt(counter.dataset.count);

var value=0;

var speed=end/80;

var timer=setInterval(function(){

value+=speed;

if(value>=end){

value=end;

clearInterval(timer);

}

counter.textContent=Math.floor(value);

},20);

}

const counterObserver=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

runCounter(entry.target);

counterObserver.unobserve(entry.target);

}

});

});

counters.forEach(function(counter){

counterObserver.observe(counter);

});

/*==============================
SCROLL INDICATOR
==============================*/

const scrollBtn=document.querySelector(".hero-scroll");

if(scrollBtn){

scrollBtn.addEventListener("click",function(){

window.scrollTo({

top:hero.offsetHeight,

behavior:"smooth"

});

});

}

/*==============================
REDUCED MOTION
==============================*/

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

heroImage.style.animation="none";

floatingLeaves.forEach(function(item){

item.style.animation="none";

});

}

/*==============================
END
==============================*/

})();