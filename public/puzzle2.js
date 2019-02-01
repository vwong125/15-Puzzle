// Total number of rows and columns
let rows = 4;
let columns = 4;

var totalNumbers = (rows * columns) - 1;
let numberArray = Array.from({ length: totalNumbers + 1 }, (x, i) => i).reverse();
numberArray.splice(numberArray.length - 1, 1);

// store coordinates
let coordinates = [];
// Stores the number of moves the player has made
let move = 0;

// Number of shuffles
let numberOfShuffles = Math.round(totalNumbers * Math.random()) + 100;

// All shuffled moves
let shuffledMovements = [];

let table = document.getElementById('outside-box');
let amountShuffled = document.getElementById('shuffled');
amountShuffled.innerHTML = numberOfShuffles;

// Add onclick to solve button
document.getElementById('solveButton').onclick = solve;

/**
 * Checks if there is a winning solution.
 */
function checkWinCondition() {
    let currentArray = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            currentArray.push(parseInt(table.rows[i].cells[j].innerHTML));
        }
    }

    if (currentArray.join(',') == numberArray.join(',')) {
        setTimeout(function () { alert('You win') }, 0);
    }
}


function addTableCells() {
    for (let i = 0; i < rows; i++) {
        let tableRow = table.insertRow(i);
        for (let j = 0; j < columns; j++) {
            let tableCell = tableRow.insertCell(j);
            tableCell.innerHTML = null;
            tableCell.onclick = function () {
                let emptyCoor = checkSurroundingCells(i, j);
                //console.log(emptyCoor);
                const switchCells = () => {
                    table.rows[emptyCoor[0]].cells[emptyCoor[1]].innerHTML = table.rows[i].cells[j].innerHTML;
                    table.rows[i].cells[j].innerHTML = null;
                }
                try {
                    switchCells();
                } catch {

                }

            }
        }
    }
}

/**
 * Given a cell, check if the surround cells is empty
 * @param {integer} row 
 * @param {integer} column 
 */
function checkSurroundingCells(row, column) {
    surroundingCoors = [
        [row - 1, column],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column],
    ]

    let grid = document.getElementById('outside-box');

    for (let i of surroundingCoors) {
        try {
            let content = grid.rows[i[0]].cells[i[1]].innerHTML;
            if (content == '') {
                return ([i[0], i[1]]);
            }
        } catch {
            continue
        }
    }
}

/**
 * Create the coordinates from [0,0] - [4, 4]
 */
function createCoordinates() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            coordinates.push([i, j]);
        }
    }

    coordinates.splice(coordinates.length - 1, 1);
}

/**
 * Add 1 - 16 to the grid
 */
function addNumbersToGrid() {
    let copyNumberArray = numberArray.slice();
    for (let coor of coordinates) {

        table.rows[coor[0]].cells[coor[1]].innerHTML = copyNumberArray.pop();
    }
    numberArray.reverse();
    numberArray.push(parseInt('NaN'));
}

/**
 * Finds the empty cell in the grid
 */
function findEmptyCell() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (table.rows[i].cells[j].innerHTML == '') {
                return [i, j]
            }
        }
    }
}

/**
 * Shuffle the grid of numbers
 */
function shuffle() {
    // Select if we are moving based on row or based on column
    let randDirection = ['row', 'column'];
    // Select if we are moving left/right or up/down
    let randMultiplier = [1, -1];

    // Used to prevent duplication
    let lastDirection;
    let lastMultiplier;

    while (numberOfShuffles != 0) {
        // Find the empty cell
        let emptyCell = findEmptyCell();
        let emptyRow = emptyCell[0];
        let emptyColumn = emptyCell[1];

        let rowOrColumn = randDirection[Math.round(Math.random())];
        let addOrSubtract = randMultiplier[Math.round(Math.random())];

        // If the movement is the same as the previous, do nothing
        if (rowOrColumn === lastDirection && addOrSubtract === lastMultiplier) {
            continue;
        } else {
            
            if (rowOrColumn === 'row') {
                emptyRow += addOrSubtract;


                try {
                    table.rows[emptyRow].cells[emptyColumn].click();
                } catch {
                    continue;
                }

            } else {
                emptyColumn += addOrSubtract;
                try {
                    table.rows[emptyRow].cells[emptyColumn].click();
                } catch {
                    continue;
                }
            }

            // Decrement if no error occured
            numberOfShuffles -= 1;

            // For solve feature
            shuffledMovements.push([rowOrColumn, addOrSubtract])

            // Store previous movement to prevent duplication
            lastDirection = rowOrColumn;
            lastMultiplier = addOrSubtract;
        }

    }
}

/**
 * Adds the swapping functionality to each cell
 */
function addOnClick() {
    let counterHTML = document.getElementById('counter');

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            table.rows[i].cells[j].onclick = function () {
                let emptyCoor = checkSurroundingCells(i, j);
           
                const switchCells = () => {
                    table.rows[emptyCoor[0]].cells[emptyCoor[1]].innerHTML = table.rows[i].cells[j].innerHTML;
                    table.rows[i].cells[j].innerHTML = null;
                }

                if (emptyCoor){
                    try {
                        switchCells();
                    } catch {
                    }
    
                    if (emptyCoor[0] == i){
                        shuffledMovements.push(['column', j - emptyCoor[1]]);
                    }
                    else if (emptyCoor[1] = j){
                        shuffledMovements.push(['row', i - emptyCoor[0]]);
                        };
    
                    move += 1
                    counterHTML.innerHTML = move;
    
                    checkWinCondition();
                }
            }
        }
    }
}

function solve() {
    reversedShuffledMovements = shuffledMovements.reverse();
    console.log(reversedShuffledMovements);

    for (let i = 0; i < reversedShuffledMovements.length; i++){
  
        emptyCoor = findEmptyCell();
        emptyCoorRow = emptyCoor[0];
        emptyCoorCol = emptyCoor[1];
        
        if (reversedShuffledMovements[i][0] == 'row') {
            emptyCoorRow += (reversedShuffledMovements[i][1] * -1);
            console.log(reversedShuffledMovements[i])
        } else {
            emptyCoorCol += (reversedShuffledMovements[i][1] * -1);
            console.log(reversedShuffledMovements[i])
        }

        table.rows[emptyCoorRow].cells[emptyCoorCol].click();
    }

}


function initiateGame() {
    createCoordinates()
    addTableCells();
    addNumbersToGrid();
    shuffle();
    addOnClick();
}

initiateGame();