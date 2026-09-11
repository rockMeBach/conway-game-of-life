const FRAME_RATE = 10000 / 60;
const HEIGHT = 700;
const WIDTH = 700;
const SQUARE_SIZE = 10;
const BG_COLOR = "black";

//DEF we can paint around 70 squares if we use a square size of 10 for a canvas of 700x700.
let gameState = Array.from(
    { length: HEIGHT / SQUARE_SIZE }, 
    () => Array(WIDTH / SQUARE_SIZE).fill(0)
);

//DEF R-pentomino, centred: a methuselah that stays chaotic for 1103 generations.
//   .XX
//   XX.
//   .X.
const CENTER_ROW = Math.floor(gameState.length / 2);
const CENTER_COL = Math.floor(gameState[0].length / 2);

gameState[CENTER_ROW - 1][CENTER_COL] = 1;
gameState[CENTER_ROW - 1][CENTER_COL + 1] = 1;
gameState[CENTER_ROW][CENTER_COL - 1] = 1;
gameState[CENTER_ROW][CENTER_COL] = 1;
gameState[CENTER_ROW + 1][CENTER_COL] = 1;

function createCanvas(){
    const canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);
    return canvas;
}

function initCanvas(canvas){
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.backgroundColor = BG_COLOR;
}

const gameCanvas = createCanvas();
initCanvas(gameCanvas);

const ctx = gameCanvas.getContext("2d");

let lastStep = 0;

function renderGrid(grid){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
}

function updateGameState(grid){
    const next = [...grid.map(row => [...row])];

    const countNeighbors = (i, j) => {
        let neighbors = 0;

        if(j - 1 >= 0 && grid[i][j - 1] === 1) neighbors += 1; // left
        if(j + 1 < grid[i].length && grid[i][j + 1] === 1) neighbors += 1; // right

        if(i - 1 >= 0 && grid[i - 1][j] === 1) neighbors += 1; // up
        if(i + 1 < grid.length && grid[i + 1][j] === 1) neighbors += 1; // down

        if(i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j - 1] === 1) neighbors += 1; // top left
        if(i - 1 >= 0 && j + 1 < grid[i].length && grid[i - 1][j + 1] === 1) neighbors += 1; // top right

        if(i + 1 < grid.length && j - 1 >= 0 && grid[i + 1][j - 1] === 1) neighbors += 1; // bottom left
        if(i + 1 < grid.length && j + 1 < grid[i].length && grid[i + 1][j + 1] === 1) neighbors += 1; // bottom right

        return neighbors;
    }

    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            const neighbors = countNeighbors(i, j);

            if(grid[i][j] === 1 && neighbors < 2) {
                next[i][j] = 0;
            }else if(grid[i][j] === 0 && neighbors === 3) {
                next[i][j] = 1;
            }else if(grid[i][j] === 1 && neighbors > 3) {
                next[i][j] = 0;
            }
        }
    }

    return next;
}

function frame(now){
    if(now - lastStep > FRAME_RATE) {
        lastStep = now;
        gameState = updateGameState(gameState);
        renderGrid(gameState);
    }
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);