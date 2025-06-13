document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  if (page === 'index.html' || page === '') {
 
    const form = document.getElementById('formAtividade');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

     
        const nome = form.titulo.value;
  const data = form.data.value;
  const statusSelect = form.status;
  const status = statusSelect.options[statusSelect.selectedIndex].text;

  const atividade = { nome, data, status };

     
      localStorage.setItem('atividadeSalva', JSON.stringify(atividade));

    
      window.location.href = 'sucesso.html';
    });

  } else if (page === 'sucesso.html') {
   
    const dados = localStorage.getItem('atividadeSalva');

    if (!dados) {
      document.getElementById('dadosAtividade').innerHTML = '<p>Nenhuma atividade encontrada.</p>';
      return;
    }

    const atividade = JSON.parse(dados);

    const container = document.getElementById('dadosAtividade');
    container.innerHTML = `
      <p><strong>Nome:</strong> ${atividade.nome}</p>
      <p><strong>Data:</strong> ${atividade.data}</p>
      <p><strong>Status:</strong> ${atividade.status}</p>
    `;

    localStorage.removeItem('atividadeSalva');
  }
});
