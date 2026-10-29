/*
  Level Up Store - página do Jogo
  Lê o id do jogo pela URL (jogo.html?id=1) e preenche detalhes, tabela de requisitos e sugestões.
*/

const parametrosJogo = new URLSearchParams(window.location.search);
let jogoAtual = buscarJogo(parametrosJogo.get("id"));

if (jogoAtual === null) {
  jogoAtual = jogos[0];
}

document.title = jogoAtual.nome + " | Level Up Store";
document.getElementById("jogo-nome").textContent = jogoAtual.nome;
document.getElementById("migalha-jogo").textContent = jogoAtual.nome;
document.getElementById("jogo-capa").src = jogoAtual.imagem;
document.getElementById("jogo-capa").alt = "Capa de " + jogoAtual.nome;
document.getElementById("jogo-genero").textContent = jogoAtual.genero;
document.getElementById("jogo-descricao").textContent = jogoAtual.descricao;
document.getElementById("jogo-classificacao").textContent = jogoAtual.classificacao === "L" ? "Livre" : jogoAtual.classificacao + " anos";

let plataformasHtml = "";
for (let i = 0; i < jogoAtual.plataformas.length; i++) {
  plataformasHtml = plataformasHtml + "<span class=\"badge rounded-pill text-bg-dark\">" + jogoAtual.plataformas[i] + "</span> ";
}
document.getElementById("jogo-plataformas").innerHTML = plataformasHtml;

const areaPreco = document.getElementById("jogo-preco");
if (jogoAtual.precoAntigo) {
  const porcentagem = Math.round((1 - jogoAtual.preco / jogoAtual.precoAntigo) * 100);
  areaPreco.innerHTML = "<span class=\"selo-desconto estatico\">-" + porcentagem + "%</span> <s>" + formatarPreco(jogoAtual.precoAntigo) + "</s> <strong>" + formatarPreco(jogoAtual.preco) + "</strong>";
} else {
  areaPreco.innerHTML = "<strong>" + formatarPreco(jogoAtual.preco) + "</strong>";
}

document.getElementById("jogo-comprar").dataset.add = jogoAtual.id;
document.getElementById("jogo-desejo").dataset.desejo = jogoAtual.id;

const linhasRequisitos = requisitos[jogoAtual.peso];
let tabelaHtml = "";
for (let i = 0; i < linhasRequisitos.length; i++) {
  const linha = linhasRequisitos[i];
  tabelaHtml = tabelaHtml + "<tr><th scope=\"row\">" + linha[0] + "</th><td>" + linha[1] + "</td><td>" + linha[2] + "</td><td>" + linha[3] + "</td></tr>";
}
document.getElementById("tabela-requisitos").innerHTML = tabelaHtml;

let sugestoesHtml = "";
let totalSugestoes = 0;
for (let i = 0; i < jogos.length && totalSugestoes < 4; i++) {
  const outro = jogos[i];
  if (outro.id !== jogoAtual.id && outro.categorias.includes(jogoAtual.categorias[0])) {
    sugestoesHtml = sugestoesHtml + montarCardJogo(outro);
    totalSugestoes++;
  }
}
for (let i = 0; i < jogos.length && totalSugestoes < 4; i++) {
  const outro = jogos[i];
  if (outro.id !== jogoAtual.id && !sugestoesHtml.includes("id=" + outro.id + "\"")) {
    sugestoesHtml = sugestoesHtml + montarCardJogo(outro);
    totalSugestoes++;
  }
}
document.getElementById("sugestoes").innerHTML = sugestoesHtml;

marcarBotoesDesejo();

// Trailer: usa o vídeo do próprio jogo (campo "video" em dados.js);
// se o jogo não tiver, continua o vídeo padrão da loja que está no HTML.
const playerTrailer = document.querySelector("#area-trailer video");
if (playerTrailer) {
  playerTrailer.poster = jogoAtual.imagem;
  if (jogoAtual.video) {
    playerTrailer.querySelector("source").src = jogoAtual.video;
    playerTrailer.load();
  }
// Trilha sonora do jogo
const playerAudio = document.querySelector(".trilha audio");
if (playerAudio && jogoAtual.audio) {
  playerAudio.querySelector("source").src = jogoAtual.audio;
  playerAudio.load();
}
  
}
