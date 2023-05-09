export default function createPosicao(iColuna, iLinha, qtdeValores) {
  const posicao = {};

  posicao.descricao = `Posição (${iColuna+1}, ${iLinha+1})`;
  posicao.qtdeValores = qtdeValores;

  posicao.possiveisValores = [];

  for (let i = 1; i <= qtdeValores; i++) {
    posicao.possiveisValores.push(i);
  }

  posicao.removerPossivelValor = (valorRemover) => {
    const indiceValorRemover = posicao.possiveisValores.indexOf(valorRemover);
    if(indiceValorRemover > -1){
        posicao.possiveisValores.splice(indiceValorRemover, 1);
    }
  };

  posicao.estaResolvida = () => {
    return posicao.possiveisValores.length === 1;
  };

  posicao.retornarValorUnico = () => {
    if (posicao.estaResolvida()) {
      return posicao.possiveisValores[0];
    }
    return alert('Não é possível retornar o valor único de uma posição não resolvida!');
  };

  posicao.definirValorUnico = (valorUnico) => {
    posicao.possiveisValores = [valorUnico];
  };

  return posicao;
}
