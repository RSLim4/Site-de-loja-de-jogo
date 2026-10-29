/*
  Level Up Store - página Minha Conta
  Mostra os dados do usuário logado, o histórico de pedidos e permite sair da conta.
*/

const usuarioConta = usuarioLogado();

if (usuarioConta === null) {
  document.getElementById("conta-deslogado").hidden = false;
  document.getElementById("conta-logado").hidden = true;
} else {
  document.getElementById("conta-nome").textContent = usuarioConta.nome;
  document.getElementById("conta-email").textContent = usuarioConta.email;
  document.getElementById("conta-telefone").textContent = usuarioConta.telefone;
  document.getElementById("conta-plataforma").textContent = usuarioConta.plataforma;
  document.getElementById("conta-desde").textContent = usuarioConta.desde;
  document.getElementById("conta-inicial").textContent = usuarioConta.nome.charAt(0).toUpperCase();

  const pedidos = lerDados("lus_pedidos", []);
  const meusPedidos = [];
  let totalGasto = 0;

  for (let i = 0; i < pedidos.length; i++) {
    if (pedidos[i].email === usuarioConta.email) {
      meusPedidos.push(pedidos[i]);
      totalGasto = totalGasto + pedidos[i].total;
    }
  }

  document.getElementById("conta-qtd-pedidos").textContent = meusPedidos.length;
  document.getElementById("conta-total-gasto").textContent = formatarPreco(totalGasto);
  document.getElementById("conta-qtd-desejos").textContent = lerDesejos().length;

  let linhas = "";
  for (let i = meusPedidos.length - 1; i >= 0; i--) {
    const pedido = meusPedidos[i];
    linhas = linhas + "<tr><td>" + pedido.numero + "</td><td>" + pedido.data + "</td><td>" + pedido.jogos + "</td><td>" + pedido.pagamento + "</td><td class=\"fw-bold\">" + formatarPreco(pedido.total) + "</td></tr>";
  }

  if (meusPedidos.length === 0) {
    linhas = "<tr><td colspan=\"5\" class=\"text-center text-body-secondary py-4\">Você ainda não fez nenhum pedido. <a href=\"catalogo.html\">Ver catálogo</a></td></tr>";
  }
  document.getElementById("tabela-pedidos").innerHTML = linhas;
}

document.getElementById("botao-sair").addEventListener("click", function () {
  localStorage.removeItem("lus_logado");
  window.location.href = "index.html";
});
