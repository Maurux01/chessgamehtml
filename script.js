const chessboard = document.getElementById("chessboard");
const pieces = {
  rook: "♜",
  knight: "♞",
  bishop: "♝",
  queen: "♛",
  king: "♚",
  pawn: "♟",
};

// Initial board setup
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

// Create the board
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
  if (selectedPiece) {
    movePiece(row, col);
  } else {
    selectPiece(row, col);
  }
}

function selectPiece(row, col) {
  const piece = initialBoard[row][col];
  const color = colors[row][col];
  if (piece && color === "white") {
    selectedPiece = { piece, color, row, col };
    selectedPosition = { row, col };
    console.log(`Selected ${piece} at (${row}, ${col})`);
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
    createBoard();
  }
}

createBoard();
