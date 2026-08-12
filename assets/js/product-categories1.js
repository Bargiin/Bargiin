/*==================================================
BARGIIN
PRODUCT-CATEGORIES.JS
==================================================*/

(function(){

"use strict";

var section=document.querySelector(".product-categories");

if(!section) return;

/*==============================
REVEAL CARDS
==============================*/

var cards=section.querySelectorAll(".category-card");

var observer=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

cards.forEach(function(card){

observer.observe(card);

});


/*==============================
STAGGER EFFECT
==============================*/

cards.forEach(function(card,index){

card.style.transitionDelay=(index*0.15)+"s";

});


/*==============================
PARALLAX IMAGES
==============================*/

cards.forEach(function(card){

var image=card.querySelector("img");

if(!image) return;

card.addEventListener("mousemove",function(e){

var rect=card.getBoundingClientRect();

var x=((e.clientX-rect.left)/rect.width-.5)*8;

var y=((e.clientY-rect.top)/rect.height-.5)*8;

image.style.transform=

"scale(1.08) translate("+x+"px,"+y+"px)";

});

card.addEventListener("mouseleave",function(){

image.style.transform="scale(1)";

});

});


/*==============================
KEYBOARD ACCESSIBILITY
==============================*/

cards.forEach(function(card){

card.addEventListener("focus",function(){

card.classList.add("active");

});

card.addEventListener("blur",function(){

card.classList.remove("active");

});

});

/*==============================
CARD GLOW EFFECT
==============================*/

cards.forEach(function(card){

card.addEventListener("mousemove",function(e){

var rect=card.getBoundingClientRect();

var x=e.clientX-rect.left;

var y=e.clientY-rect.top;

card.style.setProperty("--mouse-x",x+"px");

card.style.setProperty("--mouse-y",y+"px");

});

});


/*==============================
IMAGE FLOAT
==============================*/

cards.forEach(function(card){

var image=card.querySelector(".category-image img");

if(!image) return;

var t=0;

setInterval(function(){

if(card.matches(":hover")) return;

t+=0.03;

image.style.transform="translateY("+(Math.sin(t)*4)+"px)";

},30);

});


/*==============================
BUTTON ARROW
==============================*/

var links=section.querySelectorAll(".category-link");

links.forEach(function(link){

link.addEventListener("mouseenter",function(){

var icon=this.querySelector("i");

if(icon){

icon.style.transform="translateX(-8px)";

}

});

link.addEventListener("mouseleave",function(){

var icon=this.querySelector("i");

if(icon){

icon.style.transform="translateX(0)";

}

});

});


/*==============================
LAZY LOADING CHECK
==============================*/

var images=section.querySelectorAll("img");

images.forEach(function(img){

img.addEventListener("load",function(){

this.classList.add("loaded");

});

});


/*==============================
REDUCED MOTION
==============================*/

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

cards.forEach(function(card){

card.style.transition="none";

});

}


/*==============================
END
==============================*/

})();