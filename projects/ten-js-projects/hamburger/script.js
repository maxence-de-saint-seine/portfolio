const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    console.log('ok');
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});