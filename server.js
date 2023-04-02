const simpleGit = require("simple-git");
const cron = require("node-cron");

// Define o repositório e o intervalo de atualização
const repo = simpleGit("git@github.com:anaelj/autoupdate.git");
const intervaloAtualizacao = "*/1 * * * *"; // atualiza a cada 10 minutos

// Define a tarefa de atualização
const tarefaAtualizacao = cron.schedule(intervaloAtualizacao, () => {
  console.log("Verificando atualizações...");
  repo.pull((err, atualizacao) => {
    if (atualizacao && atualizacao.summary.changes) {
      console.log(`Atualizado para a versão ${atualizacao.summary.changes}!`);
    } else {
      console.log("Nenhuma atualização disponível.");
    }
  });
});

// Inicia a tarefa de atualização
tarefaAtualizacao.start();
