document.addEventListener("DOMContentLoaded", () => {
    const $menuBtn = document.getElementById("menu-btn");
    const $closeBtn = document.getElementById("close-btn");
    const $body = document.body;
    
    const $menuLinks = document.querySelectorAll(".menu-item a[data-target]");
    const $sections = document.querySelectorAll(".content-section");

    $menuBtn.addEventListener("click", () => {
        $body.classList.add("show-menu");
        $closeBtn.textContent = "Hide";
    });

    $menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");
            const $targetSection = document.getElementById(targetId);

            if ($targetSection) {
                $sections.forEach(s => s.classList.remove("visible"));
                
                $targetSection.classList.add("visible");
                
                $body.classList.add("section-open");

                $closeBtn.textContent = "Back";
            }
        });
    });

    $closeBtn.addEventListener("click", () => {
        if ($body.classList.contains("section-open")) {
            
            const $visibleSection = document.querySelector(".content-section.visible");
            if ($visibleSection) $visibleSection.classList.remove("visible");
            
            $body.classList.remove("section-open");
            
            $closeBtn.textContent = "Hide";

        } else {
            $body.classList.remove("show-menu");
        }
    });
});