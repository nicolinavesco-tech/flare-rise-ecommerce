let nav=document.querySelector("#nav");
let navLink=document.querySelectorAll(".nav-link");
let icon=document.querySelectorAll(".icon-right");
let imgLogo=document.querySelector(".logo");

window.addEventListener("scroll", ()=>{
    let scrolled=window.scrollY;
    if(scrolled>0){
        nav.classList.add("nav-custom2");
        navLink.forEach((link)=>{
            link.style.color="rgb(254,254,254)";
            link.addEventListener("mouseenter", ()=>{
                link.style.color="rgb(10,10,10)";
            })
            link.addEventListener("mouseleave",()=>{
                link.style.color="rgb(254,254,254)";
            })
        })
        icon.forEach((icona)=>{
            icona.style.color="rgb(254,254,254)";
            icona.addEventListener("mouseenter", ()=>{
                icona.style.color="rgb(10,10,10)";
            })
            icona.addEventListener("mouseleave", ()=>{
                icona.style.color="rgb(254,254,254)";
            })
        })
    }else{
        nav.classList.remove("nav-custom2");
        navLink.forEach((link)=>{
            link.style.color="rgb(10,10,10)";
            link.addEventListener("mouseenter",()=>{link.style.color="rgb(10,10,10)"})
            link.addEventListener("mouseleave",()=>{link.style.color="rgb(10,10,10)"})
        })
        icon.forEach((icona)=>{
            icona.style.color="rgb(10,10,10)";
            icona.addEventListener("mouseenter",()=>{icona.style.color="rgb(10,10,10)"})
            icona.addEventListener("mouseleave",()=>{icona.style.color="rgb(10,10,10)"})
        })

    }
})