/*
  Level Up Store - funções comuns a todas as páginas
  Carrinho, lista de desejos, usuário logado, avisos na tela e menu do celular.
  Os dados ficam salvos no localStorage para não se perderem ao fechar o site.
*/

function lerDados(chave, padrao) {
  const texto = localStorage.getItem(chave);
  if (texto === null) {
    return padrao;
  }
  return JSON.parse(texto);
}

function salvarDados(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function escaparTexto(texto) {
  const caixa = document.createElement("div");
  caixa.textContent = texto;
  return caixa.innerHTML;
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buscarJogo(id) {
  for (let i = 0; i < jogos.length; i++) {
    if (jogos[i].id === Number(id)) {
      return jogos[i];
    }
  }
  return null;
}

function lerCarrinho() {
  return lerDados("lus_carrinho", []);
}

function adicionarAoCarrinho(id) {
  const carrinho = lerCarrinho();
  const jogo = buscarJogo(id);
  let encontrou = false;

  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === jogo.id) {
      carrinho[i].qtd = carrinho[i].qtd + 1;
      encontrou = true;
    }
  }

  if (!encontrou) {
    carrinho.push({ id: jogo.id, qtd: 1 });
  }

  salvarDados("lus_carrinho", carrinho);
  atualizarContador();
  mostrarAviso("<strong>" + jogo.nome + "</strong> foi adicionado ao carrinho.", "success");
}

function calcularTotais() {
  const carrinho = lerCarrinho();
  const cupom = lerDados("lus_cupom", null);
  let subtotal = 0;
  let quantidade = 0;

  for (let i = 0; i < carrinho.length; i++) {
    const jogo = buscarJogo(carrinho[i].id);
    subtotal = subtotal + jogo.preco * carrinho[i].qtd;
    quantidade = quantidade + carrinho[i].qtd;
  }

  let desconto = 0;
  if (cupom === "LEVELUP10") {
    desconto = subtotal * 0.1;
  }

  return {
    quantidade: quantidade,
    subtotal: subtotal,
    desconto: desconto,
    total: subtotal - desconto
  };
}

function atualizarContador() {
  const ids = ["cart-count", "cart-count-mobile"];
  const quantidade = calcularTotais().quantidade;

  for (let i = 0; i < ids.length; i++) {
    const contador = document.getElementById(ids[i]);
    if (contador) {
      contador.textContent = quantidade;
      contador.classList.remove("pulsar");
      void contador.offsetWidth;
      contador.classList.add("pulsar");
    }
  }
}

function lerDesejos() {
  return lerDados("lus_desejos", []);
}

function estaNosDesejos(id) {
  return lerDesejos().includes(Number(id));
}

function alternarDesejo(id) {
  const desejos = lerDesejos();
  const jogo = buscarJogo(id);
  const posicao = desejos.indexOf(jogo.id);

  if (posicao === -1) {
    desejos.push(jogo.id);
    mostrarAviso("<strong>" + jogo.nome + "</strong> entrou na sua lista de desejos.", "info");
  } else {
    desejos.splice(posicao, 1);
    mostrarAviso("<strong>" + jogo.nome + "</strong> saiu da sua lista de desejos.", "secondary");
  }

  salvarDados("lus_desejos", desejos);
  marcarBotoesDesejo();
}

function marcarBotoesDesejo() {
  const botoes = document.querySelectorAll("[data-desejo]");
  for (let i = 0; i < botoes.length; i++) {
    const ativo = estaNosDesejos(botoes[i].dataset.desejo);
    botoes[i].classList.toggle("ativo", ativo);
    botoes[i].setAttribute("aria-pressed", ativo);
    if (botoes[i].dataset.texto === "sim") {
      botoes[i].textContent = ativo ? "♥ Na lista de desejos" : "♡ Lista de desejos";
    } else {
      botoes[i].textContent = ativo ? "♥" : "♡";
    }
  }
}

function mostrarAviso(texto, tipo) {
  let area = document.getElementById("avisos");
  if (!area) {
    area = document.createElement("div");
    area.id = "avisos";
    area.className = "area-avisos";
    document.body.appendChild(area);
  }

  const aviso = document.createElement("div");
  aviso.className = "alert alert-" + tipo + " aviso-loja";
  aviso.setAttribute("role", "alert");
  aviso.innerHTML = "<span>" + texto + "</span><button type=\"button\" class=\"fechar-aviso\" aria-label=\"Fechar\">×</button>";
  area.appendChild(aviso);

  setTimeout(function () {
    aviso.classList.add("saindo");
    setTimeout(function () {
      aviso.remove();
    }, 400);
  }, 3500);
}

function usuarioLogado() {
  return lerDados("lus_logado", null);
}

function atualizarLinkConta() {
  const link = document.getElementById("link-conta");
  const usuario = usuarioLogado();
  if (link && usuario) {
    link.textContent = "Olá, " + usuario.nome.split(" ")[0];
    link.href = "conta.html";
  }
}

function montarCardJogo(jogo) {
  let precoHtml = "<p class=\"preco\">" + formatarPreco(jogo.preco) + "</p>";
  let selo = "";

  if (jogo.precoAntigo) {
    const porcentagem = Math.round((1 - jogo.preco / jogo.precoAntigo) * 100);
    precoHtml = "<p class=\"preco\"><s>" + formatarPreco(jogo.precoAntigo) + "</s> " + formatarPreco(jogo.preco) + "</p>";
    selo = "<span class=\"selo-desconto\">-" + porcentagem + "%</span>";
  }

  return `
    <article class="card-jogo">
      <div class="card-jogo-capa">
        <a href="jogo.html?id=${jogo.id}"><img src="${jogo.imagem}" alt="Capa de ${jogo.nome}"></a>
        ${selo}
        <button type="button" class="botao-desejo" data-desejo="${jogo.id}" aria-label="Lista de desejos">♡</button>
      </div>
      <div class="card-jogo-corpo">
        <small class="genero">${jogo.genero}</small>
        <h3><a href="jogo.html?id=${jogo.id}">${jogo.nome}</a></h3>
        <p class="card-jogo-texto">${jogo.resumo}</p>
        ${precoHtml}
        <button type="button" class="botao botao-principal botao-cheio" data-add="${jogo.id}">Adicionar ao carrinho</button>
      </div>
    </article>`;
}

document.addEventListener("click", function (evento) {
  const botaoAdd = evento.target.closest("[data-add]");
  if (botaoAdd) {
    adicionarAoCarrinho(botaoAdd.dataset.add);
  }

  const botaoDesejo = evento.target.closest("[data-desejo]");
  if (botaoDesejo) {
    alternarDesejo(botaoDesejo.dataset.desejo);
  }

  const fechar = evento.target.closest(".fechar-aviso");
  if (fechar) {
    fechar.parentElement.remove();
  }
});

const botaoMenu = document.getElementById("menu-toggle");
if (botaoMenu) {
  botaoMenu.addEventListener("click", function () {
    const menu = document.getElementById("menu-links");
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });
}

atualizarContador();
atualizarLinkConta();
marcarBotoesDesejo();
