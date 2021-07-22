// Start
let board = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
};
let turn = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
  let item = event.target.getAttribute('data-item');
  if(playing && board[item] === '') {
    board[item] = turn;
    renderBoard();
    toggleTurn();
  }
}


function reset() {
  warning = '';

  let random = Math.floor(Math.random() * 2);
  turn = (random === 0) ? 'x' : 'o';
  
  for(let i in board) {
    board[i] = '';
  }

  playing = true;

  renderBoard();
  renderInfo();
}

function renderBoard() {
  for(let i in board) {
    let item = document.querySelector(`div[data-item=${i}]`);
      item.innerHTML = board[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector('.turn').innerHTML = turn;
  document.querySelector('.result').innerHTML = warning;
}

function toggleTurn() {
  turn = (turn === 'x') ? 'o' : 'x';
  renderInfo();
}

function checkGame() {
  if(checkWinnerFor('x')) {
    warning = 'O "x" venceu!';
    playing = false;
  } else if(checkWinnerFor('o')) {
    warning = 'O "o" venceu!';
    playing = false;
  } else if(isTie()) {
    warning = "Deu empate!"
    playing = false;
  }
}

function checkWinnerFor(turn) {
  let possibilities = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for(let p in possibilities) {
    let pArray = possibilities[p].split(',');
    let won = pArray.every(option => board[option] === turn);
    if(won) {
      return true;
    }
  } 
  return false;
}

function isTie() {
  for(let i in board) {
    if(board[i] === ''){
      return false;
    } 
  }
  return true;
}