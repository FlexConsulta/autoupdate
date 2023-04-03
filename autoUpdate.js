import cron from "node-cron";
import { simpleGit, CleanOptions } from "simple-git";

const options = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const repo = simpleGit("https://github.com/anaelj/autoupdate", options).clean(
  CleanOptions.FORCE
);
const intervaloAtualizacao = "*/1 * * * *"; // atualiza a cada 5 minutos

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
