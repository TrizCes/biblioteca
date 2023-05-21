import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';
import { log } from 'console';

const caminho = process.argv;

async function imprimeLista(valida, lista, identificador = '') {
  if(valida){
    console.log(chalk.yellowBright('Lista validada: '), chalk.black.bgGreen(identificador), '\n');
    console.log(await listaValidada(lista));
  }else{
  console.log(chalk.yellowBright('Lista de links: '), chalk.black.bgGreen(identificador), '\n');
  console.log(lista);
  }
}

async function processaTexto(args) {
  const caminho = args[2];
  const valida = args[3] === '--valida' ? true : false;

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('Arquivo ou diretório não existente');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(valida, lista, nomeDeArquivo);
    });
  }
}

processaTexto(caminho);
