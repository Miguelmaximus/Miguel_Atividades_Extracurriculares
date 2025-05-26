class AtividadeExtracurricular {
    constructor(nome, descricao, participantes) {
      this.nome = nome;
      this._descricao = descricao;
      this.participantes = participantes; // array
    }

    get descricao() {
      return this._descricao;
    }

    set descricao(novaDescricao) {
      if (novaDescricao.length > 10) {
        this._descricao = novaDescricao;
        console.log("Descrição atualizada com sucesso.");
      } else {
        console.log("A descrição deve ter pelo menos 10 caracteres.");
      }
    }

    exibirDados() {
      return `
        <strong>${this.nome}</strong><br>
        📝 Descrição: ${this._descricao}<br>
        👥 Participantes: ${this.participantes.join(", ")}
      `;
    }

    adicionarParticipante(nome) {
      if (!this.participantes.includes(nome)) {
        this.participantes.push(nome);
        console.log(`${nome} foi adicionado.`);
        return true;
      }
      console.log(`${nome} já está na lista.`);
      return false;
    }

    removerParticipante(nome) {
      const idx = this.participantes.indexOf(nome);
      if (idx >= 0) {
        this.participantes.splice(idx, 1);
        console.log(`${nome} removido.`);
        return true;
      }
      console.log(`${nome} não encontrado.`);
      return false;
    }
  }

  const atividades = [];

  const form = document.getElementById('formAtividade');
  const listaAtividades = document.getElementById('listaAtividades');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const participantesInput = document.getElementById('participantes').value.trim();

    const participantes = participantesInput.split(',').map(p => p.trim()).filter(p => p.length > 0);

    if (descricao.length <= 10) {
      alert("A descrição deve ter pelo menos 10 caracteres.");
      return;
    }

    const atividade = new AtividadeExtracurricular(nome, descricao, participantes);
    atividades.push(atividade);

    alert(`Atividade "${nome}" cadastrada com sucesso!`);

    form.reset();
    listarAtividades();
  });

  function listarAtividades() {
    listaAtividades.innerHTML = "";

    if (atividades.length === 0) {
      listaAtividades.innerHTML = "<p>Nenhuma atividade cadastrada.</p>";
      return;
    }

    atividades.forEach((atividade, index) => {
      const div = document.createElement('div');
      div.classList.add('atividade-item');
      div.innerHTML = `
        <p>${atividade.exibirDados()}</p>
        <button onclick="editarAtividade(${index})">Editar</button>
        <button onclick="excluirAtividade(${index})">Excluir</button>
      `;
      listaAtividades.appendChild(div);
    });
  }

  function excluirAtividade(index) {
    if (confirm(`Deseja realmente excluir a atividade "${atividades[index].nome}"?`)) {
      atividades.splice(index, 1);
      listarAtividades();
    }
  }

  function editarAtividade(index) {
    const atividade = atividades[index];

    const novoNome = prompt("Editar título da atividade:", atividade.nome);
    if (novoNome && novoNome.trim() !== "") atividade.nome = novoNome.trim();

    const novaDescricao = prompt("Editar descrição (min 10 caracteres):", atividade.descricao);
    if (novaDescricao && novaDescricao.trim().length > 10) atividade.descricao = novaDescricao.trim();
    else alert("Descrição inválida, mantendo antiga.");

    const novosParticipantes = prompt("Editar participantes (separados por vírgula):", atividade.participantes.join(", "));
    if (novosParticipantes) {
      atividade.participantes = novosParticipantes.split(",").map(p => p.trim()).filter(p => p.length > 0);
    }

    listarAtividades();
  }