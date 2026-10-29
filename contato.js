/*
  Level Up Store - página Contato (HTML, CSS e JavaScript puros)
  Salva as mensagens enviadas no localStorage e lista o histórico logo abaixo do formulário.
*/

const formContato = document.getElementById("form-contato");
const listaMensagens = document.getElementById("lista-mensagens");
const contadorTexto = document.getElementById("contador-texto");
const campoMensagem = document.getElementById("contato-mensagem");

campoMensagem.addEventListener("input", function () {
  contadorTexto.textContent = campoMensagem.value.length + "/500";
});

function mostrarMensagens() {
  const mensagens = lerDados("lus_mensagens", []);
  let html = "";

  for (let i = mensagens.length - 1; i >= 0; i--) {
    const m = mensagens[i];
    html = html + `
      <li class="mensagem-enviada">
        <div class="mensagem-topo">
          <strong>${escaparTexto(m.assunto)}</strong>
          <span class="status-mensagem">${m.status}</span>
        </div>
        <p>${escaparTexto(m.texto)}</p>
        <small>Enviada por ${escaparTexto(m.nome)} em ${m.data}</small>
      </li>`;
  }

  if (mensagens.length === 0) {
    html = "<li class=\"mensagem-vazia\">Nenhuma mensagem enviada ainda.</li>";
  }

  listaMensagens.innerHTML = html;
}

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const mensagens = lerDados("lus_mensagens", []);
  mensagens.push({
    nome: document.getElementById("contato-nome").value.trim(),
    email: document.getElementById("contato-email").value.trim(),
    assunto: document.getElementById("contato-assunto").value,
    texto: campoMensagem.value.trim(),
    data: new Date().toLocaleString("pt-BR"),
    status: "Recebida"
  });

  salvarDados("lus_mensagens", mensagens);
  formContato.reset();
  contadorTexto.textContent = "0/500";
  mostrarAviso("Mensagem enviada! Respondemos em até 24 horas úteis.", "success");
  mostrarMensagens();
});

document.getElementById("limpar-mensagens").addEventListener("click", function () {
  localStorage.removeItem("lus_mensagens");
  mostrarMensagens();
});

const usuarioContato = usuarioLogado();
if (usuarioContato) {
  document.getElementById("contato-nome").value = usuarioContato.nome;
  document.getElementById("contato-email").value = usuarioContato.email;
}

mostrarMensagens();
