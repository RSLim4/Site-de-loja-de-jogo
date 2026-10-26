/*
  Level Up Store - página Catálogo
  Monta a grade de jogos a partir da lista de dados e aplica busca, filtros e ordenação.
*/

const campoBusca = document.getElementById("busca");
const campoCategoria = document.getElementById("filtro-categoria");
const campoPlataforma = document.getElementById("filtro-plataforma");
const campoOrdem = document.getElementById("filtro-ordem");
const lista = document.getElementById("lista");
const contagem = document.getElementById("contagem");

for (let i = 0; i < categorias.length; i++) {
  const opcao = document.createElement("option");
  opcao.value = categorias[i];
  opcao.textContent = categorias[i];
  campoCategoria.appendChild(opcao);
}

const parametros = new URLSearchParams(window.location.search);
if (parametros.get("cat")) {
  campoCategoria.value = parametros.get("cat");
}

function filtrarJogos() {
  const texto = campoBusca.value.trim().toLowerCase();
  const categoria = campoCategoria.value;
  const plataforma = campoPlataforma.value;
  const resultado = [];

  for (let i = 0; i < jogos.length; i++) {
    const jogo = jogos[i];
    let passa = true;

    if (texto !== "" && !jogo.nome.toLowerCase().includes(texto)) {
      passa = false;
    }
    if (categoria !== "todas" && !jogo.categorias.includes(categoria)) {
      passa = false;
    }
    if (plataforma !== "todas" && !jogo.plataformas.includes(plataforma)) {
      passa = false;
    }

    if (passa) {
      resultado.push(jogo);
    }
  }

  if (campoOrdem.value === "menor") {
    resultado.sort(function (a, b) { return a.preco - b.preco; });
  } else if (campoOrdem.value === "maior") {
    resultado.sort(function (a, b) { return b.preco - a.preco; });
  } else if (campoOrdem.value === "nome") {
    resultado.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
  } else if (campoOrdem.value === "promocao") {
    resultado.sort(function (a, b) { return (b.precoAntigo ? 1 : 0) - (a.precoAntigo ? 1 : 0); });
  }

  return resultado;
}

function mostrarCatalogo() {
  const resultado = filtrarJogos();
  let html = "";

  for (let i = 0; i < resultado.length; i++) {
    html = html + montarCardJogo(resultado[i]);
  }

  if (resultado.length === 0) {
    html = "<div class=\"estado-vazio\"><h3>Nenhum jogo encontrado</h3><p>Tente outro nome ou limpe os filtros.</p></div>";
  }

  lista.innerHTML = html;
  contagem.textContent = resultado.length === 1 ? "1 jogo encontrado" : resultado.length + " jogos encontrados";
  marcarBotoesDesejo();
}

campoBusca.addEventListener("input", mostrarCatalogo);
campoCategoria.addEventListener("change", mostrarCatalogo);
campoPlataforma.addEventListener("change", mostrarCatalogo);
campoOrdem.addEventListener("change", mostrarCatalogo);

document.getElementById("limpar-filtros").addEventListener("click", function () {
  campoBusca.value = "";
  campoCategoria.value = "todas";
  campoPlataforma.value = "todas";
  campoOrdem.value = "relevancia";
  mostrarCatalogo();
});

mostrarCatalogo();
