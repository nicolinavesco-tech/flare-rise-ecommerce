
let nav = document.querySelector("#nav")
let navLink = document.querySelectorAll(".nav-link")
let imgLogo = document.querySelector(".logo")
let icon = document.querySelectorAll(".icon-right")



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
            icona.style.color = "rgb(254,254,254)";
            icona.addEventListener("mouseenter", () => {
                icona.style.color = "rgb(10,10,10)";
            })
            icona.addEventListener("mouseleave", () => {
                icona.style.color = "rgb(254,254,254)";
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

// ragionamento:
// quando utente clicca su mostra filtri le card si trasformano da col-md-12 a col-md-10
// dare un id al div che contiene le colonne con dentro le card e catturarlo  poi devo utilizzare addEventListener con il click 
// importantissimo!!!! --> chi gestisce il click? Il button quindi è importante catturare il button addEventListener usarlo per il button
// creare la classList.add e li do la condizione che al click add col-md-10 else con il remove si rimuove la col-10 
// reminder: però bisogna specificare che la collonna contiene col-md-12 poi nell'if si da la condizione che se contiene col-md-12 allora prima rimuovi col-md-12 poi aggiungi col-md-10 e nell'else il contrario.
// Un altra cosa IMPORTANTE: in questo caso se let filterBtn si trova per primo non funziona l'addEventListener quindi attenzione filterBtn x secondo poi subito addEventListener che lo richiama


let cardShop = document.querySelector("#shopCard")
let filterBtn = document.querySelector("#filterBtn")


filterBtn.addEventListener("click", function () {
    let confirm = cardShop.classList.contains("col-md-12")


    if (confirm) {
        cardShop.classList.remove("col-md-12")
        cardShop.classList.add("col-md-10")
        filterBtn.innerHTML = `Nascondi filtri <i class="bi bi-filter"></i>`

    } else {
        cardShop.classList.remove("col-md-10")
        cardShop.classList.add("col-md-12")
        filterBtn.innerHTML = `Mostra filtri <i class="bi bi-filter"></i>`
    }

});

let categoryWrapper = document.querySelector("#categoryWrapper")
let cardsJson = document.querySelector("#cardsJson")
let priceInput = document.querySelector("#priceInput")
let priceNumber = document.querySelector("#priceNumber")
let wordInput = document.querySelector("#wordInput")
let searchBar = document.querySelector("#searchBar")



fetch("./annunci.json").then((response) => response.json()).then((data) => {

    function setCategoryFilter() {
        let categories = data.map((annuncio) => annuncio.category)
        let uniqueCategory = [];
        categories.forEach((categoria) => {
            if (!uniqueCategory.includes(categoria)) {
                uniqueCategory.push(categoria);
            }

        })
        uniqueCategory.forEach((categoria) => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `<input class="form-check-input" type="radio" name="category" id="${categoria}"> 
                                    <label class="form-check-label" for="${categoria}">
                                        ${categoria}
                                    </label>`
            categoryWrapper.appendChild(div)
        })

    }
    setCategoryFilter();


    function showCards(array) {
        array.sort((a, b) => b.price - a.price);
        cardsJson.innerHTML = ""
        array.forEach((annuncio) => {
            let div = document.createElement("div");
            div.classList.add("col-6", "col-md-4")
            div.innerHTML = `
            <div class="card my-2 mb-5 card-shop">
                <img src=${annuncio.image} class="card-img-top" alt="...">
               <div class="card-body card-shop">
                  <h5 class="card-title">${annuncio.name}</h5>
                   <p class="card-text">${annuncio.price} €</p>
                   <div class= "mt-auto">
                     <a href="#" class="btn btn-secondary">Acquista<i class="bi bi-cart-plus"></i></a>
                   </div>
                </div>
            </div>
            `
            cardsJson.appendChild(div);
        })
    }

    // showCards(data);

    let radios = document.querySelectorAll(".form-check-input")
    function filterByCategory() {
        let checked = Array.from(radios).find((button) => button.checked);
        let categoria = checked.id;
        if (categoria != "all") {
            let filtered = data.filter((annuncio) => annuncio.category == categoria)
            showCards(filtered);
        } else {
            showCards(data);
        }

    }
    filterByCategory()

    radios.forEach((button) => {
        button.addEventListener("click", () => {
            filterByCategory();
        })
    })



    function setPriceInput() {
        let maxPrice = data[0].price;
        priceInput.max = maxPrice
        priceInput.value = maxPrice;
        priceNumber.innerHTML = maxPrice;
        let dataReverse = data.reverse();
        let minPrice = dataReverse[0].price
        priceInput.min = Math.ceil(+minPrice);


    }
    setPriceInput()

    priceInput.addEventListener("input", () => {
        priceNumber.innerHTML = priceInput.value;
        filterByPrice()
    })

    function filterByPrice() {
        let filtered = data.filter((annuncio) => +annuncio.price <= +priceInput.value)
        showCards(filtered)
    }


    wordInput.addEventListener("input", () => {
        filterByWord()

    })

    function filterByWord() {

        let filtered = data.filter((annuncio) =>
            annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))

        showCards(filtered)
    }
    //    filtro parola sulla search bar
    searchBar.addEventListener("input", () => {
        filterSearchBar();
    })
    function filterSearchBar() {
        let query = searchBar.value.toLowerCase();
        let filtered = data.filter((annuncio) =>
            annuncio.name?.toLowerCase().includes(query) ||
            annuncio.category?.toLowerCase().includes(query))
        showCards(filtered);
    }

})





