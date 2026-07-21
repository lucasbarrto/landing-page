document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       LINK DE CHECKOUT
       Apenas o botão final do card de preço (#pricingCta) leva
       para o checkout. Os demais botões apenas rolam a página
       até ele.
    ========================================== */

    const CHECKOUT_URL = "https://pay.kiwify.com.br/IgzadMh";

    const pricingCta = document.getElementById("pricingCta");

    pricingCta.setAttribute("href", CHECKOUT_URL);

    document.querySelectorAll(".js-scroll-to-checkout").forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            pricingCta.scrollIntoView({ behavior: "smooth", block: "center" });

        });

    });

    new Stories(STORIES_DATA);

    new Reels(REELS_DATA);

    /* ==========================================
       BARRA SUPERIOR
    ========================================== */

    const offerMessage = document.getElementById("offerMessage");

    const liveCount = document.getElementById("liveCount");

    const countdownDisplays = document.querySelectorAll(".js-countdown");

    let countdown = 7 * 60;

    let currentMessage = 0;

    function formatTime(seconds){

        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

    }

    function getMessages(){

        return [

            "✅ Garantia de Resultado ou Seu Dinheiro de Volta",

            `⏳ Esta oferta encerra em ${formatTime(countdown)}`

        ];

    }

    // Alterna a mensagem exibida na barra (com fade)
    function rotateMessage(){

        const messages = getMessages();

        offerMessage.style.opacity = 0;

        setTimeout(()=>{

            offerMessage.textContent = messages[currentMessage];

            offerMessage.style.opacity = 1;

        },250);

        currentMessage = (currentMessage + 1) % messages.length;

    }

    // Cronômetro real: decrementa 1 segundo a cada 1 segundo
    function tickCountdown(){

        if(countdown > 0){

            countdown--;

        }

        // Mantém o tempo atualizado quando a mensagem do cronômetro está visível
        if(offerMessage.textContent.includes("encerra em")){

            offerMessage.textContent = `⏳ Esta oferta encerra em ${formatTime(countdown)}`;

        }

        updateCountdownDisplays();

    }

    function updateCountdownDisplays(){

        countdownDisplays.forEach((el) => {

            el.textContent = formatTime(countdown);

        });

    }

    rotateMessage();
    updateCountdownDisplays();

    setInterval(rotateMessage, 5000);
    setInterval(tickCountdown, 1000);


    /* ==========================================
       CONTADOR AO VIVO
    ========================================== */

    function updateLive(){

        const value = Math.floor(Math.random()*20)+38;

        liveCount.textContent = value;

    }

    updateLive();

    setInterval(updateLive,4000);



});
