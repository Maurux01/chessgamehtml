const chessboard = document.getElementById("chessboard");
const pieces = {
  rook: "♜",
  knight: "♞",
  bishop: "♝",
  queen: "♛",
  king: "♚",
  pawn: "♟",
};

// Configuración inicial del tablero
const initialBoard = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
];

const colors = [
  ["black", "black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black", "black"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white"],
];

let selectedPiece = null;
let selectedPosition = null;
let turn = "white"; // Comienza el turno del jugador

// Crear el tablero
function createBoard() {
  chessboard.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${((row + col) % 2 === 0 ? "white" : "black")}`;
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = initialBoard[row][col];
      if (piece) {
        const pieceElement = document.createElement("span");
        pieceElement.textContent = pieces[piece];
        pieceElement.className = `piece ${colors[row][col]}`;
        pieceElement.dataset.row = row;
        pieceElement.dataset.col = col;
        square.appendChild(pieceElement);
      }

      square.addEventListener("click", () => onSquareClick(row, col));
      chessboard.appendChild(square);
    }
  }
}

function onSquareClick(row, col) {
  if (turn === "white") {
    if (selectedPiece) {
      movePiece(row, col);
    } else {
      selectPiece(row, col);
    }
  }
}

function selectPiece(row, col) {
  const piece = initialBoard[row][col];
  const color = colors[row][col];
  if (piece && color === "white") {
    selectedPiece = { piece, color, row, col };
    selectedPosition = { row, col };
    console.log(`Seleccionaste ${piece} en (${row}, ${col})`);
  }
}

function movePiece(row, col) {
  if (selectedPiece) {
    const { piece, color } = selectedPiece;
    initialBoard[selectedPosition.row][selectedPosition.col] = null;
    initialBoard[row][col] = piece;
    colors[selectedPosition.row][selectedPosition.col] = null;
    colors[row][col] = color;

    selectedPiece = null;
    selectedPosition = null;
    turn = "black";
    createBoard();
    setTimeout(cpuMove, 1000); // La CPU se mueve después de 1 segundo
  }
}

function cpuMove() {
  const moves = getValidMoves("black");
  if (moves.length > 0) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const { fromRow, fromCol, toRow, toCol } = randomMove;

    const piece = initialBoard[fromRow][fromCol];
    initialBoard[fromRow][fromCol] = null;
    initialBoard[toRow][toCol] = piece;
    colors[fromRow][fromCol] = null;
    colors[toRow][toCol] = "black";

    console.log(`La CPU movió ${piece} de (${fromRow}, ${fromCol}) a (${toRow}, ${toCol})`);
    createBoard();
    turn = "white";
  }
}

function getValidMoves(color) {
  const moves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (colors[row][col] === color) {
        const piece = initialBoard[row][col];
        const validMoves = getPieceMoves(piece, row, col);
        validMoves.forEach(({ toRow, toCol }) => {
          moves.push({ fromRow: row, fromCol: col, toRow, toCol });
        });
      }
    }
  }
  return moves;
}

function getPieceMoves(piece, row, col) {
  // Lógica básica de movimientos (solo ejemplo, sin reglas estrictas)
  const moves = [];
  if (piece === "pawn") {
    const direction = colors[row][col] === "white" ? -1 : 1;
    if (initialBoard[row + direction] && !initialBoard[row + direction][col]) {
      moves.push({ toRow: row + direction, toCol: col });
    }
  }
  // Se pueden añadir más reglas para otras piezas aquí.
  return moves;
}

createBoard();
