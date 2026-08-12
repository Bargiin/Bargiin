/*==================================================
BARGIIN
FEATURED-HERB.JS
==================================================*/

(function(){

"use strict";

var section=document.querySelector(".featured-herb");

if(!section) return;


/*==============================
REVEAL
==============================*/

var items=section.querySelectorAll(

".featured-herb-image,.featured-herb-content"

);

var observer=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.2
});

items.forEach(function(item){

observer.observe(item);

});


/*==============================
FLOAT IMAGE
==============================*/

var image=section.querySelector(".featured-herb-image img");

if(image){

window.addEventListener("mousemove",function(e){

var x=(e.clientX/window.innerWidth-.5)*10;

var y=(e.clientY/window.innerHeight-.5)*10;

image.style.transform="translate("+x+"px,"+y+"px)";

});

}


/*==============================
FLOAT LABEL
==============================*/

var label=section.querySelector(".herb-floating-label");

if(label){

var t=0;

setInterval(function(){

t+=0.04;

label.style.transform="translateY("+(Math.sin(t)*6)+"px)";

},30);

}


/*==============================
BENEFITS HOVER
==============================*/

var cards=section.querySelectorAll(".benefit-item");

cards.forEach(function(card){

card.addEventListener("mouseenter",function(){

this.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",function(){

this.style.transform="translateY(0)";

});

});

/*==============================
PARALLAX SECTION
==============================*/

window.addEventListener("scroll",function(){

    var y=window.pageYOffset;

    var circle=section.querySelector(".herb-background-circle");

    if(circle){

        circle.style.transform=
        "translateY("+(y*0.08)+"px)";

    }

});


/*==============================
BUTTON EFFECT
==============================*/

var button=section.querySelector(".herb-more-btn");

if(button){

button.addEventListener("mouseenter",function(){

this.classList.add("hover");

});

button.addEventListener("mouseleave",function(){

this.classList.remove("hover");

});

}


/*==============================
IMAGE TILT
==============================*/

var wrapper=section.querySelector(".featured-herb-image");

if(wrapper && image){

wrapper.addEventListener("mousemove",function(e){

var rect=wrapper.getBoundingClientRect();

var x=((e.clientX-rect.left)/rect.width-.5)*10;

var y=((e.clientY-rect.top)/rect.height-.5)*10;

image.style.transform=
"perspective(1000px) rotateY("+x+"deg) rotateX("+(-y)+"deg)";

});

wrapper.addEventListener("mouseleave",function(){

image.style.transform="perspective(1000px) rotateY(0deg) rotateX(0deg)";

});

}


/*==============================
ICON PULSE
==============================*/

var icons=section.querySelectorAll(".benefit-icon");

icons.forEach(function(icon){

setInterval(function(){

icon.animate(

[

{transform:"scale(1)"},

{transform:"scale(1.08)"},

{transform:"scale(1)"}

],

{

duration:1800,

iterations:1

}

);

},3000);

});


/*==============================
LAZY ANIMATION
==============================*/

var benefitObserver=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("show");

benefitObserver.unobserve(entry.target);

}

});

},{

threshold:.15

});

cards.forEach(function(card){

benefitObserver.observe(card);

});


/*==============================
KEYBOARD ACCESSIBILITY
==============================*/

button?.addEventListener("focus",function(){

this.classList.add("hover");

});

button?.addEventListener("blur",function(){

this.classList.remove("hover");

});


/*==============================
END
==============================*/

})();


