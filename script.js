let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];

function salvar() {
  let p = {
    nome: nome.value,
    cidade: cidade.value,
    categoria: categoria.value,
    whats: whats.value,
    descricao: descricao.value
  };

  profissionais.push(p);
  localStorage.setItem("profissionais", JSON.stringify(profissionais));

  alert("Salvo com sucesso!");
}

if (document.getElementById("lista")) {
  render();
}

function render() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  profissionais.forEach((p, i) => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.categoria}</p>
        <p>${p.cidade}</p>
        <a href="perfil.html?id=${i}">Ver perfil</a>
      </div>
    `;
  });
}

function filtrar() {
  let termo = busca.value.toLowerCase();
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  profissionais
    .filter(p => p.categoria.toLowerCase().includes(termo))
    .forEach((p, i) => {
      lista.innerHTML += `
        <div class="card">
          <h3>${p.nome}</h3>
          <p>${p.categoria}</p>
          <a href="perfil.html?id=${i}">Ver perfil</a>
        </div>
      `;
    });
}

if (document.getElementById("perfil")) {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  let p = profissionais[id];

  document.getElementById("perfil").innerHTML = `
    <h1>${p.nome}</h1>
    <p>${p.descricao}</p>
    <p>${p.cidade}</p>
    <a href="https://wa.me/${p.whats}" target="_blank">Chamar no WhatsApp</a>
  `;
}