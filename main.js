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
creatInterval(numArticle,500,20)
creatInterval(numUsers,1000,10)
creatInterval(numRec,200,50)