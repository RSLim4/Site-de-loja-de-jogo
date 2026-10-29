/*
  Level Up Store - catálogo de jogos
  Lista com os dados de todos os jogos vendidos na loja (usada em várias páginas)
*/

const jogos = [
  {
    id: 1,
    nome: "Elden Ring",
    imagem: "img/jogos/elden-ring.jpg",
    genero: "RPG de ação",
    categorias: ["RPG", "Ação"],
    plataformas: ["PC", "PS5", "Xbox Series"],
    preco: 229.90,
    precoAntigo: null,
    classificacao: "16",
    resumo: "Mundo aberto sombrio criado pela FromSoftware.",
    descricao: "Levante-se, Maculado, e explore as Terras Intermédias. Elden Ring mistura combate desafiador, chefes inesquecíveis e um mundo aberto cheio de segredos, com história escrita em parceria com George R. R. Martin.",
    peso: "pesado",
    video: "video/elden-ring.mp4",
    audio: "audio/elden-ring.mp3"
  },
  {
    id: 2,
    nome: "Hollow Knight",
    imagem: "img/jogos/hollow-knight.jpg",
    genero: "Metroidvania",
    categorias: ["Aventura", "Indie"],
    plataformas: ["PC", "Switch"],
    preco: 23.49,
    precoAntigo: 46.99,
    classificacao: "10",
    resumo: "Aventura 2D desenhada à mão num reino em ruínas.",
    descricao: "Desça até Hallownest, um reino de insetos esquecido no subsolo. Explore cavernas, enfrente criaturas estranhas e descubra novas habilidades em uma aventura 2D clássica, toda desenhada à mão.",
    peso: "leve",
    video: "video/hollow-knight.mp4",
    audio: "audio/hollow-knight.mp3"
  },
  {
    id: 3,
    nome: "Forza Horizon 5",
    imagem: "img/jogos/forza-horizon-5.png",
    genero: "Corrida",
    categorias: ["Corrida", "Esporte"],
    plataformas: ["PC", "Xbox Series"],
    preco: 249.00,
    precoAntigo: null,
    classificacao: "L",
    resumo: "Centenas de carros e um mapa gigante pra acelerar.",
    descricao: "Dirija centenas dos melhores carros do mundo pelas paisagens vibrantes do México: desertos, selvas, cidades históricas e vulcões. Corra sozinho ou com amigos em um festival que nunca para.",
    peso: "medio",
    video: "video/forza-horizon-5.mp4",
    audio: "audio/forza-horizon-5.mp3"
  },
  {
    id: 4,
    nome: "Stardew Valley",
    imagem: "img/jogos/stardew-valley.png",
    genero: "Simulação de fazenda",
    categorias: ["Simulação", "Indie"],
    plataformas: ["PC", "Switch", "PS4"],
    preco: 24.99,
    precoAntigo: null,
    classificacao: "L",
    resumo: "Cuide da fazenda, faça amigos e viva no campo.",
    descricao: "Você herdou a antiga fazenda do seu avô em Stardew Valley. Plante, crie animais, pesque, explore minas e faça amizade com os moradores da cidade, sozinho ou em modo cooperativo com até 4 jogadores.",
    peso: "leve",
    video: "video/stardew-valley.mp4",
    audio: "audio/stardew-valley.mp3"
  },
  {
    id: 5,
    nome: "Cyberpunk 2077",
    imagem: "img/jogos/cyberpunk-2077.png",
    genero: "RPG de mundo aberto",
    categorias: ["RPG", "Ação"],
    plataformas: ["PC", "PS5", "Xbox Series"],
    preco: 99.95,
    precoAntigo: 199.90,
    classificacao: "18",
    resumo: "Night City te espera numa história futurista.",
    descricao: "Viva como V, um mercenário em busca de um implante que pode ser a chave da imortalidade. Personalize seu personagem, escolha seu estilo de combate e tome decisões que mudam o rumo de Night City.",
    peso: "pesado",
    video: "video/cyberpunk.mp4",
    audio: "audio/cyberpunk-2077.mp3"
  },
  {
    id: 6,
    nome: "Hades",
    imagem: "img/jogos/hades.jpg",
    genero: "Roguelike de ação",
    categorias: ["Ação", "Indie"],
    plataformas: ["PC", "Switch"],
    preco: 47.49,
    precoAntigo: 73.99,
    classificacao: "12",
    resumo: "Fuja do submundo com a ajuda dos deuses do Olimpo.",
    descricao: "Como Zagreu, filho de Hades, lute para escapar do submundo. Cada tentativa é diferente, com poderes dados pelos deuses do Olimpo e uma história que avança a cada nova fuga.",
    peso: "leve",
    video: "video/hades.mp4",
    audio: "audio/hades.mp3"
  },
  {
    id: 7,
    nome: "EA Sports FC 25",
    imagem: "img/jogos/ea-fc-25.jpg",
    genero: "Futebol",
    categorias: ["Esporte"],
    plataformas: ["PC", "PS5", "Xbox Series"],
    preco: 299.00,
    precoAntigo: null,
    classificacao: "L",
    resumo: "Clubes, ligas e jogadores reais em campo.",
    descricao: "Mais de 19 mil jogadores licenciados, 700 times e 30 ligas. Monte seu time no Ultimate Team, viva a carreira de técnico ou jogue partidas rápidas com os amigos.",
    peso: "medio",
    video: "video/sports-fc.mp4",
    audio: "audio/ea-fc-25.mp3"
  },
  {
    id: 8,
    nome: "Red Dead Redemption 2",
    imagem: "img/jogos/red-dead-2.png",
    genero: "Aventura de faroeste",
    categorias: ["Aventura", "Ação"],
    plataformas: ["PC", "PS4", "Xbox One"],
    preco: 89.90,
    precoAntigo: 249.90,
    classificacao: "18",
    resumo: "A saga de Arthur Morgan no fim do Velho Oeste.",
    descricao: "América, 1899. Arthur Morgan e a gangue Van der Linde fogem da lei pelo coração do país. Um mundo aberto enorme, detalhado e cheio de vida, com uma das histórias mais elogiadas dos games.",
    peso: "pesado",
    video: "video/reddead.mp4",
    audio: "audio/red-dead-2.mp3"
  },
  {
    id: 9,
    nome: "Celeste",
    imagem: "img/jogos/celeste.png",
    genero: "Plataforma",
    categorias: ["Indie", "Aventura"],
    plataformas: ["PC", "Switch", "PS4"],
    preco: 36.99,
    precoAntigo: null,
    classificacao: "L",
    resumo: "Escale a montanha em um plataforma preciso.",
    descricao: "Ajude Madeline a chegar ao topo da Montanha Celeste. Um jogo de plataforma desafiador, com mais de 700 fases, trilha sonora marcante e uma história sensível sobre superação.",
    peso: "leve",
    video: "video/celeste.mp4",
    audio: "audio/celeste.mp3"
  },
  {
    id: 10,
    nome: "Baldur's Gate 3",
    imagem: "img/jogos/baldurs-gate-3.png",
    genero: "RPG por turnos",
    categorias: ["RPG", "Aventura"],
    plataformas: ["PC", "PS5"],
    preco: 199.99,
    precoAntigo: null,
    classificacao: "18",
    resumo: "RPG de fantasia baseado em Dungeons & Dragons.",
    descricao: "Reúna seu grupo e volte aos Reinos Esquecidos em uma história de amizade, traição e sobrevivência. Cada escolha muda a aventura, que pode ser jogada sozinho ou com até 4 amigos.",
    peso: "pesado",
    video: "video/baldur.mp4",
    audio: "audio/baldur-gate-3.mp3"
  }
];

