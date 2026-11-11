/*
  Level Up Store - máscaras e validações dos campos
  Formata CPF, celular, número do cartão, validade e CVV enquanto a pessoa digita,
  então ninguém precisa digitar pontos, traços, parênteses ou barras.
*/

function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}

function formatarCpf(texto) {
  const n = somenteNumeros(texto).slice(0, 11);
  let r = n.slice(0, 3);
  if (n.length > 3) r += "." + n.slice(3, 6);
  if (n.length > 6) r += "." + n.slice(6, 9);
  if (n.length > 9) r += "-" + n.slice(9, 11);
  return r;
}

function formatarTelefone(texto) {
  const n = somenteNumeros(texto).slice(0, 11);
  if (n.length === 0) return "";
  let r = "(" + n.slice(0, 2);
  if (n.length >= 3) r += ") ";
  if (n.length <= 10) {
    r += n.slice(2, 6);
    if (n.length > 6) r += "-" + n.slice(6, 10);
  } else {
    r += n.slice(2, 7) + "-" + n.slice(7, 11);
  }
  return r;
}

function formatarCartao(texto) {
  return somenteNumeros(texto).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatarValidade(texto) {
  const n = somenteNumeros(texto).slice(0, 4);
  return n.length > 2 ? n.slice(0, 2) + "/" + n.slice(2) : n;
}


function cpfValido(texto) {
  const n = somenteNumeros(texto);
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i);
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(n[t])) return false;
  }
  return true;
}


function cartaoValido(texto) {
  const n = somenteNumeros(texto);
  if (n.length < 13 || n.length > 16) return false;
  let soma = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    soma += d;
  }
  return soma % 10 === 0;
}

function validadeValida(texto) {
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(texto);
  if (!m) return false;
  const hoje = new Date();
  const ano = 2000 + Number(m[2]);
  const mes = Number(m[1]);
  return ano > hoje.getFullYear() || (ano === hoje.getFullYear() && mes >= hoje.getMonth() + 1);
}


function aplicarMascara(id, formatar, validar, mensagemErro) {
  const campo = document.getElementById(id);
  if (!campo) return;

  function atualizar() {
    campo.value = formatar(campo.value);
    campo.setCustomValidity(campo.value !== "" && !validar(campo.value) ? mensagemErro : "");
  }

  campo.addEventListener("input", atualizar);
  campo.addEventListener("blur", atualizar);
  atualizar();
}

aplicarMascara("cad-cpf", formatarCpf, cpfValido, "CPF inválido. Confira os números.");
aplicarMascara("checkout-cpf", formatarCpf, cpfValido, "CPF inválido. Confira os números.");
aplicarMascara("cad-telefone", formatarTelefone, function (v) { return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v); }, "Celular incompleto. Use DDD + número.");
aplicarMascara("cartao-numero", formatarCartao, cartaoValido, "Número de cartão inválido.");
aplicarMascara("cartao-validade", formatarValidade, validadeValida, "Cartão vencido ou validade inválida.");
aplicarMascara("cartao-cvv", function (v) { return somenteNumeros(v).slice(0, 4); }, function (v) { return v.length >= 3; }, "CVV deve ter 3 ou 4 números.");