import fs from 'fs';
import chalk from 'chalk';
import libChalk from 'chalk';

function extraiLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = regex.exec(text);
  console.log(capturas);
}

function trataErro(erro) {
  console.log(chalk.red(erro));
  throw new Error(libChalk.bgYellowBright.red(erro.code, 'Não existem arquivos no diretório'));
}

// async/await
async function pegaArquivo(destination) {
  const encoding = 'utf-8';
  try {
    const texto = await fs.promises.readFile(destination, encoding);
    console.log(chalk.gray(texto));
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow('operação concluída'));
  }
}

//Promises com then()
/*
function pegaArquivo(destination) {
  const encoding = 'utf8';
  fs.promises
    .readFile(destination, encoding)
    .then((data) => console.log(chalk.gray(data)))
    .catch((err) => trataErro(err));
}
*/
//Função sem assincronismo
/*function pegaArquivo(destination) {
  const encoding = 'utf8';
  fs.readFile(destination, encoding, (erro, data) => {
    if (erro) {
      trataErro(erro);
    }
    console.log(chalk.green(data));
  });
}*/

//pegaArquivo('./arquivos/texto.md');
