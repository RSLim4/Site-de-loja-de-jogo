/*
  Level Up Store - página Checkout
  Mostra o resumo do pedido, troca os campos conforme a forma de pagamento e salva o pedido.
*/

const carrinhoCheckout = lerCarrinho();
const formCheckout = document.getElementById("form-checkout");

if (carrinhoCheckout.length === 0) {
  formCheckout.hidden = true;
  document.getElementById("checkout-vazio").hidden = false;
}

let resumoHtml = "";
for (let i = 0; i < carrinhoCheckout.length; i++) {
  const jogo = buscarJogo(carrinhoCheckout[i].id);
  resumoHtml = resumoHtml + `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${jogo.nome} <small class="text-body-secondary">x${carrinhoCheckout[i].qtd}</small></span>
      <span>${formatarPreco(jogo.preco * carrinhoCheckout[i].qtd)}</span>
    </li>`;
}
document.getElementById("resumo-itens").innerHTML = resumoHtml;

const totaisCheckout = calcularTotais();
document.getElementById("checkout-subtotal").textContent = formatarPreco(totaisCheckout.subtotal);
document.getElementById("checkout-desconto").textContent = "- " + formatarPreco(totaisCheckout.desconto);
document.getElementById("checkout-total").textContent = formatarPreco(totaisCheckout.total);

const usuarioCheckout = usuarioLogado();
if (usuarioCheckout) {
  document.getElementById("checkout-nome").value = usuarioCheckout.nome;
  document.getElementById("checkout-email").value = usuarioCheckout.email;
  document.getElementById("checkout-cpf").value = usuarioCheckout.cpf;
}

const camposCartao = document.getElementById("campos-cartao");
const infoPix = document.getElementById("info-pix");
const infoBoleto = document.getElementById("info-boleto");
const opcoesPagamento = document.querySelectorAll("input[name=pagamento]");

function trocarPagamento() {
  const escolhido = document.querySelector("input[name=pagamento]:checked").value;
  const entradasCartao = camposCartao.querySelectorAll("input");

  camposCartao.hidden = escolhido !== "Cartão de crédito";
  infoPix.hidden = escolhido !== "Pix";
  infoBoleto.hidden = escolhido !== "Boleto";

  for (let i = 0; i < entradasCartao.length; i++) {
    entradasCartao[i].required = escolhido === "Cartão de crédito";
  }
}

for (let i = 0; i < opcoesPagamento.length; i++) {
  opcoesPagamento[i].addEventListener("change", trocarPagamento);
}

formCheckout.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const pedidos = lerDados("lus_pedidos", []);
  const numero = "LU" + Date.now().toString().slice(-6);
  const pagamento = document.querySelector("input[name=pagamento]:checked").value;
  const nomes = [];

  for (let i = 0; i < carrinhoCheckout.length; i++) {
    nomes.push(buscarJogo(carrinhoCheckout[i].id).nome);
  }

  pedidos.push({
    numero: numero,
    data: new Date().toLocaleDateString("pt-BR"),
    jogos: nomes.join(", "),
    pagamento: pagamento,
    total: totaisCheckout.total,
    email: document.getElementById("checkout-email").value
  });

  salvarDados("lus_pedidos", pedidos);
  salvarDados("lus_carrinho", []);
  localStorage.removeItem("lus_cupom");
  atualizarContador();

  document.getElementById("numero-pedido").textContent = numero;
  document.getElementById("pagamento-pedido").textContent = pagamento;
  const modal = new bootstrap.Modal(document.getElementById("modal-sucesso"));
  modal.show();
});

trocarPagamento();
