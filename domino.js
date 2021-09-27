const stock = [];
const gamingBoard = [];
let boardNumbers = [];
function Player(name, hand, turn) {
  (this.name = name), (this.hand = hand), (this.turn = turn);
}
const Rob = new Player('Rob', [], false);
const Alice = new Player('Alice', [], false);

function generateStock() {
  for (let n1 = 0; n1 < 7; n1++) {
    for (let n2 = 0; n2 <= n1; n2++) {
      stock.push([n2, n1]);
    }
  }
  const st = document.getElementById('stockId');
  st.addEventListener('click', () => drawATile());
}

function shuffleTiles() {
  for (let i = 0; i < 28; i++) {
    let tempIndex = stock[i];
    let randomizedIndex = Math.floor(Math.random() * 28);
    stock[i] = stock[randomizedIndex];
    stock[randomizedIndex] = tempIndex;
  }
}

function distributeDominoes() {
  let i = 0;
  while (i < 14) {
    const p1Hand = stock.shift(i);
    Rob.hand.push(p1Hand);
    i += 1;
    const p2Hand = stock.shift(i);
    i += 1;
    Alice.hand.push(p2Hand);
  }

  for (let [i, v] of Rob.hand.entries()) {
    createAndAppendElem(
      'li',
      Rob.name,
      'tile-items',
      v.toString().replace(',', '|'),
      i
    );
  }

  for (let [i, v] of Alice.hand.entries()) {
    createAndAppendElem(
      'li',
      Alice.name,
      'tile-items',
      v.toString().replace(',', '|'),
      i
    );
  }

  const boardTable = document.querySelector('.board');
  boardTable.classList.remove('board_display-none');
}
sumRecursiveArray = (arr) => {
  return arr.reduce(function (acc, value) {
    return acc + (Array.isArray(value) ? sumRecursiveArray(value) : value);
  }, 0);
};
function comparingCount() {
  let RobSum = sumRecursiveArray(Rob.hand);
  let AliceSum = sumRecursiveArray(Alice.hand);
  if (RobSum > AliceSum) {
    displayTemporaryElement(
      ` Tiles are shuffled. Rob Turn`,
      `alert-count`
    );
    return (Rob.turn = true);
  } else {
    displayTemporaryElement(
      ` Tiles are shuffled. Alice Turn`,
      `alert-count`
    );
    return (Alice.turn = true);
  }
}
function updateList(list, player) {
  const listToUpdate = document.getElementById(list);
  while (listToUpdate.firstChild) {
    listToUpdate.removeChild(listToUpdate.lastChild);
  }

  for (let [i, v] of player.hand.entries()) {
    createAndAppendElem(
      'li',
      player.name,
      'tile-items',
      v.toString().replace(',', '|'),
      i
    );
  }
}

function updateStock() {
  const stockBlock = document.getElementById('stockId');
  stockBlock.innerText = `Stock ${stock.length}`;
  stockBlock.classList.remove('hide');
}

function drawATile() {
  const newTile = stock.shift();
  const playerCantPlay =
    !newTile.includes(boardNumbers[0]) && !newTile.includes(boardNumbers[1]);

  if (!stock.length && playerCantPlay) {
    const gameOver = document.querySelector('.container_game-over');
    gameOver.style.display = 'block';
  }

  if (playerCantPlay) {
    displayTemporaryElement('Draw again', 'alert_danger');
  } else {
    displayTemporaryElement('You can play now.', 'alert_success');
    isButtonDisabled('stockId', true);
  }

  updateStock(`Stock ${stock.length}`);
  if (Rob.turn) {
    Rob.hand.push(newTile);
    updateList(Rob.name, Rob);
  } else {
    Alice.hand.push(newTile);
    updateList(Alice.name, Alice);
  }
}

function startTheGame() {
  generateStock();
  shuffleTiles();
  distributeDominoes();
  isButtonDisabled('game-start', true);
  isButtonDisabled('stockId', true);
  comparingCount();
  const newGameBtn = document.getElementById('newGame');
  const gameStart = document.getElementById('game-start');
  gameStart.classList.add('hide');
  newGameBtn.classList.remove('hide');

  const initialTile = stock.shift();
  gamingBoard.unshift(initialTile);
  updateStock();
  const leftNum = gamingBoard[0][0];
  const rightNum = gamingBoard[gamingBoard.length - 1][1];
  boardNumbers.push([leftNum, rightNum]);
  if (Rob.turn) {
    document.getElementById('Alice').classList.add('list_visibility');
  } else {
    document.getElementById('Rob').classList.add('list_visibility');
  }

  writeProcessOnBoard(`The game started. The board is `),
    writeProcessOnBoardButton(`${boardNumbers}`);
}

