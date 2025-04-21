document.addEventListener("DOMContentLoaded", () => {
    const $menuBtn = document.getElementById("menu-btn");
    const $body = document.body;
    const sections = document.querySelectorAll(".section");
    
    $menuBtn.addEventListener("click", () => {
        $body.classList.toggle("show-menu");
    });

    document.querySelectorAll(".menu-item a").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
    
          const targetId = link.getAttribute("href").substring(1);
          sections.forEach(sec => {
            sec.style.display = sec.id === targetId ? "flex" : "none";
          });
    
          $body.classList.remove("show-menu");
        });
      });
});