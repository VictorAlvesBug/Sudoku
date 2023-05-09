export default function createConjuntoPosicoes(descricao) {
  const conjuntoPosicoes = {};

  conjuntoPosicoes.descricao = descricao;
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

    // Reune em uma única lista todos os valores possiveis de todas as posições
    // não resolvidas do conjunto.
    /* 
    Ex: 
    Entrada:
    [
      [1, 6], 
      [1, 2, 5], 
      [5, 6]
    ]
    
    Saída: 
    [1, 6, 1, 2, 5, 5, 6]
    */
    const listaValores = conjuntoPosicoes.posicoes.reduce((acc, posicao) => {
      if (posicao.estaResolvida()) {
        return acc;
      }

      return acc.concat(posicao.possiveisValores);
    }, []);

    // Agrupa valores, identificando quantas vezes cada um se repete.
    /*
    Ex: 
    Entrada:
    [1, 6, 1, 2, 5, 5, 6]
    
    Saída:
    {
      '1': 2, 
      '6': 2, 
      '2': 1,
      '5': 2
    }
    */
    const objValoresAgrupados = listaValores.reduce((acc, valorPossivel) => {
      if (acc[valorPossivel]) {
        acc[valorPossivel] += 1;
      } else {
        acc[valorPossivel] = 1;
      }

      return acc;
    }, {});

    // Retorna uma lista com apenas os valores que não se repedem
    /*
    Ex:
    Entrada:
    {
      '1': 2, 
      '6': 2, 
      '2': 1,
      '5': 2
    }

    Saída:
    [2]
    */
    const listaValoresUnicos = Object.entries(objValoresAgrupados)
      .filter(([valorPossivel, quantidade]) => quantidade === 1)
      .map(([valorPossivel, quantidade]) => Number(valorPossivel));

    //console.log(conjuntoPosicoes.descricao, listaValoresUnicos)

    // Atribui valor único na única posição do conjunto que o considera
    /*conjuntoPosicoes.posicoes.forEach((posicao) => {
      const valorUnico = posicao.possiveisValores
        .find(valor => listaValoresUnicos.includes(valor))
      if (valorUnico && valorUnico > 0) {
        console.log(conjuntoPosicoes.descricao, posicao.descricao, listaValoresUnicos)
        posicao.definirValorUnico(valorUnico);
      }
    });*/
  };

  return conjuntoPosicoes;
}
