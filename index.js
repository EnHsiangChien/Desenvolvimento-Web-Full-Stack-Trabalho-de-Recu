const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tarefas = [];
let idAtual = 1;

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: idAtual++,
    titulo,
    descricao: descricao || "",
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  const tarefa = tarefas.find((t) => t.id === parseInt(id));

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (descricao !== undefined) tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

  app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});