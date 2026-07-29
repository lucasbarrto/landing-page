document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".pricing-tab");
    const panels = document.querySelectorAll(".pricing-panel");

    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach((t) => {

                t.classList.toggle("active", t === tab);
                t.classList.remove("pricing-tab-highlight");

            });

            panels.forEach((panel) => {

                panel.classList.toggle("active", panel.dataset.panel === target);

            });

        });

    });

});
