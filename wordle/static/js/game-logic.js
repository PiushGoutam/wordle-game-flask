
const targetWord = "GHOST"; // Change this to any 5-letter word
const ROWS = 6;
const COLS = 5;
let currentRow = 0;
let currentCol = 0;
let gameOver = false;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const messageDisplay = document.getElementById("message");


function handleKeyInput(key) {
console.log(key)
if (gameOver) return;

if (key === "ENTER") {
    submitGuess();
} else if (key === "DEL" || key === "BACKSPACE") {
    deleteLetter();
} else if (/^[A-Z]$/.test(key.toUpperCase()) && currentCol < COLS) {
    addLetter(key.toUpperCase());
}
}

function addLetter(letter) {
const tile = document.getElementById(
    `tile-${currentRow}-${currentCol}`,
);
tile.textContent = letter;
tile.setAttribute("data-state", "active");
currentCol++;
}

function deleteLetter() {
if (currentCol > 0) {
    currentCol--;
    const tile = document.getElementById(
    `tile-${currentRow}-${currentCol}`,
    );
    tile.textContent = "";
    tile.removeAttribute("data-state");
}
}

function submitGuess() {
if (currentCol < COLS) {
    showMessage("Not enough letters");
    return;
}

const guess = Array.from(
    { length: COLS },
    (_, i) =>
    document.getElementById(`tile-${currentRow}-${i}`).textContent,
).join("");

checkGuess(guess);
currentRow++;
currentCol = 0;

if (guess === targetWord) {
    showMessage("Splendid!");
    gameOver = true;
} else if (currentRow === ROWS) {
    showMessage("Game Over! The word was " + targetWord);
    gameOver = true;
}
}

function checkGuess(guess) {
const rowTiles = Array.from(board.children[currentRow].children);
const targetArr = targetWord.split("");

// First pass: Mark correct (green)
guess.split("").forEach((letter, i) => {
    if (letter === targetArr[i]) {
    rowTiles[i].setAttribute("data-state", "correct");
    targetArr[i] = null; // Remove to prevent double counting
    }
});

// Second pass: Mark present or absent
guess.split("").forEach((letter, i) => {
    if (rowTiles[i].getAttribute("data-state") === "correct") return;

    const foundIndex = targetArr.indexOf(letter);
    if (foundIndex > -1) {
    rowTiles[i].setAttribute("data-state", "present");
    targetArr[foundIndex] = null;
    } else {
    rowTiles[i].setAttribute("data-state", "absent");
    }
});
}

function showMessage(msg) {
messageDisplay.textContent = msg;
messageDisplay.style.display = "block";
setTimeout(() => (messageDisplay.style.display = "none"), 2000);
}

// Physical keyboard support
window.addEventListener("keydown", (e) => {
const key = e.key.toUpperCase();
if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
    handleKeyInput(key);
}
});

//initBoard();
//initKeyboard();
