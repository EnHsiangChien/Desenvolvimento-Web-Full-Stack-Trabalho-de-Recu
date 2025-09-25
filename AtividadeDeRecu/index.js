const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Lista de tarefas em memória
let tarefas = [];
let id = 1;

// Criar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;
  const tarefa = { id: id++, titulo, descricao };
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

// Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Atualizar tarefa por ID
app.put("/tarefas/:id", (req, res) => {
  const tarefaId = parseInt(req.params.id);
  const { titulo, descricao } = req.body;
  const tarefa = tarefas.find(t => t.id === tarefaId);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefa.titulo = titulo || tarefa.titulo;
  tarefa.descricao = descricao || tarefa.descricao;

  res.json(tarefa);
});

// Deletar tarefa por ID
app.delete("/tarefas/:id", (req, res) => {
  const tarefaId = parseInt(req.params.id);
  tarefas = tarefas.filter(t => t.id !== tarefaId);
  res.json({ mensagem: "Tarefa removida com sucesso" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
