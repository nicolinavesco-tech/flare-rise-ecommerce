// Navbar

let nav = document.querySelector("#nav");
let navLink = document.querySelectorAll(".nav-link");
let icon = document.querySelectorAll(".icon-right");
let imgLogo = document.querySelector(".logo");


window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        nav.classList.add("nav-custom2");
        navLink.forEach((link) => {
            link.style.color = "rgb(254,254,254)"
            link.addEventListener("mouseenter", () => {
                link.style.color = "rgb(10,10,10)"
            })

            link.addEventListener("mouseleave", () => {
                link.style.color = "rgb(254,254,254)"
            })
        })
        icon.forEach((icona) => {
            icona.style.color = "rgb(254,254,254)"
            icona.addEventListener("mouseenter", () => {
                icona.style.color = "rgb(10,10,10)"
            })

            icona.addEventListener("mouseleave", () => {
                icona.style.color = "rgb(254,254,254)"
            })
        })

    } else {
        nav.classList.remove("nav-custom2");
        navLink.forEach((link) => {
            link.style.color = "rgb(10,10,10)"
            link.addEventListener("mouseenter", () => { link.style.color = "rgb(10,10,10)" })
            link.addEventListener("mouseleave", () => { link.style.color = "rgb(10,10,10)" })
        })
        icon.forEach((icona) => {
            icona.style.color = "rgb(10,10,10)"
            icona.addEventListener("mouseenter", () => { icona.style.color = "rgb(10,10,10)" })

            icona.addEventListener("mouseleave", () => { icona.style.color = "rgb(10,10,10)" })
        })

    }

})

let collapseCategorie = document.querySelector("#collapseCategorie");
let priceInput = document.querySelector("#priceInput");
let wordInput = document.querySelector("#wordInput");
let collapseTaglie = document.querySelector("#collapseTaglie");
let showCard = document.querySelector("#showCard");
let searchBar = document.querySelector("#searchBar");


fetch("./woman.json").then((response) => response.json()).then((info) => {
    function setCategoryFilter() {
        let categories = info.map((filtro) => filtro.category)
        let uniqueCategory = [];
        categories.forEach((categoria) => {
            if (!uniqueCategory.includes(categoria)) {
                uniqueCategory.push(categoria);
            }
        })
        let cardBody = collapseCategorie.querySelector(".card-body");
        uniqueCategory.forEach((categoria) => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `<input class="form-check-input" type="radio" name="category" id="${categoria}"> 
                                    <label class="form-check-label" for="${categoria}">
                                        ${categoria}
                                    </label>`
            cardBody.appendChild(div);
        })
    }
    setCategoryFilter();

    function showCards(array) {
        array.sort((a, b) => b.price - a.price);
        showCard.innerHTML = "";
        array.forEach((filtro) => {
            let div = document.createElement("div");
            div.classList.add("col-6", "col-md-3");
            div.innerHTML = `<div class="card my-2 mb-5 mt-4 card-woman">
                                <img src=${filtro.image} class="card-img-woman" alt="...">
                                <div class="card-body card-woman">
                                    <h5 class="card-title">${filtro.name}</h5>
                                    <p class="card-text">${filtro.price} €</p>
                                    <div class= "mt-auto">
                                    <a href="#" class="btn btn-secondary">Acquista<i class="bi bi-cart-plus"></i></a>
                                    </div>
                                </div>
                            </div>`
            showCard.appendChild(div);
        })

    }
    // showCards(info);

    let radios = document.querySelectorAll(".form-check-input");
    function filterByCategory() {
        let checked = Array.from(radios).find((button) => button.checked);
        let categoria = checked.id;
        if (categoria != "all") {
            let filtered = info.filter((filtro) => filtro.category == categoria);
            showCards(filtered);
        } else {
            showCards(info);
        }
    }
    filterByCategory();

    radios.forEach((button) => {
        button.addEventListener("click", () => {
            filterByCategory();
        })
    })

    function setPriceInput() {
        let maxPrice = info[0].price;
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceNumber.innerHTML = maxPrice + " €";
        let infoReverse = info.reverse();
        let minPrice = infoReverse[0].price;
        priceInput.min = Math.ceil(+minPrice);
        minNumber.innerHTML = minPrice + " €";
    }
    setPriceInput();

    priceInput.addEventListener("input", () => {
        priceNumber.innerHTML = priceInput.value + " €";
        minNumber.innerHTML = priceInput.value + " €";

        filterByPrice();
    })

    function filterByPrice() {
        let filtered = info.filter((annuncio) => +annuncio.price <= +priceInput.value);
        showCards(filtered);
    }

    wordInput.addEventListener("input", () => {
        filterByWord();
    })

    function filterByWord() {
        let filtered = info.filter((annuncio) =>
            annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))
        showCards(filtered);
    }
    //   filtro parola sulla search bar
    searchBar.addEventListener("input", () => {
        filterSearchBar();
    })

    function filterSearchBar() {
        let query = searchBar.value.toLowerCase();
        let filtered = info.filter((annuncio) =>
            // in questo caso il "?"" serve per far capire al programma che se non trova name passa oltre e senza "?" il codice non viene eseguito corettamente e non trova la richiesta fatta
            annuncio.name?.toLowerCase().includes(query) ||
            annuncio.category?.toLowerCase().includes(query) ||
            annuncio.macroCategory?.toLowerCase().includes(query));
        showCards(filtered);
    }

    // function filterBySize() {
    //     let uniqueSize = [];
    //     info.forEach((misura) => {
    //         if (!uniqueSize.includes(misura)) {
    //             uniqueSize.push(misura)
    //         }
    //     })
    //     let macroCategories = [];

    //     info.forEach((prodotto) => {
    //         if (!macroCategories.includes(prodotto.macroCategory)) {
    //             macroCategories.push(prodotto.macroCategory);
    //         }
    //     });

    //     let cardSize = document.querySelector(".card-size");
    //     uniqueSize.forEach((misura) => {
    //         let div = document.createElement("div");
    //         div.classList.add("form-floating");
    //         div.innerHTML = `  <div class="col-md">
    //                                 <div class="form-floating">
    //                                     <select class="form-select" id="floatingSelectGrid">
    //                                         <option selected>${prodotto}</option>
    //                                         <option value="Size">${misura}</option>
    //                                     </select>
    //                                 </div>
    //                             </div>`
    //         cardSize.appendChild(div);
    //     })
    // }

})