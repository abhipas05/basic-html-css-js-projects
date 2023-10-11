const input = document.querySelector("input");
const button = document.querySelector("button");
const holder = document.querySelector(".initial-selection");
const body = document.querySelector("body");

let gamesWon = 0;
let gamesLeft;
let compGamesWon = 0;

const scores = document.createElement("div");
const gamesWonText = document.createElement("p");
const gamesLeftText = document.createElement("p");
const compGamesWonText = document.createElement("p");
const chooseText = document.createElement("p");
const buttons = document.createElement("div");
const rock = document.createElement("button");
const paper = document.createElement("button");
const scissors = document.createElement("button");
const compChoiceText = document.createElement("p");
const result = document.createElement("p");
const reset = document.createElement("button");

rock.textContent = "Rock";
rock.className = "operations";
paper.textContent = "Paper";
paper.className = "operations";
scissors.textContent = "Scissors";
scissors.className = "operations";

compChoiceText.textContent = "The Computer Chose !... meaning that"
result.textContent = "You Lost!";
reset.textContent = "Reset";
reset.addEventListener('click', function() {
    compChoiceText.style.visibility = "hidden";
    result.style.visibility = "hidden";
    reset.style.visibility = "hidden";
    rock.removeAttribute('disabled');
    paper.removeAttribute('disabled');
    scissors.removeAttribute('disabled');
});

compChoiceText.style.marginTop = "50px";
compChoiceText.style.textDecoration = "underline";
compChoiceText.style.fontWeight = "600"
compChoiceText.style.visibility = "hidden";
result.style.marginTop = "30px";
result.style.fontWeight = "900";
result.style.fontSize = "40px";
result.style.visibility = "hidden";
reset.style.marginTop = "40px";
reset.style.height = "40px";
reset.style.borderRadius = "5px";
reset.style.visibility = "hidden";

scores.style.display = "flex";
scores.style.flexDirection = "column";
scores.style.border = "1px yellow solid";
scores.style.padding = "10px";
scores.style.alignItems = "center";
scores.style.justifyContent = "center";
scores.style.marginTop = "10px";

gamesWonText.style.fontWeight = "400";
gamesLeftText.style.fontWeight = "400";
gamesWonText.style.fontStyle = "italic";
gamesLeftText.style.fontStyle = "italic";
compGamesWonText.style.fontWeight = "400";
compGamesWonText.style.fontStyle = "italic";

chooseText.textContent = "Make you choice..."
chooseText.style.fontWeight = 700;
chooseText.style.marginTop = "40px";
chooseText.style.marginBottom = "20px";
chooseText.style.fontSize = "24px";

buttons.style.display = "flex";
buttons.style.width = "100%";
buttons.style.justifyContent = "center";
buttons.style.alignItems = "center";
buttons.style.gap = "110px";

buttons.appendChild(rock);
buttons.appendChild(paper);
buttons.appendChild(scissors);

button.addEventListener('click', function() {
    const numOfGames = parseInt(input.value);
    holder.remove();
    generateScreen(numOfGames);
})

function generateScreen(num) {
    gamesLeft = num;
    refreshScores(gamesWon, gamesLeft);
    scores.appendChild(gamesWonText);
    scores.appendChild(compGamesWonText);
    scores.appendChild(gamesLeftText);
    body.appendChild(scores);
    body.appendChild(chooseText);
    body.appendChild(buttons);
    body.appendChild(compChoiceText);
    body.appendChild(result);
    body.appendChild(reset);
    rock.addEventListener('click', rockChosen);
    paper.addEventListener('click', paperChosen);
    scissors.addEventListener('click', scissorsChosen);
}

function rockChosen() {    //add click-and-drag function to etch a sketch
    generateWinner(1);
}

function paperChosen() {    //add click-and-drag function to etch a sketch
    generateWinner(2);
}

function scissorsChosen() {    //add click-and-drag function to etch a sketch
    console.log("This was reached");
    generateWinner(3);
}

function generateWinner(num) {
    const compChoice = generateCompChoice();
    compChoiceText.textContent = "The Computer Chose " + compChoiceConverted(compChoice) + "!... meaning that"
    if (num === compChoice) {
        gamesWon = gamesWon + 0.5;
        compGamesWon = compGamesWon + 0.5;
        gamesLeft--;
        result.textContent = "It was a Tie!";
    } else if (num === compChoice + 1) {
        gamesWon = gamesWon + 1;
        gamesLeft--;
        result.textContent = "You Win!";
    } else if (num === compChoice + 2) {
        compGamesWon = compGamesWon + 1;
        gamesLeft--;
        result.textContent = "You Lost!";
    } else if (num === compChoice - 1) {
        compGamesWon = compGamesWon + 1;
        gamesLeft--;
        result.textContent = "You Lost!";
    } else if (num === compChoice - 2) {
        gamesWon = gamesWon + 1;
        gamesLeft--;
        result.textContent = "You Win!";
    }
    refreshScores();
    if (gamesLeft === 0) {
        if (result.textContent === "You Win!") {
            compChoiceText.textContent = "You won this final game, meaning that...";
        } else if (result.textContent === "You Lost!") {
            compChoiceText.textContent = "You lost this final game, meaning that...";
        } else {
            compChoiceText.textContent = "You tied this final game, meaning that..."
        }
        if (gamesWon > compGamesWon) {
            result.textContent = "You Won the " + (gamesWon + compGamesWon) + " Game Contest!";
        } else if (gamesWon === compGamesWon) {
            result.textContent = "You Tied the " + (gamesWon + compGamesWon) + " Game Contest!";
        } else {
            result.textContent = "You Lost the " + (gamesWon + compGamesWon) + " Game Contest.";
        }
        rock.setAttribute('disabled', 'disabled');
        paper.setAttribute('disabled', 'disabled');
        scissors.setAttribute('disabled', 'disabled');
        compChoiceText.style.visibility = "visible";
        result.style.visibility = "visible";
        reset.style.visibility = "visible";
        reset.textContent = "Reload Page";
        reset.style.width = "120px";
        reset.addEventListener('click', function() {
            window.location.reload();
        });
    } else {
        compChoiceText.style.visibility = "visible";
        result.style.visibility = "visible";
        reset.style.visibility = "visible";
        rock.setAttribute('disabled', 'disabled');
        paper.setAttribute('disabled', 'disabled');
        scissors.setAttribute('disabled', 'disabled');
    }
}

function compChoiceConverted(num) {
    switch(num) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";        
    }
}

function generateCompChoice() {
    return parseInt(Math.random() * 3  + 1);
}

function refreshScores() {
    gamesWonText.textContent = "Games Won: " + gamesWon;
    gamesLeftText.textContent = "Games Left: " + gamesLeft;
    compGamesWonText.textContent = "Comp Games Won: " + compGamesWon;
}
