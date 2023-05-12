import createPosicao from './posicao.js';
import createConjuntoPosicoes from './conjuntoPosicoes.js';
import createConjuntoQuadrante from './conjuntoQuadrante.js';

export default function createSudoku(strSudoku) {
  const sudoku = {};
  const qtdeValores = 9;
  const qtdeQuadrantes = Math.sqrt(qtdeValores);

  sudoku.posicoes = [];

  sudoku.linhas = [];
  sudoku.colunas = [];
  sudoku.linhasQuadrante = [];
  sudoku.colunasQuadrante = [];
  for (let i = 0; i < qtdeValores; i++) {
    sudoku.linhas.push(createConjuntoPosicoes(`Linha #${(i+1)}`));
    sudoku.colunas.push(createConjuntoPosicoes(`Coluna #${(i+1)}`));
    sudoku.linhasQuadrante.push(createConjuntoQuadrante());
    sudoku.colunasQuadrante.push(createConjuntoQuadrante());
  }

  sudoku.quadrantes = [];
  for (let iLinQuadrante = 0; iLinQuadrante < qtdeQuadrantes; iLinQuadrante++) {
    sudoku.quadrantes[iLinQuadrante] = [];
    for (
      let iColQuadrante = 0;
      iColQuadrante < qtdeQuadrantes;
      iColQuadrante++
    ) {
      sudoku.quadrantes[iLinQuadrante].push(createConjuntoPosicoes(`Quadrante (${(iLinQuadrante+1)}, ${(iColQuadrante+1)})`));
    }
  }

  for (let iLinha = 0; iLinha < qtdeValores; iLinha++) {
    sudoku.posicoes[iLinha] = [];
    for (let iColuna = 0; iColuna < qtdeValores; iColuna++) {
      const posicao = createPosicao(iLinha, iColuna, qtdeValores);
      sudoku.posicoes[iLinha][iColuna] = posicao;
      const linha = sudoku.linhas[iLinha];
      const coluna = sudoku.colunas[iColuna];

      linha.adicionarPosicao(posicao);
      coluna.adicionarPosicao(posicao);

      const iLinQuadrante = Math.floor(iLinha / qtdeQuadrantes);
      const iColQuadrante = Math.floor(iColuna / qtdeQuadrantes);
      const quadrante = sudoku.quadrantes[iLinQuadrante][iColQuadrante];
      quadrante.adicionarPosicao(posicao);

      const indice = iLinha * qtdeValores + iColuna;
      if (strSudoku[indice].match(/^\d$/)) {
        const valorUnico = Number(strSudoku[indice]);
        sudoku.posicoes[iLinha][iColuna].definirValorInicial(valorUnico);
      }
    }
  }

  for (let iQuadrante = 0; iQuadrante < qtdeQuadrantes; iQuadrante++) {
    const linhaQuadrante = sudoku.linhasQuadrante[iQuadrante];
    const colunaQuadrante = sudoku.colunasQuadrante[iQuadrante];

    const iInicial = iQuadrante * qtdeQuadrantes;
    const iFinal = (iQuadrante + 1) * qtdeQuadrantes;
    for (let i = iInicial; i < iFinal; i++) {
      const linha = sudoku.linhas[i];
      const coluna = sudoku.colunas[i];
      linhaQuadrante.adicionarConjunto(linha);
      colunaQuadrante.adicionarConjunto(coluna);
    }

    /*for (let iColuna=0; iColuna<qtdeValores; iColuna++){
        const coluna = sudoku.colunas[iColuna];
        linhaQuadrante.adicionarColuna(coluna);
    }

    for (let iColQuadrante=0; iColQuadrante<qtdeQuadrantes; iColQuadrante++){
        const quadrante = sudoku.quadrantes[iLinQuadrante][iColQuadrante];
        linhaQuadrante.adicionarQuadrante(quadrante);
    }*/
  }

  sudoku.limparPosicoes = () => {
    sudoku.linhas.forEach((linha) => linha.limparPosicoes());
    sudoku.colunas.forEach((coluna) => coluna.limparPosicoes());
    sudoku.quadrantes.forEach((linhaQuadrante) =>
      linhaQuadrante.forEach((quadrante) => quadrante.limparPosicoes())
    );

    sudoku.linhasQuadrante.forEach((linhaQuadrante) =>
      linhaQuadrante.limparPosicoes()
    );
    sudoku.colunasQuadrante.forEach((colunaQuadrante) =>
      colunaQuadrante.limparPosicoes()
    );

  };

  sudoku.estaResolvido = () => {
    return sudoku.posicoes.every((linha) =>
      linha.every((posicao) => posicao.estaResolvida())
    );
  };

  sudoku.processar = () => {
    if (sudoku.estaResolvido()) {
      return;
    }

    sudoku.limparPosicoes();
  };

  return sudoku;
}

function normalizarStrSudoku(strSudoku) {
  const caracteres = strSudoku.split('');
  const caracteresNormalizados = caracteres.filter((caracter) =>
    caracter.match(/^[\d_]$/)
  );

  return caracteresNormalizados.join('');
}

export { normalizarStrSudoku };
