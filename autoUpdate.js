import cron from "node-cron";
import { simpleGit, CleanOptions } from "simple-git";

const options = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// Define o repositório e o intervalo de atualização
const repo = simpleGit("https://github.com/anaelj/autoupdate", options).clean(
  CleanOptions.FORCE
);
const intervaloAtualizacao = "*/1 * * * *"; // atualiza a cada 2 minutos

// Define a tarefa de atualização
export const tarefaAtualizacao = cron.schedule(intervaloAtualizacao, () => {
  console.log("Verificando atualizações...");
  repo.pull((err, atualizacao) => {
    if (atualizacao && atualizacao.summary.changes) {
      console.log(`Atualizado!`);
    } else {
      console.log("Nenhuma atualização disponível.");
    }
  });
});

// Inicia a tarefa de atualização
// tarefaAtualizacao.start();
