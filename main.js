/* SEZIONE NAVBAR SCROLL */
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("navbar_scrolled")
    }else{
        navbar.classList.remove("navbar_scrolled")

    }
})

/* SEZIONE DEI NUMERI */
let numUsers = document.querySelector("#numUsers");
let numArticle = document.querySelector("#numArticle");
let numRec = document.querySelector("#numRec");

/* FUNZIONE GENERICA PER I NUMERI */
function creatInterval(elementId,finalNumber , frequency){
    let counter = 0
    let intervallo =setInterval(() => {
        if(counter < finalNumber){
            counter++
            elementId.innerHTML = counter
        }else {
            clearInterval(intervallo)
        }
    }, frequency);
}

/* INTERSECTION OBSERVER SUI NUMERI */
let paragone = false;

let intersecato = new IntersectionObserver( (entries)=>{
    entries.forEach( (entries)=>{
        if(entries.isIntersecting && paragone == false){ /* serve quando sia è stato intersecato sia che la variabile è false */
        creatInterval(numArticle,500,20)
        creatInterval(numUsers,1000,10)
        creatInterval(numRec,200,50)
        paragone = true;  /* questo permette che non torni piu false e quindi i numeri non si riprendono piu  */
        setTimeout(() => {
            paragone = false; /* qui sfrutto la variabile paragone che dopo 10 secondi si reimposta false e riparte la funzione se viene intersecato*/
        }, 10000);
    }
} )
} )

intersecato.observe(numArticle)

/* SEZIONE ARRAY DI OGGETTI */

let announcements = [
    {name: "Katana di Hattori Hanzo", categoria: "Accessori", prezzo: 500, img: "https://picsum.photos/200"},
    {name: "Vaso Ming", categoria: "Arredamento", prezzo: 700, img: "https://picsum.photos/201"},
    {name: "Statua di terracotta", categoria: "Arredamento", prezzo: 650, img: "https://picsum.photos/202"},
    {name: "Quadro di Buddha", categoria: "Arredamento", prezzo: 350, img: "https://picsum.photos/203"},
    {name: "Guqin", categoria: "Musica", prezzo: 1000, img: "https://picsum.photos/204"},
];


let card_wrapper = document.querySelector("#card_wrapper")

announcements.forEach( (object ,i)=>{
    if(i >= announcements.length -3 ){
        let div = document.createElement("div");
        div.classList.add("col-11" ,"mb-3", "col-lg-3");
        div.innerHTML = `
        <div class="card position-relative h-100">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-2">
        NEW
        </span>
        <div class="overflow-hidden">
        <img src=${object.img} class=" img_card card-img-top" alt="...">
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title text-center fw-bold">${object.name}</h3>
        <p class="card-text">Categoria: <span class="fs-4">${object.categoria}</span></p>
        <p class="card-text">Prezzo: <span class="fs-4">${object.prezzo}</span></p>
        <div class="d-flex justify-content-between">
        <i class="bi bi-heart fs-3"></i>
        <a href="#" class="my_btn text-decoration-none text-dark">Aggiungi al Carello</a>
        </div>
        </div>
        </div>
        </div>
        `
        card_wrapper.appendChild(div)
    }
} )
