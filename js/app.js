document.addEventListener("DOMContentLoaded", () => {

    new Stories(STORIES_DATA);

    /* ==========================================
       BARRA SUPERIOR
    ========================================== */

    const offerMessage = document.getElementById("offerMessage");

    const liveCount = document.getElementById("liveCount");

    let countdown = 7 * 60;

    function formatTime(seconds){

        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

    }

    function updateOffer(){

        if(countdown > 0){

            countdown--;

        }

        const messages = [

            "✅ Garantia de Resultado ou Seu Dinheiro de Volta",

            `⏳ Esta oferta encerra em ${formatTime(countdown)}`

        ];

        offerMessage.style.opacity = 0;

        setTimeout(()=>{

            offerMessage.textContent = messages[currentMessage];

            offerMessage.style.opacity = 1;

        },250);

        currentMessage++;

        if(currentMessage >= messages.length){

            currentMessage = 0;

        }

    }

    let currentMessage = 0;

    updateOffer();

    setInterval(updateOffer,5000);


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