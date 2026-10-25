// =========================================
// FUNÇÕES AUXILIARES
// =========================================

// Formata um número como dinheiro brasileiro: 89.9 -> "R$ 89,90"
const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Converte texto de preço em número: "89,90" -> 89.9
const num = s => parseFloat(String(s).replace(".", "").replace(",", "."));

// =========================================
// CARRINHO (salvo no localStorage do navegador)
// O localStorage guarda os dados mesmo se você trocar de página ou fechar o site.
// =========================================

// Lê o carrinho salvo (se não existir, começa com lista vazia)
const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

// Salva o carrinho e atualiza o número que aparece no cabeçalho
const saveCart = c => {
  localStorage.setItem("cart", JSON.stringify(c));
  updateCount();
};

// Atualiza o contador do carrinho no cabeçalho (<span id="cart-count">)
function updateCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = getCart().length;
}

// =========================================
// CLIQUES: ADICIONAR E REMOVER ITENS
// Um único "ouvinte" no documento inteiro cuida de todos os botões.
// =========================================
document.addEventListener("click", e => {

  // Botão com data-add="..." -> adiciona o jogo ao carrinho
  const b = e.target.closest("[data-add]");
  if (b) {
    const cart = getCart();
    cart.push({
      id: b.dataset.add,                // vem de data-add
      nome: b.dataset.nome,             // vem de data-nome
      preco: num(b.dataset.preco)       // vem de data-preco
    });
    saveCart(cart);
  }

  // Botão com data-remove="posição" -> tira o item do carrinho
  const r = e.target.closest("[data-remove]");
  if (r) {
    const cart = getCart();
    cart.splice(Number(r.dataset.remove), 1); // remove 1 item naquela posição
    saveCart(cart);
    renderCart();                              // redesenha a lista
  }
});

// =========================================
// PÁGINA DO CARRINHO
// Desenha os itens dentro de <div id="itens"> e calcula o total.
// Em páginas sem essa div, a função simplesmente não faz nada.
// =========================================
function renderCart() {
  const box = document.getElementById("itens");
  if (!box) return;

  const cart = getCart();

  // Se tem itens, monta uma linha para cada um; se não, mostra uma mensagem
  box.innerHTML = cart.length
    ? cart.map((i, k) => `
        <div class="item">
          <span>${i.nome}</span>
          <span>${brl(i.preco)} <button data-remove="${k}">Remover</button></span>
        </div>`).join("")
    : "<p>Seu carrinho está vazio. Que tal ver o catálogo?</p>";

  // Soma todos os preços e mostra no total
  document.getElementById("total").textContent =
    brl(cart.reduce((soma, i) => soma + i.preco, 0));
}

// =========================================
// CATÁLOGO: BUSCA AO DIGITAR
// Esconde os cards que não contêm o texto digitado em <input id="busca">.
// =========================================
const busca = document.getElementById("busca");

if (busca) {
  busca.addEventListener("input", () => {
    document.querySelectorAll("#lista .card").forEach(c => {
      const achou = c.textContent.toLowerCase().includes(busca.value.toLowerCase());
      c.style.display = achou ? "" : "none"; // "" mostra, "none" esconde
    });
  });
}

// =========================================
// AO CARREGAR QUALQUER PÁGINA
// =========================================
updateCount(); // mostra a quantidade de itens no cabeçalho
renderCart();  // desenha o carrinho (só age na página carrinho.html)