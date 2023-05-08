import createSudoku from './utils/sudoku.js';
import { normalizarStrSudoku } from './utils/sudoku.js';

const divSudoku = document.querySelector('.sudoku');
const btnProcessar = document.querySelector('.btn-processar');

let strSudokuFacil = `
    _ _ _ 2 6 _ 7 _ 1 
    6 8 _ _ 7 _ _ 9 _ 
    1 9 _ _ _ 4 5 _ _ 
    8 2 _ 1 _ _ _ 4 _ 
    _ _ 4 6 _ 2 9 _ _ 
    _ 5 _ _ _ 3 _ 2 8 
    _ _ 9 3 _ _ _ 7 4 
    _ 4 _ _ 5 _ _ 3 6 
    7 _ 3 _ 1 8 _ _ _
        `;

let strSudokuMedio = `
    6 3 _ _ _ 2 _ _ _ 
    2 _ 4 _ _ _ 7 3 _ 
    _ _ _ _ 5 3 _ 4 2 
    _ 2 3 _ _ 8 9 _ 1 
    _ _ _ _ _ 9 _ 7 _ 
    9 _ _ _ 6 _ 5 2 _ 
    5 4 2 _ _ _ 8 9 6 
    _ _ 9 _ _ _ _ _ _ 
    _ _ 6 8 9 _ _ _ _ 
        `;

let strSudokuDificil = `
    9 _ _ _ _ 5 1 _ _ 
    _ _ 5 4 _ _ 8 _ _ 
    _ 4 7 _ _ _ _ _ _ 
    8 _ _ _ _ 3 _ _ 6 
    7 6 _ 9 _ _ _ _ 2 
    _ _ _ _ _ 4 _ _ 7 
    _ _ _ _ _ _ _ _ _ 
    6 _ _ _ _ 9 3 _ _ 
    5 _ _ _ 2 _ _ _ 8 
        `;

//const strSudoku = normalizarStrSudoku(strSudokuFacil);
const strSudoku = normalizarStrSudoku(strSudokuMedio);
//const strSudoku = normalizarStrSudoku(strSudokuDificil);

const sudoku = createSudoku(strSudoku);

document.addEventListener('DOMContentLoaded', () => {
  renderizarSudoku(true);
});

function renderizarSudoku(apenasPosicoesResolvidas = false) {
  divSudoku.innerHTML = '';

  for (let iLinha = 0; iLinha < 9; iLinha++) {
    let strDivLinha = '<div class="linha">';

    for (let iColuna = 0; iColuna < 9; iColuna++) {
      const posicao = sudoku.posicoes[iLinha][iColuna];
      let strDivPosicao = '<div class="posicao">';

      if (posicao.estaResolvida()) {
        const valorUnico = posicao.retornarValorUnico();
        strDivPosicao += `<span class="valor-unico">${valorUnico}</span>`;
      } else if (!apenasPosicoesResolvidas){
        posicao.possiveisValores.forEach((possivelValor) => {
          strDivPosicao += `<span class="opcao" data-valor="${possivelValor}">${possivelValor}</span>`;
        }, '');
      }

      strDivPosicao += '</div>';
      strDivLinha += strDivPosicao;
    }
    strDivLinha += '</div>';

    divSudoku.innerHTML += strDivLinha;
  }
}

btnProcessar.addEventListener('click', () => {
  sudoku.processar();
  renderizarSudoku();
  if (sudoku.estaResolvido()) {
    alert('Sudoku resolvido com sucesso!');
  }
});
