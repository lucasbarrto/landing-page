document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".benefits-tab");
    const panels = document.querySelectorAll(".benefits-list");

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

});
