const $menuBtn = document.getElementById("menu-btn");
const $closeBtn = document.getElementById("close-btn");
const $body = document.body;

$menuBtn.addEventListener("click", () => {
    $body.classList.add("show-menu");
});

$closeBtn.addEventListener("click", () => {
    $body.classList.remove("show-menu");
});