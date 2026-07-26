document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".app-tab");
    const dots = document.querySelectorAll(".app-dot");
    const panels = document.querySelectorAll(".app-panel");
    const panelOrder = Array.from(panels).map((panel) => panel.dataset.panel);
    const stage = document.querySelector(".app-stage");
    const prevArrow = document.querySelector(".app-nav-prev");
    const nextArrow = document.querySelector(".app-nav-next");

    const goToPanel = (target) => {

        tabs.forEach((t) => {

            t.classList.toggle("active", t.dataset.tab === target);

        });

        dots.forEach((d) => {

            d.classList.toggle("active", d.dataset.tab === target);

        });

        panels.forEach((panel) => {

            panel.classList.toggle("active", panel.dataset.panel === target);

        });

    };

    const step = (direction) => {

        const currentIndex = panelOrder.indexOf(document.querySelector(".app-panel.active").dataset.panel);
        const nextIndex = (currentIndex + direction + panelOrder.length) % panelOrder.length;

        goToPanel(panelOrder[nextIndex]);

    };

    tabs.forEach((tab) => {

        tab.addEventListener("click", () => goToPanel(tab.dataset.tab));

    });

    dots.forEach((dot) => {

        dot.addEventListener("click", () => goToPanel(dot.dataset.tab));

    });

    if(prevArrow) prevArrow.addEventListener("click", () => step(-1));
    if(nextArrow) nextArrow.addEventListener("click", () => step(1));

    if(stage){

        let touchStartX = null;

        stage.addEventListener("touchstart", (e) => {

            touchStartX = e.changedTouches[0].clientX;

        }, { passive: true });

        stage.addEventListener("touchend", (e) => {

            if(touchStartX === null) return;

            const deltaX = e.changedTouches[0].clientX - touchStartX;

            if(Math.abs(deltaX) > 40){

                step(deltaX < 0 ? 1 : -1);

            }

            touchStartX = null;

        });

    }

    const firstFrame = document.querySelector(".app-panel.active .app-frame");

    if(firstFrame){

        firstFrame.classList.add("app-frame-nudge");
        firstFrame.addEventListener("animationend", () => firstFrame.classList.remove("app-frame-nudge"), { once:true });

    }

    document.querySelectorAll(".app-frame-img").forEach((img) => {

        const markEmpty = () => img.closest(".app-frame").classList.add("app-frame-empty");

        if(img.complete && img.naturalWidth === 0){

            markEmpty();

        } else {

            img.addEventListener("error", markEmpty);

        }

    });

});
