export default function createConjuntoPosicoes() {
  const conjuntoPosicoes = {};

  conjuntoPosicoes.posicoes = [];

  conjuntoPosicoes.adicionarPosicao = (posicao) => {
    conjuntoPosicoes.posicoes.push(posicao);
  };

  conjuntoPosicoes.possuiValor = (valor) => {
    return conjuntoPosicoes.posicoes.some((posicao) => {
      return posicao.estaResolvida() && posicao.retornarValorUnico() === valor;
    });
  };

  conjuntoPosicoes.possivelValor = (valor) => {
    return conjuntoPosicoes.posicoes.some((posicao) => {
      return posicao.possiveisValores.includes(valor);
    });
  };

  conjuntoPosicoes.limparPosicoes = () => {
    const valoresUnicos = [];

    for (let valor = 1; valor <= 9; valor++) {
      if (conjuntoPosicoes.possuiValor(valor)) {
        valoresUnicos.push(valor);
      }
    }

    conjuntoPosicoes.posicoes.forEach((posicao) => {
      if (!posicao.estaResolvida()) {
        valoresUnicos.forEach((valorUnico) => {
          posicao.removerPossivelValor(valorUnico);
        });
      }
    });
  };

  return conjuntoPosicoes;
}
