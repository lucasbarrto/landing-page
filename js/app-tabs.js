document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".app-tab");
    const panels = document.querySelectorAll(".app-panel");

    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach((t) => {

                t.classList.toggle("active", t === tab);

            });

            panels.forEach((panel) => {

                panel.classList.toggle("active", panel.dataset.panel === target);

            });

        });

    });

    document.querySelectorAll(".app-frame-img").forEach((img) => {

        const markEmpty = () => img.closest(".app-frame").classList.add("app-frame-empty");

        if(img.complete && img.naturalWidth === 0){

            markEmpty();

        } else {

            img.addEventListener("error", markEmpty);

        }

    });

});
