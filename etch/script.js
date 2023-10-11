const initialSelection = document.querySelector(".initial-selection");
const input = document.querySelector("input");
const submitButton = document.querySelector(".submit");
const body = document.querySelector("body");

let randomColor = false;
let eraser = false;

const statement = document.createElement("p");
const boardSidebarHolder = document.createElement("div");
const board = document.createElement('div');

const leftSidebar = document.createElement("div")
const randomColorToggler = document.createElement("button");
const eraserToggler = document.createElement("button");
const rightSidebar = document.createElement("div")
const resetBoard = document.createElement("button");
const reloadPage = document.createElement("button");

leftSidebar.style.display = "flex";
leftSidebar.style.flexDirection = "column";
leftSidebar.style.alignItems = "center";
leftSidebar.style.justifyContent = "center";
leftSidebar.style.gap = "30px";
leftSidebar.style.width = "150px";
rightSidebar.style.display = "flex";
rightSidebar.style.flexDirection = "column";
rightSidebar.style.alignItems = "center";
rightSidebar.style.justifyContent = "center";
rightSidebar.style.gap = "30px";
rightSidebar.style.width = "150px";

randomColorToggler.textContent = "Random Pen Color Generator";
eraserToggler.textContent = "Fine Eraser";
resetBoard.textContent = "Reset Board";
reloadPage.textContent = "Reload Page";

const sidebarButtons = [randomColorToggler, eraserToggler, resetBoard, reloadPage];
sidebarButtons.forEach(function(b) {
    b.style.height = "50px";
    b.style.width = "120px";
});

leftSidebar.appendChild(randomColorToggler);
leftSidebar.appendChild(eraserToggler);
rightSidebar.appendChild(resetBoard);
rightSidebar.appendChild(reloadPage);

board.style.width = '650px';
board.style.height = '650px';
board.style["background-color"] = 'white';
board.style.display = "flex";
board.style["flex-direction"] = "column";

boardSidebarHolder.style.width = "100%";
boardSidebarHolder.style.display = "flex";
boardSidebarHolder.style.alignItems = "center";
boardSidebarHolder.style.justifyContent = "center";
boardSidebarHolder.style.gap = "20px";
boardSidebarHolder.appendChild(board);

statement.style.marginTop = "20px";
statement.style.padding = 0;
statement.textContent = "To move the cursor without drawing on the board, hold any modifier key and then move!";

submitButton.addEventListener('click', buildGame);

function buildGame() {
    const sideSize = collectSideSize();
    initialSelection.remove();
    buildBoard(sideSize);
    buildSidebars();
}

function buildBoard(size) {
    alert("Ready to start drawing?");
    for (let i = 0; i < size; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.style.width = "100%";
        rowDiv.style.flex = "1 1 auto";
        rowDiv.style.display = "flex";
        for (let j = 0; j < size; j++) {
            let squareDiv = document.createElement("div");
            squareDiv.style.width = "100%";
            squareDiv.style.flex = "1 1 auto";
            squareDiv.addEventListener('mouseover', function(event) {
                if (!(event.shiftKey || event.metaKey || event.altKey || event.ctrlKey)) {
                    if (eraser) {
                        squareDiv.style["background-color"] = "white";
                    } else {
                        if (!randomColor) {
                            squareDiv.style["background-color"] = "black";
                        } else {
                            squareDiv.style["background-color"] = "rgb(" + generateRandomNumber() + "," + 
                                                                generateRandomNumber() + "," + generateRandomNumber() + ")";
                        }
                    } 
                }
            });
            squareDiv.className = "divs";
            rowDiv.appendChild(squareDiv)
        }
        board.appendChild(rowDiv);
    }
    body.appendChild(boardSidebarHolder);
    body.appendChild(statement);
}

function buildSidebars() {
    boardSidebarHolder.insertBefore(leftSidebar, board);
    boardSidebarHolder.appendChild(rightSidebar);
    implementButtonFunctionality();
}

function implementButtonFunctionality() {
    reloadPage.addEventListener('click', function() {
        if (confirm("Are you sure you want to do this? This will delete everything on the sketchpad currently.")) {
            window.location.reload();
        }
    });

    resetBoard.addEventListener('click', function() {
        const divs = document.querySelectorAll(".divs");
        divs.forEach(function(d) {
            d.style.backgroundColor = "white";
        });
    });

    randomColorToggler.addEventListener('click', function() {
        if (!randomColor) {
            randomColor = true;
            randomColorToggler.textContent = "Regular Black Pen";
        } else {
            randomColor = false;
            randomColorToggler.textContent = "Random Pen Color Generator";
        }
    });

    eraserToggler.addEventListener('click', function() {
        if (!eraser) {
            eraser = true;
            eraserToggler.textContent = "Regular Pen";
        } else {
            eraser = false;
            eraserToggler.textContent = "Fine Eraser";
        }
    });
}

function generateRandomNumber() {
    return parseInt(Math.random() * 255 + 1);
}

function collectSideSize() {
    const inputNum = Number(input.value);
    if (inputNum <= 100) {
        return inputNum;
    } else {
        return 100;
    }
}
