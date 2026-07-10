document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       LINK DE CHECKOUT
       Troque a URL abaixo pelo seu link de pagamento.
    ========================================== */

    const CHECKOUT_URL = "https://SEU-LINK-DE-CHECKOUT-AQUI.com";

    const checkoutLink = document.getElementById("checkoutLink");

    if(checkoutLink){

        checkoutLink.setAttribute("href", CHECKOUT_URL);

    }

    new Stories(STORIES_DATA);

    /* ==========================================
       BARRA SUPERIOR
    ========================================== */

    const offerMessage = document.getElementById("offerMessage");

    const liveCount = document.getElementById("liveCount");

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

    }

    rotateMessage();

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



    /* ==========================================
       HEADLINE RESPONSIVA
    ========================================== */

    const heroTitle = document.querySelector(".hero-title");

    if(window.innerWidth <= 430){

        heroTitle.innerHTML = `
            Perca até
            <span>5 kg</span><br>

            e reduza até
            <span>12 cm</span><br>

            de cintura<br>

            em apenas
            <span>21 dias</span>
        `;

    }else{

        heroTitle.innerHTML = `
            Perca até
            <span>5 kg</span>
            e reduza até
            <span>12 cm</span>
            de cintura
            <br>
            em apenas
            <span>21 dias</span>
        `;

    }

    window.addEventListener("resize",()=>{

        if(window.innerWidth <= 430){

            heroTitle.innerHTML = `
                Perca até
                <span>5 kg</span><br>

                e reduza até
                <span>12 cm</span><br>

                de cintura<br>

                em apenas
                <span>21 dias</span>
            `;

        }else{

            heroTitle.innerHTML = `
                Perca até
                <span>5 kg</span>
                e reduza até
                <span>12 cm</span>
                de cintura
                <br>
                em apenas
                <span>21 dias</span>
            `;

        }

    });

});
