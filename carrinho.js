/*
  Level Up Store - página Carrinho
  Lista os jogos do carrinho em tabela, permite alterar quantidade, remover itens e aplicar cupom.
*/

const corpoTabela = document.getElementById("itens-carrinho");
const areaCarrinho = document.getElementById("area-carrinho");
const carrinhoVazio = document.getElementById("carrinho-vazio");

function mostrarCarrinho() {
  const carrinho = lerCarrinho();

  if (carrinho.length === 0) {
    areaCarrinho.hidden = true;
    carrinhoVazio.hidden = false;
    return;
  }

  areaCarrinho.hidden = false;
  carrinhoVazio.hidden = true;

  let html = "";
  for (let i = 0; i < carrinho.length; i++) {
    const jogo = buscarJogo(carrinho[i].id);
    const subtotal = jogo.preco * carrinho[i].qtd;
    html = html + `
      <tr>
        <td>
          <div class="item-carrinho">
            <img src="${jogo.imagem}" alt="Capa de ${jogo.nome}">
            <div>
              <a href="jogo.html?id=${jogo.id}">${jogo.nome}</a>
              <small>${jogo.plataformas.join(" · ")}</small>
            </div>
          </div>
        </td>
        <td>${formatarPreco(jogo.preco)}</td>
        <td>
          <div class="controle-qtd">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-menos="${i}" aria-label="Diminuir">−</button>
            <span>${carrinho[i].qtd}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-mais="${i}" aria-label="Aumentar">+</button>
          </div>
        </td>
        <td class="fw-bold">${formatarPreco(subtotal)}</td>
        <td><button type="button" class="btn btn-sm btn-outline-danger" data-remover="${i}">Remover</button></td>
      </tr>`;
  }
  corpoTabela.innerHTML = html;

  const totais = calcularTotais();
  document.getElementById("resumo-qtd").textContent = totais.quantidade;
  document.getElementById("resumo-subtotal").textContent = formatarPreco(totais.subtotal);
  document.getElementById("resumo-desconto").textContent = "- " + formatarPreco(totais.desconto);
  document.getElementById("resumo-total").textContent = formatarPreco(totais.total);
}

corpoTabela.addEventListener("click", function (evento) {
  const carrinho = lerCarrinho();
  const mais = evento.target.closest("[data-mais]");
  const menos = evento.target.closest("[data-menos]");
  const remover = evento.target.closest("[data-remover]");

  if (mais) {
    carrinho[mais.dataset.mais].qtd++;
  } else if (menos) {
    const posicao = menos.dataset.menos;
    if (carrinho[posicao].qtd > 1) {
      carrinho[posicao].qtd--;
    } else {
      carrinho.splice(posicao, 1);
    }
  } else if (remover) {
    carrinho.splice(remover.dataset.remover, 1);
  } else {
    return;
  }

  salvarDados("lus_carrinho", carrinho);
  atualizarContador();
  mostrarCarrinho();
});

document.getElementById("form-cupom").addEventListener("submit", function (evento) {
  evento.preventDefault();
  const codigo = document.getElementById("cupom").value.trim().toUpperCase();
  const mensagem = document.getElementById("mensagem-cupom");

  if (codigo === "LEVELUP10") {
    salvarDados("lus_cupom", codigo);
    mensagem.className = "alert alert-success py-2 mt-2";
    mensagem.textContent = "Cupom aplicado: 10% de desconto!";
  } else {
    localStorage.removeItem("lus_cupom");
    mensagem.className = "alert alert-danger py-2 mt-2";
    mensagem.textContent = "Cupom inválido. Tente LEVELUP10.";
  }
  mostrarCarrinho();
});

document.getElementById("limpar-carrinho").addEventListener("click", function () {
  salvarDados("lus_carrinho", []);
  atualizarContador();
  mostrarCarrinho();
});

mostrarCarrinho();
