const scale = 25;
const margin = 20;
const minWidth = 250;

let mines = 10;
let cols = 9;
let rows = 9;

let minesSelect;
let colsSelect;
let rowsSelect;

let canvas;
let grid = [];
let inGame = false;
let win = false;

function setup(){
    minesSelect = createInput(mines);
    minesSelect.size(50);
    colsSelect = createInput(cols);
    colsSelect.size(50);
    rowsSelect = createInput(rows);
    rowsSelect.size(50);
    start = createButton('start');
    start.mousePressed(startGame);
    
    startGame();
}
  
function draw() {
    //disabel context menu on rigth click
    document.addEventListener('contextmenu', event => event.preventDefault());

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function mousePressed() {
    xy = mouseXY();

    if (xy) {
        i = xy[0];
        j = xy[1];

        if (mouseButton === RIGHT) {
            grid[i][j].flag = !grid[i][j].flag;
        }
        
        else if (inGame && !grid[i][j].flag) {
            grid[i][j].reveal();
            checkWin();
        } 
    }   
}

function mouseXY() {
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            cell = grid[i][j];
            if (mouseX > cell.x && mouseX < cell.x + scale && mouseY > cell.y && mouseY < cell.y + scale) {
                return [i,j]
            }
        }
    }
}

function startGame() {
    displayInputs();

    inGame = true;
    win = false;

    grid = [];
    for (i = 0; i < cols; i++){
        grid[i] = [];
        for (j = 0; j < rows; j++){
            grid[i][j] = new Tile(i, j);
        }
    }
    createMines();
}

function displayInputs() {
    mines = minesSelect.value();
    cols = colsSelect.value();
    rows = rowsSelect.value();
    
    wdth = cols * scale + margin;
    if (wdth < minWidth) { wdth = minWidth;}
    createCanvas(wdth, rows * scale + margin);
    
    minesSelect.position(0, 0, 'relative');
    colsSelect.position(margin, 0, 'relative');
    rowsSelect.position(margin*2, 0, 'relative');
    start.position(margin * 3, 0, 'relative');
    
    background(51);
    fill(255);
    noStroke();
    textAlign(LEFT);

    text("Mines", 0, height-3); shift = margin + minesSelect.width;
    text("Cols", shift, height-3); shift += margin + colsSelect.width;
    text("Rows", shift, height-3);
}

function createMines() {
    //List of all tiles
    options = [];
    for (i = 0; i < cols; i++){
        for (j = 0; j < rows; j++){
            options.push([i,j]);
        }
    }

    //Choose tiles with mine and remove them from options
    for (a = 0; a < mines; a++){
        index = floor(random(options.length));
        choice = options[index];
        i = choice[0];
        j = choice[1];

        //remove 1 element starting from index
        options.splice(index, 1);
        grid[i][j].mine = true;
    }
}

function gameOver() {
    inGame = false;
    for (i = 0; i < cols; i++){
        for (j = 0; j < rows; j++){
            if (!grid[i][j].revealed) {
                if (grid[i][j].mine) {
                    grid[i][j].revealed = true;
                }
            }
        }
    }
}

function checkWin() {
    for (i = 0; i < cols; i++){
        for (j = 0; j < rows; j++){
            if (!grid[i][j].revealed && !grid[i][j].mine) {
                return false;
            }
        }
    }
    win = true;
    gameOver();
}