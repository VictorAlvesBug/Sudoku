import createConjuntoPosicoes from './conjuntoPosicoes.js';

export default function createConjuntoQuadrante(indice) {
  const conjuntoQuadrante = {};

  conjuntoQuadrante.indice = indice;

  conjuntoQuadrante.conjuntosPosicoes = [];

  conjuntoQuadrante.adicionarConjunto = (conjunto) => {
    conjuntoQuadrante.conjuntosPosicoes.push([]);
    for (let iConjunto = 0; iConjunto < 3; iConjunto++) {
      const conjuntoPosicoes = createConjuntoPosicoes();
      for (
        let iPosicao = 3 * iConjunto;
        iPosicao < 3 * iConjunto + 3;
        iPosicao++
      ) {
        const posicao = conjunto.posicoes[iPosicao];
        conjuntoPosicoes.adicionarPosicao(posicao);
      }
      const iUltimoElemento = conjuntoQuadrante.conjuntosPosicoes.length - 1;
      conjuntoQuadrante.conjuntosPosicoes[iUltimoElemento].push(conjuntoPosicoes);
    }
  };

  conjuntoQuadrante.limparPosicoes = () => {
    conjuntoQuadrante.conjuntosPosicoes.forEach(
      (linhaConjuntos, iLinConjunto) => {
        linhaConjuntos.forEach((conjunto, iColConjunto) => {
          const posicoesNaoResolvidas = conjunto.posicoes.filter(
            (posicao) => !posicao.estaResolvida()
          );

          if (posicoesNaoResolvidas.length === 1) {
            const posicaoNaoResolvida = posicoesNaoResolvidas[0];
            posicaoNaoResolvida.possiveisValores.forEach((possivelValor) => {
              let qtdeVezesValorEncontrado = 0;
              for (let iLin = 0; iLin < 3; iLin++) {
                for (let iCol = 0; iCol < 3; iCol++) {
                  if (iLin !== iLinConjunto && iColConjunto !== iCol) {
                    const conjuntoPosicoes = conjuntoQuadrante.conjuntosPosicoes[iLin][iCol];
                    
                    if(conjuntoPosicoes.possuiValor(possivelValor)){
                      qtdeVezesValorEncontrado++;
                    }
                    else{
                      const estaDentreValoresPossiveis = conjuntoPosicoes.possivelValor(possivelValor);
                      let conjuntosAdjacentesNaoPossuem = true;

                      for (let iLinAdj = 0; iLinAdj < 3; iLinAdj++) {
                          if(iLin !== iLinAdj){
                            const conjuntoAdjacente = conjuntoQuadrante.conjuntosPosicoes[iLinAdj][iCol];

                            if(conjuntoAdjacente.possivelValor(possivelValor)){
                              conjuntosAdjacentesNaoPossuem = false;
                            }
                          }
                      }
                      
                      if(estaDentreValoresPossiveis 
                        && conjuntosAdjacentesNaoPossuem){
                          qtdeVezesValorEncontrado++;
                      }

                    }
                  }

                }
              }

              if(qtdeVezesValorEncontrado === 2){
                posicaoNaoResolvida.definirValorUnico(possivelValor);
              }
            });
          }
        });
      }
    );
  };

  return conjuntoQuadrante;
}
