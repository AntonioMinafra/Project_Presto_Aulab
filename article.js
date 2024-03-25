/* SEZIONE NAVBAR SCROLL */
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("navbar_scrolled")
    }else{
        navbar.classList.remove("navbar_scrolled")

    }
})

/* INIZIO FECTH */
fetch("./articles.JSON").then( (response)=> response.json()).then( (data)=> {

let articlesWrapper = document.querySelector("#articlesWrapper");

function createArticles(array) {
    articlesWrapper.innerHTML= ""
    array.forEach( (articolo ,i)=> {
        let col = document.createElement("div");
        col.classList.add("col-8", "col-lg-3", "my-3", "mx-1")
        col.innerHTML = `
                        <div class="card position-relative h-100">
                            <div class="overflow-hidden">
                                <img src="https://picsum.photos/20${i}"class=" img_card card-img-top" alt="...">
                            </div>
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h3 class="card-title text-center fw-bold">${articolo.nome}</h3>
                                <p class="card-text">Categoria: <span class="fs-4">${articolo.categoria}</span></p>
                                <p class="card-text">Prezzo: <span class="fs-4">${articolo.prezzo}</span></p>
                            <div class="d-flex justify-content-between">
                                <i class="bi bi-heart fs-3"></i>
                                <a href="#" class="my_btn text-decoration-none text-dark">Aggiungi al Carello</a>
                            </div>
                            </div>
                            </div>
                        </div>
        `
        articlesWrapper.appendChild(col)
    });
}
createArticles(data);

/* CREAZIONE CATEGORIE IN UN ARRAY */
let radioWrapper = document.querySelector("#radioWrapper")

function setCategories(){
    let categories = data.map( (el)=> el.categoria);
    let uniqueCategories = [];
    categories.forEach( (category)=>{
        if(uniqueCategories.includes( category) == false){
            uniqueCategories.push(category);
        }
    })
    uniqueCategories.sort().forEach( (categoria)=>{
        let div = document.createElement("div");
        div.classList.add("form-check")
        div.innerHTML = `
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${categoria}
                            </label>
                    `
        radioWrapper.appendChild(div)
    })
}
setCategories()

/* FILTRI PER CATEROGIE */
let cheksInput = document.querySelectorAll(".form-check-input")

function filteredByCategory() {
    let radiosBtn = Array.from(cheksInput)/* questo forza i dati e li mette in un array*/
    let checked = radiosBtn.find( (el)=> el.checked)
    if(checked.id == "All"){
        createArticles(data)/* condizione che se il cheked (cioe l input) è all allora mi stampa le card di data cioe tutte altrimenti mi stampa l array filtered filtrato per categorie */
    }else {
        let filtered = data.filter( (el)=> el.categoria == checked.id)
        createArticles(filtered)
    }
}

/* CREO L EVENTO AL RADIO */

cheksInput.forEach( (input)=>{
    input.addEventListener("input", ()=>{
        filteredByCategory()
    })
} )


/* FILTRO PER PREZZO */

let inputPrice = document.querySelector("#inputPrice");
let currentValue = document.querySelector("#currentValue");

function maxAndMinPrice() {
    let prices = data.map( (articolo)=> articolo.prezzo );
    let min = Math.min(...prices)
    let max = Math.max(...prices)
    inputPrice.max = max
    inputPrice.min = min
    currentValue.innerHTML = max
}
maxAndMinPrice()

/* ATTIVAZIONE FILTRO PREZZO */
function filteredByPrice(){
    let filtered = data.filter( (el)=> el.prezzo <= inputPrice.value )
    createArticles(filtered)
}

inputPrice.addEventListener("input" , ()=>{
    currentValue.innerHTML = inputPrice.value
    filteredByPrice()
})

/* FILTRO PER NOME */
let inputWord = document.querySelector("#inputWord")

function filteredByWord() {
    let filtered = data.filter( (el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()))
    createArticles(filtered)
}

inputWord.addEventListener("input", ()=> {
    filteredByWord()
})


})
/* FINE FECTH */
