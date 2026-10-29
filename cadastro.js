/*
  Level Up Store - página Cadastro
  Confere se as senhas são iguais e se o e-mail já existe, e salva o novo usuário no localStorage.
*/

const formCadastro = document.getElementById("form-cadastro");
const campoSenha = document.getElementById("cad-senha");
const campoConfirma = document.getElementById("cad-confirma");

campoConfirma.addEventListener("input", function () {
  if (campoConfirma.value !== campoSenha.value) {
    campoConfirma.setCustomValidity("As senhas não são iguais.");
  } else {
    campoConfirma.setCustomValidity("");
  }
});

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuarios = lerDados("lus_usuarios", []);
  const email = document.getElementById("cad-email").value.trim().toLowerCase();
  const mensagem = document.getElementById("mensagem-cadastro");

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      mensagem.className = "alert alert-warning";
      mensagem.textContent = "Esse e-mail já tem cadastro. Faça login.";
      return;
    }
  }

  const novoUsuario = {
    nome: document.getElementById("cad-nome").value.trim(),
    email: email,
    cpf: document.getElementById("cad-cpf").value,
    telefone: document.getElementById("cad-telefone").value,
    plataforma: document.getElementById("cad-plataforma").value,
    senha: campoSenha.value,
    desde: new Date().toLocaleDateString("pt-BR")
  };

  usuarios.push(novoUsuario);
  salvarDados("lus_usuarios", usuarios);
  salvarDados("lus_logado", novoUsuario);

  mensagem.className = "alert alert-success";
  mensagem.textContent = "Conta criada! Redirecionando para a sua conta...";
  formCadastro.reset();

  setTimeout(function () {
    window.location.href = "conta.html";
  }, 1500);
});
