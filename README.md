1. Instalação do Visual Studio Code

Primeiro, precisamos de um editor de código.

Acesse o site oficial: https://code.visualstudio.com/

Baixe a versão compatível com o seu sistema operacional (Windows, Mac ou Linux).

Instale normalmente, clicando em Next até o final.

Após a instalação, abra o VS Code.

2. Instalação do Node.js

Agora vamos instalar o Node.js, que permitirá rodar a nossa API.

Acesse: https://nodejs.org/

Escolha a versão LTS

Execute o instalador e finalize o processo.

Para confirmar a instalação:

Abra o Prompt de Comando (CMD).

Digite:

node -v
npm -v


Se aparecerem números de versão, significa que está tudo funcionando.

3. Preparando o projeto

Você vai receber o código da API em um arquivo .zip.

Extraia o conteúdo em uma pasta, por exemplo:

C:\projetos\tarefas


Abra o VS Code.

Clique em File > Open Folder e selecione a pasta do projeto.

4. Instalando as dependências

No VS Code, abra o terminal integrado:

Clique em Terminal > New Terminal.

No terminal, execute:

npm install


Esse comando instala as bibliotecas necessárias, incluindo o Express.

5. Iniciando o servidor

Ainda no terminal, rode:

node index.js


Se tudo estiver certo, aparecerá:

Servidor rodando em http://localhost:3000

Isso significa que sua API já está pronta para uso.

6. Instalando o Postman

O Postman será usado para testar a API.

Baixe em: https://www.postman.com/downloads/

Instale normalmente e faça login

7. Testando a API no Postman

Dentro do Postman:

Clique no botão “+” para criar uma nova requisição.

Escolha o método (GET, POST, PUT ou DELETE).

No campo de URL, use o endereço:

http://localhost:3000/tarefas

8. Listando tarefas (GET)

Método: GET

URL: http://localhost:3000/tarefas


Clique em Send → você verá a lista de tarefas cadastradas.

9. Criando uma tarefa (POST)

Método: POST

URL:

http://localhost:3000/tarefas


Vá em Body > raw > JSON e digite:

{
  "titulo": "Estudar",
  "descricao": "Praticar Node.js"
}


Clique em Send → a API retornará os dados da tarefa criada.

10. Atualizando uma tarefa (PUT)

Método: PUT

URL (substitua pelo ID da tarefa existente, exemplo 1):

http://localhost:3000/tarefas/1


No corpo, insira:

{
  "titulo": "Estudar mais",
  "descricao": "Aprofundar em Express"
}


Clique em Send → a tarefa será atualizada.

11. Removendo uma tarefa (DELETE)

Método: DELETE

URL (substitua pelo ID da tarefa):

http://localhost:3000/tarefas/1


Clique em Send → a tarefa será apagada da lista.
