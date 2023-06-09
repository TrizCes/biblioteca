import fs from 'fs';
import chalk from 'chalk';
import libChalk from 'chalk';

function extraiLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...text.matchAll(regex)];
  const result = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return result.length !== 0 ? result : 'Não há links no arquivo';
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
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.magenta('\n Operação execultada \n \n'));
  }
}

export default pegaArquivo;


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
