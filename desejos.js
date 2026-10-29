/*
  Level Up Store - página Lista de Desejos (HTML, CSS e JavaScript puros)
  Mostra os jogos salvos como desejo e permite mandar todos para o carrinho.
*/

const gradeDesejos = document.getElementById("grade-desejos");
const desejosVazio = document.getElementById("desejos-vazio");
const resumoDesejos = document.getElementById("resumo-desejos");

function mostrarDesejos() {
  const desejos = lerDesejos();
  let html = "";
  let soma = 0;

  for (let i = 0; i < desejos.length; i++) {
    const jogo = buscarJogo(desejos[i]);
    html = html + montarCardJogo(jogo);
    soma = soma + jogo.preco;
  }

  gradeDesejos.innerHTML = html;
  desejosVazio.hidden = desejos.length > 0;
  resumoDesejos.hidden = desejos.length === 0;
  document.getElementById("desejos-qtd").textContent = desejos.length;
  document.getElementById("desejos-soma").textContent = formatarPreco(soma);
  marcarBotoesDesejo();
}

gradeDesejos.addEventListener("click", function (evento) {
  if (evento.target.closest("[data-desejo]")) {
    mostrarDesejos();
  }
});

document.getElementById("tudo-carrinho").addEventListener("click", function () {
  const desejos = lerDesejos();
  for (let i = 0; i < desejos.length; i++) {
    adicionarAoCarrinho(desejos[i]);
  }
});

mostrarDesejos();
