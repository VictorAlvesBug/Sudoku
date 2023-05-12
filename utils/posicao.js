export default function createPosicao(iColuna, iLinha, qtdeValores) {
  const posicao = {};

  posicao.descricao = `Posição (${iColuna + 1}, ${iLinha + 1})`;
  posicao.qtdeValores = qtdeValores;

  let possiveisValores = [];

  for (let i = 1; i <= qtdeValores; i++) {
    possiveisValores.push(i);
  }

  posicao.removerPossivelValor = (valorRemover) => {
    const indiceValorRemover = possiveisValores.indexOf(valorRemover);
    if (indiceValorRemover > -1) {
      possiveisValores.splice(indiceValorRemover, 1);
    }

    if (posicao.estaResolvida()) {
      console.log(
        `${
          posicao.descricao
        } resolvida com valor "${posicao.retornarValorUnico()}".`
      );
    }
  };

  posicao.estaResolvida = () => {
    return possiveisValores.length === 1;
  };

  posicao.retornarValorUnico = () => {
    if (posicao.estaResolvida()) {
      return possiveisValores[0];
    }
    return alert(
      'Não é possível retornar o valor único de uma posição não resolvida!'
    );
  };

  posicao.definirValorInicial = (valorUnico) => {
    possiveisValores = [valorUnico];
  };

  posicao.definirValorUnico = (valorUnico) => {
    console.log(`${posicao.descricao} resolvida com valor "${valorUnico}".`);
    possiveisValores = [valorUnico];
  };

  posicao.ehUmPossivelValor = (valor) => {
    return possiveisValores.includes(valor);
  };

  posicao.retornarPossiveisValores = () => {
    return possiveisValores;
  };

  return posicao;
}
