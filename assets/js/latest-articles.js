"use strict";

/*==================================
LATEST ARTICLES
==================================*/

const articleCards=document.querySelectorAll(".article-card");

if(articleCards.length){

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.2

    });

    articleCards.forEach((card,index)=>{

        card.style.transitionDelay=`${index*120}ms`;

        observer.observe(card);

    });

}


/*==================================
IMAGE PARALLAX
==================================*/

window.addEventListener("scroll",()=>{

    articleCards.forEach(card=>{

        const img=card.querySelector("img");

        if(!img) return;

        const rect=card.getBoundingClientRect();

        const speed=rect.top*0.03;

        img.style.transform=`translateY(${speed}px)`;

    });

});


/*==================================
BUTTON EFFECT
==================================*/

document.querySelectorAll(".article-link").forEach(link=>{

    link.addEventListener("mouseenter",()=>{

        link.classList.add("hover");

    });

    link.addEventListener("mouseleave",()=>{

        link.classList.remove("hover");

    });

});