const requisitos = {
  leve: [
    ["Sistema", "Windows 10 64-bit", "Windows 10 64-bit", "Windows 11 64-bit"],
    ["Processador", "Intel Core i3", "Intel Core i5", "Intel Core i5 (10ª ger.)"],
    ["Memória", "4 GB", "8 GB", "8 GB"],
    ["Placa de vídeo", "GeForce GTX 650", "GeForce GTX 1050", "GeForce GTX 1650"],
    ["Armazenamento", "5 GB", "10 GB (SSD)", "10 GB (SSD)"]
  ],
  medio: [
    ["Sistema", "Windows 10 64-bit", "Windows 10 64-bit", "Windows 11 64-bit"],
    ["Processador", "Intel Core i5-4460", "Intel Core i5-8400", "Intel Core i7-10700"],
    ["Memória", "8 GB", "16 GB", "16 GB"],
    ["Placa de vídeo", "GeForce GTX 970", "GeForce GTX 1070", "GeForce RTX 3070"],
    ["Armazenamento", "60 GB", "100 GB (SSD)", "110 GB (SSD)"]
  ],
  pesado: [
    ["Sistema", "Windows 10 64-bit", "Windows 10 64-bit", "Windows 11 64-bit"],
    ["Processador", "Intel Core i5-8400", "Intel Core i7-8700K", "Intel Core i7-12700"],
    ["Memória", "12 GB", "16 GB", "32 GB"],
    ["Placa de vídeo", "GeForce GTX 1060", "GeForce RTX 2060", "GeForce RTX 4070"],
    ["Armazenamento", "70 GB (SSD)", "150 GB (SSD)", "150 GB (SSD)"]
  ]
};

const categorias = ["Ação", "RPG", "Aventura", "Corrida", "Esporte", "Indie", "Simulação"];
