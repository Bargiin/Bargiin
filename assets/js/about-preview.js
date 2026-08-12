"use strict";

/*==================================
ABOUT PREVIEW
==================================*/

const aboutSection=document.querySelector(".about-preview");

if(aboutSection){

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                aboutSection.classList.add("show");

                observer.unobserve(aboutSection);

            }

        });

    },{

        threshold:.25

    });

    observer.observe(aboutSection);

}


/*==================================
FEATURE ITEMS
==================================*/

const aboutFeatures=document.querySelectorAll(".about-feature");

aboutFeatures.forEach((item,index)=>{

    item.style.transitionDelay=`${index*150}ms`;

});


/*==================================
PARALLAX IMAGE
==================================*/

const aboutImage=document.querySelector(".about-image img");

window.addEventListener("scroll",()=>{

    if(!aboutImage) return;

    const rect=aboutImage.getBoundingClientRect();

    const speed=rect.top*0.04;

    aboutImage.style.transform=`translateY(${speed}px)`;

});


/*==================================
BUTTON HOVER
==================================*/

const aboutBtn=document.querySelector(".about-btn");

if(aboutBtn){

    aboutBtn.addEventListener("mouseenter",()=>{

        aboutBtn.classList.add("hover");

    });

    aboutBtn.addEventListener("mouseleave",()=>{

        aboutBtn.classList.remove("hover");

    });

}