function gamePlay(player, board, selectedTile, inx) {
  let playableTiles = [];

  for (let i of player.hand) {
    if (i.includes(board[0]) || i.includes(board[1])) {
      playableTiles.push(i);
    }
  }

  if (!playableTiles.length) {
    //check stock
    if (stock.length) {
      displayTemporaryElement(
        `${player.name} can't play. Please draw a tile`,
        'alert_danger'
      );
      isButtonDisabled('stockId', false);
      return;
    } else {
      const gameOver = document.querySelector('.container_game-over');
      gameOver.style.display = 'block';
    }
  }

  //in case of selecting the other persons tile
  const playerHasTile = player.hand.includes(selectedTile);

  if (!playerHasTile || selectedTile === undefined) {
    displayTemporaryElement(
      `This is not your tile. Please select one from yours!`,
      'alert_danger'
    );

    return;
  }

  // in case of selecting unplayable tile
  const isNoMatch =
    selectedTile[0] !== board[0] &&
    selectedTile[0] !== board[1] &&
    selectedTile[1] !== board[0] &&
    selectedTile[1] !== board[1];

  if (isNoMatch) {
    displayTemporaryElement(
      'You cannot play this tile. Please select another one!',
      'alert_danger'
    );
    return;
  }

  if (selectedTile[0] === board[0] && selectedTile[0] === board[1]) {
    pushTile(player, selectedTile, inx, false);
  } else if (selectedTile[1] === board[0] && selectedTile[1] === board[1]) {
    unshiftTile(player, selectedTile, inx, false);
  } else if (selectedTile[0] === board[0] && selectedTile[0] !== board[1]) {
    unshiftTile(player, selectedTile, inx, true);
  } else if (selectedTile[0] === board[1] && selectedTile[0] !== board[0]) {
    pushTile(player, selectedTile, inx, false);
  } else if (selectedTile[1] === board[0] && selectedTile[1] !== board[1]) {
    unshiftTile(player, selectedTile, inx, false);
  } else if (selectedTile[1] === board[1] && selectedTile[1] !== board[0]) {
    pushTile(player, selectedTile, inx, true);
  }

  const boardItems = gamingBoard.map((item) => {
    return `<${item.toString().replace(',', ':')}>`;
  });

  setTimeout(() => {
    writeProcessOnBoard(`${player.name} played ${selectedTile}.`);
    gamingBoard.forEach((tile) => {
      writeProcessOnBoardButton(`${tile}`);
      
    });
  }, 50);
  if (!player.hand.length) {
    const restartButton = document.getElementById('restart-game');
    const h4 = document.createElement('h4');
    h4.innerText = `${player.name} wins the game!`;
    restartButton.insertAdjacentElement('beforebegin', h4);
    const gameOver = document.querySelector('.container-win');
    gameOver.style.display = 'block';
  }

  if (player === Rob) {
    Rob.turn = false;
    Alice.turn = true;
    document.getElementById('Rob').classList.add('list_visibility');
    document.getElementById('Alice').classList.remove('list_visibility');

    displayTemporaryElement(' Alice   turn play now.', 'alert-count');
  } else {
    Rob.turn = true;
    Alice.turn = false;
    document.getElementById('Alice').classList.add('list_visibility');
    document.getElementById('Rob').classList.remove('list_visibility');
    displayTemporaryElement(' Rob   turn play now.', 'alert-count');
  }
}

function playerStartsToPlay(event) {
  const index = event.target.id;
  const leftNum = gamingBoard[0][0];
  const rightNum = gamingBoard[gamingBoard.length - 1][1];
  boardNumbers = [leftNum, rightNum];
  if (Rob.turn) {
    gamePlay(Rob, boardNumbers, Rob.hand[index], index);
  } else {
    gamePlay(Alice, boardNumbers, Alice.hand[index], index);
  }
}

function createAndAppendElem(child, parent, className, content, id = '') {
  const parentElem = document.getElementById(parent);
  const childElem = document.createElement(child);
  parentElem.appendChild(childElem);
  childElem.setAttribute('id', id);
  childElem.classList.add(className);
  childElem.innerText = content;
}

function writeProcessOnBoardButton(content) {
  const boardDiv = document.querySelector('.board');
  const button = document.createElement('button');
  button.classList.add('tileButton');
  button.innerText = content;

  boardDiv.insertAdjacentElement('beforeend', button);
}
function writeProcessOnBoard(content, writeProcessOnBoardButton) {
  const boardDiv = document.querySelector('.board');
  const p = document.createElement('p');
  p.classList.add('board_game-process');
  p.innerText = content;
  boardDiv.insertAdjacentElement('beforeend', p);
  writeProcessOnBoardButton;
}

function displayTemporaryElement(text, alertType) {
  const infoContainer = document.querySelector('.container_info');
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'inquirer');
  newDiv.classList.add(alertType);
  newDiv.innerText = text;

  infoContainer.appendChild(newDiv);
  setTimeout(function () {
    const tempDiv = document.getElementById('inquirer');
    tempDiv.remove();
  }, 100);
}

function isButtonDisabled(id, option) {
  document.getElementById(id).disabled = option;
}

function pushTile(player, tile, index, reverse) {
  if (reverse) {
    tile.reverse();
  }

  player.hand.splice(index, 1);
  gamingBoard.push(tile);

  updateList(player.name, player);
}

function unshiftTile(player, tile, index, reverse) {
  if (reverse) {
    tile.reverse();
  }
  player.hand.splice(index, 1);
  gamingBoard.unshift(tile);

  updateList(player.name, player);
}
