// app.js - usado por index.html
const API_URL = "http://localhost:3000/destaque";

/* --- dados do footer (mantidos localmente) --- */
const dadosFooter = {
  "id": 1,
  "Nome": "Evelyn Maestre",
  "Sobre": "Técnica em informática, graduanda em Sistemas de Informação",
  "Curso": "Sistemas de Informção",
  "Turno": "Noite",
  "Contato": [
    { "id": 1, "Email": "evelynmaestre5@gmail.com" },
    { "id": 2, "Telefone": "(31) 9 8883-9964" }
  ],
  "Redes": [
    { "id": 1, "Instagram": "https://www.instagram.com/__izuky__/" }
  ]
};


document.addEventListener("DOMContentLoaded", () => {
  // Footer
  document.getElementById("footer-nome").textContent = `Autora: ${dadosFooter.Nome}`;
  document.getElementById("footer-sobre").textContent = dadosFooter.Sobre || "Informações não disponíveis.";
  document.getElementById("footer-Curso").textContent = `Curso: ${dadosFooter.Curso}`;
  document.getElementById("footer-Turno").textContent = `Turno: ${dadosFooter.Turno}`;

  const contatoDiv = document.getElementById("footer-contato");
  dadosFooter.Contato.forEach(item => {
    if (item.Email) {
      contatoDiv.innerHTML += `<p><i class="fas fa-envelope"></i> 
        <a href="mailto:${item.Email}" class="text-light">${item.Email}</a></p>`;
    }
    if (item.Telefone) {
      const telefoneLink = `tel:+55${item.Telefone.replace(/\D/g, '')}`;
      contatoDiv.innerHTML += `<p><i class="fas fa-phone"></i> 
        <a href="${telefoneLink}" class="text-light">${item.Telefone}</a></p>`;
    }
  });

  const redesDiv = document.getElementById("footer-redes");
  dadosFooter.Redes.forEach(rede => {
    if (rede.Instagram) {
      redesDiv.innerHTML += `<p> <i class="fab fa-instagram" ></i>
        <a href="${rede.Instagram}" target="_blank" class="text-light">Instagram</a></p>`;
    } else {
      redesDiv.innerHTML += `<p><i class="fab fa-instagram"></i> Instagram não informado</p>`;
    }
  });

  // ação do botão de busca
  document.getElementById('btnBusca').addEventListener('click', function () {
    const campo = document.getElementById('campoBusca');
    campo.style.display = campo.style.display === 'none' ? 'inline-block' : 'none';
    if (campo.style.display === 'inline-block') campo.focus();
  });

  // carregar os destaques da API
  carregarDestaques();
});

/* --- função que carrega os cards via API --- */
async function carregarDestaques() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const destaque = await resp.json();

    const container = document.getElementById("destaques");
    container.innerHTML = ""; // limpa

    destaque.forEach(album => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card bg-dark text-white h-100 card-album" data-id="${album.id}" style="cursor:pointer">
          <img src="${album.imagem}" class="card-img-top" alt="${album.album}">
          <div class="card-body">
            <h5 class="card-title">${album.album}</h5>
            <p class="card-text">Lançamento: ${album.lancamento}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <span class="text-warning">★★★★★</span>
            <i class="fas fa-heart text-danger"></i>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    // adicionar listener para abrir detalhes
    document.querySelectorAll('.card-album').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.href = `detalhes.html?id=${id}`;
      });
    });
  } catch (erro) {
    console.error("Erro ao carregar destaques:", erro);
    const container = document.getElementById("destaques");
    if (container) container.innerHTML = '<p>Não foi possível carregar os destaques. Verifique o servidor API (JSON Server).</p>';
  }
}

//pesquisa local
function pesquisar() {
  const termo = document.getElementById('campoBusca').value.toLowerCase();
  const cols = document.querySelectorAll('#destaques .col-md-4');

  cols.forEach(col => {
    const titulo = (col.querySelector('.card-title')?.textContent || "").toLowerCase();
    if (titulo.includes(termo)) col.style.display = 'block'; else col.style.display = 'none';
  });
}

function abrirAlbum(id) {
  window.location.href = `detalhes.html?id=${id}`;
}
