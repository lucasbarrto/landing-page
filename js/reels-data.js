const REELS_DATA = [
    {
        id: 1,
        name: "ana.transformacao",
        avatar: "assets/stories/perfil1/thumb.jpg",
        video: "assets/reels/perfil1/video.mp4",
        poster: "assets/stories/perfil1/story1.jpg",
        likes: 1842,
        reposts: 214,
        caption: "Perdi 6kg em 21 dias com o Jejum de Ester 🙏🔥 e voltei a orar todos os dias #jejumdeester #fe",
        comments: [
            { name: "julia.mendes", avatar: "assets/comments/avatar-01.jpg", text: "Gente que resultado incrível, e olha o brilho no seu olhar 😍" },
            { name: "marcia.azevedo", avatar: "assets/comments/avatar-02.jpg", text: "Comecei essa semana também, Deus está no controle 🙏" },
            { name: "paty.almeida", avatar: "assets/comments/avatar-03.jpg", text: "Funciona mesmo? Vou pesquisar sobre a história de Ester" }
        ]
    },
    {
        id: 2,
        name: "camila.emagrece",
        avatar: "assets/stories/perfil2/thumb.jpg",
        video: "assets/reels/perfil2/video.mp4",
        poster: "assets/stories/perfil2/story1.jpg",
        likes: 2317,
        reposts: 356,
        caption: "Nunca pensei que um jejum baseado na Bíblia fosse me trazer esse resultado ✅ #metodovalidado",
        comments: [
            { name: "rafaela.costa", avatar: "assets/comments/avatar-04.jpg", text: "Chorei aqui, minha fé também estava fraca e isso me tocou 🥹" },
            { name: "bia.martins", avatar: "assets/comments/avatar-05.jpg", text: "Qual o link pra participar do Jejum de Ester?" }
        ]
    },
    {
        id: 3,
        name: "fernanda.21dias",
        avatar: "assets/stories/perfil3/thumb.jpg",
        video: "assets/reels/perfil3/video.mp4",
        poster: "assets/stories/perfil3/story2.jpg",
        likes: 986,
        reposts: 98,
        caption: "Antes e depois de 3 semanas 🍏 sem passar fome e mais perto de Deus do que nunca",
        comments: [
            { name: "ana.carvalho", avatar: "assets/comments/avatar-06.jpg", text: "Arrasou demais, corpo e espírito renovados 👏👏" },
            { name: "julia.mendes", avatar: "assets/comments/avatar-01.jpg", text: "Salvei o vídeo pra me inspirar nos devocionais" },
            { name: "camila.rodrigues", avatar: "assets/comments/avatar-07.jpg", text: "Bem-vinda ao clube, aqui a gente emagrece rezando 💜" }
        ]
    },
    {
        id: 4,
        name: "marcia.resultados",
        avatar: "assets/stories/perfil1/thumb.jpg",
        video: "assets/reels/perfil4/video.mp4",
        poster: "assets/stories/perfil1/story1.jpg",
        likes: 3021,
        reposts: 487,
        caption: "-10cm de cintura e recuperei minha fé no processo, olha essa diferença 🤯🙏",
        comments: [
            { name: "paty.almeida", avatar: "assets/comments/avatar-03.jpg", text: "Isso é resultado de verdade, com propósito" },
            { name: "bia.martins", avatar: "assets/comments/avatar-05.jpg", text: "Onde eu compro o Jejum de Ester?" }
        ]
    },
    {
        id: 5,
        name: "juliana.novavida",
        avatar: "assets/stories/perfil2/thumb.jpg",
        video: "assets/reels/perfil5/video.mp4",
        poster: "assets/stories/perfil2/story1.jpg",
        likes: 1274,
        reposts: 143,
        caption: "21 dias depois... nem eu acreditei no espelho, e minha relação com Deus nunca esteve tão forte 😭💕 #jejumdeester",
        comments: [
            { name: "ana.carvalho", avatar: "assets/comments/avatar-06.jpg", text: "Que evolução linda, corpo e alma 😍" },
            { name: "fernanda.lima", avatar: "assets/comments/avatar-08.jpg", text: "Me inspirou muito, obrigada por compartilhar sua fé" }
        ]
    },
    {
        id: 6,
        name: "renata.emagrecendo",
        avatar: "assets/stories/perfil3/thumb.jpg",
        video: "assets/reels/perfil6/video.mp4",
        poster: "assets/stories/perfil3/story2.jpg",
        likes: 2689,
        reposts: 301,
        caption: "Sem efeito sanfona dessa vez, porque dessa vez eu entreguei o processo a Deus ✅🙏",
        comments: [
            { name: "camila.rodrigues", avatar: "assets/comments/avatar-07.jpg", text: "Isso sim é resultado consistente, glória a Deus 👏" },
            { name: "julia.mendes", avatar: "assets/comments/avatar-01.jpg", text: "Já são quantos dias de jejum?" },
            { name: "paty.almeida", avatar: "assets/comments/avatar-03.jpg", text: "Vou começar hoje mesmo, com fé" }
        ]
    },
    {
        id: 7,
        name: "vanessa.resultado",
        avatar: "assets/stories/perfil1/thumb.jpg",
        video: "assets/reels/perfil7/video.mp4",
        poster: "assets/stories/perfil1/story1.jpg",
        likes: 954,
        reposts: 76,
        caption: "Plano alimentar prático e devocional todo dia, recomendo demais pra quem quer emagrecer com propósito 🥗📖",
        comments: [
            { name: "marcia.santos", avatar: "assets/comments/avatar-09.jpg", text: "Adorei a dica dos devocionais junto com as receitas" },
            { name: "rafaela.costa", avatar: "assets/comments/avatar-04.jpg", text: "Preciso disso na minha vida 🙏" }
        ]
    },
    {
        id: 8,
        name: "bianca.transforma",
        avatar: "assets/stories/perfil2/thumb.jpg",
        video: "assets/reels/perfil8/video.mp4",
        poster: "assets/stories/perfil2/story1.jpg",
        likes: 3452,
        reposts: 512,
        caption: "Redução de medidas real, sem remédio, e minha ansiedade sumiu depois que voltei a orar todo dia 🔥🙏",
        comments: [
            { name: "juliana.ferreira", avatar: "assets/comments/avatar-10.jpg", text: "Simplesmente incrível, Deus é bom o tempo todo 👏" },
            { name: "renata.souza", avatar: "assets/comments/avatar-11.jpg", text: "Bora começar juntas essa jornada de fé!" }
        ]
    }
];
