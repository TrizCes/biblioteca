import chalk from 'chalk';

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(response);
        return response.status;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  );
  return arrStatus;
}

function manejaErros(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado';
  } else {
    return 'Ocorreu algum erro';
  }
}

export default async function listaValidada(linksLista) {
  const links = extraiLinks(linksLista);
  const status = await checaStatus(links);

  return linksLista.map((obj, indice) => ({
    ...obj,
    status: status[indice],
  }));
}
