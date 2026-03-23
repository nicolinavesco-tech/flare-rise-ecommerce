let nav = document.querySelector("#nav")
let navlink = document.querySelectorAll(".nav-link")
let imglogo = document.querySelector(".logo")
let icon = document.querySelectorAll(".icon-right")
// console.dir(imglogo);


window.addEventListener("scroll", () => {

    let scrolled = window.scrollY;
    console.log(scrolled);

    if (scrolled > 0) {
        nav.classList.add("nav-custom2");

        navlink.forEach((link) => {
            link.style.color = "rgb(254,254,254)";
            link.addEventListener("mouseenter", () => {
                link.style.color = "rgb(10,10,10)"
            })
            link.addEventListener("mouseleave", () => {
                link.style.color = "rgb(254,254,254)";
            })
        })
        icon.forEach((icona) => {

            icona.style.color = "rgb(254,254,254)";
            icona.addEventListener("mouseenter", () => {
                icona.style.color = "rgb(10,10,10)"
            })
            icona.addEventListener("mouseleave", () => {
                icona.style.color = "rgb(254,254,254)";
            })
        })
    } else {
        nav.classList.remove("nav-custom2");
        navlink.forEach((link) => {
            link.style.color = "rgb(10,10,10)";
            link.addEventListener("mouseenter", () => { link.style.color = "rgb(10,10,10)" })
            link.addEventListener("mouseleave", () => { link.style.color = "rgb(10,10,10)" })
        })
        icon.forEach((icona) => {
            icona.style.color = "rgb(10,10,10)";
            icona.addEventListener("mouseenter", () => { icona.style.color = "rgb(10,10,10)" })
            icona.addEventListener("mouseleave", () => { icona.style.color = "rgb(10,10,10)" })
        })
    }

})



let primoNumero = document.querySelector("#primoNumero")
let secondoNumero = document.querySelector("#secondoNumero")
let terzoNumero = document.querySelector("#terzoNumero")

function createInterval(number, element, timing) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < number) {
            counter++
            element.innerHTML = counter;
        } else {
            clearInterval(interval);

        }
    }, timing)

}
// createInterval(1000, primoNumero, 10);
// createInterval(2000, secondoNumero, 5);
// createInterval(100, terzoNumero, 100);

let confirm = false
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm == false) {
            createInterval(1000, primoNumero, 10);
            createInterval(2000, secondoNumero, 5);
            createInterval(100, terzoNumero, 100)
            confirm = true;
        }
    })

})
observer.observe(primoNumero)

// First section

let cardWrapper = document.querySelector("#cardWrapper")
let productCards = [
    {
        image: "./media/running.png",
        text: "Running",
        link: "#running"
    },
    {
        image: "./media/giacche.jpg",
        text: "Giache",
        link: "#giacche"
    },
    {
        image: "./media/classic.jpg",
        text: "Classic",
        link: "#classic"
    },
    {
        image: "./media/outdoor.jpg",
        text: "Outdoor",
        link: "#outdoor"
    },
    {
        image: "./media/scarpe.jpg",
        text: "Scarpe",
        link: "#scarpe"
    },
    {
        image: "./media/sport.jpg",
        text: "Sport",
        link: "#sport"
    },


]

productCards.forEach((product) => {
    let div = document.createElement("div");
    div.classList.add("col-6", "col-md-2", "p-0", "d-flex", "justify-content-center", "card-query");
    div.innerHTML = `
            <div class="card cardsection1 d-flex justify-content-center align-items-center">
            <img src="${product.image}" class="card-img-top" alt="...">
            <a href="${product.link}" class="text-card">${product.text}</a>
            </div>

    `
    cardWrapper.appendChild(div);
})


// Second section

let carouselWrapper = document.querySelector("#carousel-wrapper")
let productCarousel = [
    {
        image: ["./media/img1carousel.jpg", "./media/img2carousel.jpg"],
        title: "Si parte",
        text: "Approfitta di uno scono extra di 10% con il codice EXTRA10",
        button: `<button class="cta">
                   <span class="hover-underline-animation fw-bold"> Acquista ora </span>
                     <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30"
                        height="10" viewBox="0 0 46 16">
                        <path id="Path_10" data-name="Path 10"
                         d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        transform="translate(30)"></path>
                    </svg>
                  </button>`
    },
    {
        image: ["./media/img3carousel.jpg", "./media/img4carousel.jpg"],
        title: "",
        text: "",
        button: ""
    },
    {
        image: ["./media/img5carousel.jpg", "./media/img6carousel.jpg"],
        title: "",
        text: "",
        button: ""
    },
]

productCarousel.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("col-4", "col-md-4", "p-0");
    div.innerHTML = `
         <div id="carouselExampleInterval" class="carousel slide d-none d-md-block" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="3000" >
                                <img src="${element.image[0]}" class="d-block img-carousel " alt="...">
                                <div class="carousel-caption d-none d-md-flex flex-column align-items-start">
                                    <h2 class="fs-1 text-black bg-white">${element.title}</h2>
                                    <p class="text-start text-black bg-white">${element.text}</p>
                                    <!-- Button Open Source -->
                                     <!-- From Uiverse.io by alexmaracinaru -->
                                    ${element.button}
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="3000">
                                <img src="${element.image[1]}" class="d-block img-carousel" alt="...">
                                <div class="carousel-caption d-none d-md-flex flex-column align-items-start">
                                    <h2 class="fs-1 text-black bg-white">${element.title}</h2>
                                    <p class="text-start text-black bg-white">${element.text}</p>
                                   ${element.button}
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                            <span class="visually-hidden">Next</span>
                        </button>
                </div>
    `
    carouselWrapper.appendChild(div);
})

// Third section
//1. Creazione card 

let cardSection3 = document.querySelector("#card-3-section");
let productCarouselInner = document.querySelector("#productCarouselInner");
let productSection3 = [
    {
        image: "./media/shoescard1.png",
        text: "68€",
        title: "Scarpe Old Skool",
        class: "flex-row"

    },
    {
        button: "",
        image: "./media/shoescard2.png",
        text: "50 €",
        title: "Scarpe Hylane"
    },
    {
        button: "",
        image: "./media/shoescard3.png",
        text: "68 €",
        title: "Scarpe classic Slip-On"
    },
    {
        image: "./media/shoescard4.png",
        text: "30 €",
        title: "Scarpe Sk8-Hi",
        class: "flex-row-reverse"
    },
]
productCarouselInner.innerHTML = "";

let slide = document.createElement("div");
slide.classList.add("carousel-item", "active");

let row = document.createElement("div");
row.classList.add("row", "justify-content-center");

productSection3.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-sm-6", "col-lg-3", "p-0", "container-card");
    div.innerHTML = `
                <div class="card card-third-section">
                <div class="img-wrapper d-flex align-items-center justify-content-center">
                    <img src="${el.image}" class="card-img-top card1section img4-card" alt="${el.title}">
                </div>
                <div class="card-body">
                    <p class="card-text fw-bold">${el.text}</p>
                    <p class="card-title">${el.title}</p>
                </div>
            </div>
        `
    row.appendChild(div);
    
});
slide.appendChild(row);
productCarouselInner.appendChild(slide);


