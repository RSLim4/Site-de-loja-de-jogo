/*
  Level Up Store - página Login
  Procura o usuário cadastrado no localStorage e confere a senha antes de entrar.
*/

document.getElementById("form-login").addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuarios = lerDados("lus_usuarios", []);
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const senha = document.getElementById("login-senha").value;
  const mensagem = document.getElementById("mensagem-login");
  let usuarioEncontrado = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      usuarioEncontrado = usuarios[i];
    }
  }

  if (usuarioEncontrado === null) {
    mensagem.className = "alert alert-warning";
    mensagem.innerHTML = "Não achamos esse e-mail. <a href=\"cadastro.html\" class=\"alert-link\">Crie sua conta</a>.";
  } else if (usuarioEncontrado.senha !== senha) {
    mensagem.className = "alert alert-danger";
    mensagem.textContent = "Senha incorreta. Tente de novo.";
  } else {
    salvarDados("lus_logado", usuarioEncontrado);
    mensagem.className = "alert alert-success";
    mensagem.textContent = "Bem-vindo de volta, " + usuarioEncontrado.nome.split(" ")[0] + "!";
    setTimeout(function () {
      window.location.href = "conta.html";
    }, 1200);
  }
});
