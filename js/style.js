const sign = document.querySelector(".menu__link__sing")
const active = document.querySelector(".wrapper")
const closing = document.querySelector(".Signup__close");
const MenuBurger = document.querySelector(".NavBurger");
const MenuLeft = document.querySelector(".menu__list");
let thisburger = 1;



    MenuBurger.addEventListener('click', () => {

        MenuLeft.classList.add("Active");
        document.body.classList.add("hidden");
        if(thisburger % 2 == 0)
        {
            MenuLeft.classList.remove("Active");
            document.body.classList.remove("hidden");
        }
        thisburger= thisburger+1;
        console.log( thisburger)
    })




sign.addEventListener("click", () => {
    active.classList.add('active');
    MenuLeft.classList.remove("Active");
    document.body.classList.remove("hidden");
})
closing.addEventListener("click", () => {
    console.log("Work")
    active.classList.remove('active')
})
