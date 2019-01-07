let rows = 4;
let columns = 4;
var totalNumbers = (rows * columns) - 1;
let numberArray = Array.from({ length: totalNumbers + 1 }, (x, i) => i).reverse();
numberArray.splice(numberArray.length - 1, 1);
let coordinates = [];
let move = 0;
let numberOfShuffles = Math.round(totalNumbers * Math.random()) + 200;

let table = document.getElementById('outside-box');
let amountShuffled = document.getElementById('shuffled');
amountShuffled.innerHTML = numberOfShuffles;

function checkWinCondition() {
    let currentArray = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            currentArray.push(parseInt(table.rows[i].cells[j].innerHTML));
        }
    }

    console.log(currentArray);
    console.log(numberArray);
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

function createCoordinates() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            coordinates.push([i, j]);
        }
    }

    coordinates.splice(coordinates.length - 1, 1);
}

function addNumbersToGrid() {
    let copyNumberArray = numberArray.slice();
    for (let coor of coordinates) {

        table.rows[coor[0]].cells[coor[1]].innerHTML = copyNumberArray.pop();
    }
    numberArray.reverse();
    numberArray.push(parseInt('NaN'));
    console.log(numberArray)
}

function findEmptyCell() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (table.rows[i].cells[j].innerHTML == '') {
                return [i, j]
            }
        }
    }
}

function shuffle() {
    let randDirection = ['row', 'column'];
    let randMultiplier = [1, -1];
    while (numberOfShuffles != 0) {
        let emptyCell = findEmptyCell();
        let emptyRow = emptyCell[0];
        let emptyColumn = emptyCell[1];

        let rowOrColumn = randDirection[Math.round(Math.random())];
        let addOrSubtract = randMultiplier[Math.round(Math.random())];

        let newCoor;

        if (rowOrColumn === 'row') {
            emptyRow += addOrSubtract;
            try {
                table.rows[emptyRow].cells[emptyColumn].click();
                numberOfShuffles -= 1;
            } catch {
                continue;
            }
        } else {
            emptyColumn += addOrSubtract;
            try {
                table.rows[emptyRow].cells[emptyColumn].click();
                numberOfShuffles -= 1;
            } catch {
                continue;
            }
        }
    }
}

function addOnClick() {
    let counterHTML = document.getElementById('counter');

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            table.rows[i].cells[j].onclick = function () {
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

                move += 1
                counterHTML.innerHTML = move;


                checkWinCondition();
            }
        }
    }
}

function solve() {
    let randDirection = ['row', 'column'];
    let randMultiplier = [1, -1];
    while (!checkWinCondition()) {
        let emptyCell = findEmptyCell();
        let emptyRow = emptyCell[0];
        let emptyColumn = emptyCell[1];

        let rowOrColumn = randDirection[Math.round(Math.random())];
        let addOrSubtract = randMultiplier[Math.round(Math.random())];

        let newCoor;

        if (rowOrColumn === 'row') {
            emptyRow += addOrSubtract;
            try {
                table.rows[emptyRow].cells[emptyColumn].click();
                numberOfShuffles -= 1;
            } catch {
                continue;
            }
        } else {
            emptyColumn += addOrSubtract;
            try {
                table.rows[emptyRow].cells[emptyColumn].click();
                numberOfShuffles -= 1;
            } catch {
                continue;
            }
        }
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