/**
 * Jacob Strider
 * Assignment-04
 * 3/3/2026
 * CSC 372-01
 * 
 * This is the Javascript file for the Rock, Paper, Scissors game.
 * The file contains the logic for handling user interactions, computer choices, and updating the game state.
 * The file has the ability to track wins, losses, and ties, and allows the user to reset the score.
 */

document.addEventListener("DOMContentLoaded", function () {
    const choices = document.querySelectorAll(".choice");
    const computerImage = document.getElementById("computer-image");
    const resultText = document.getElementById("result-text");

    const winsDisplay = document.getElementById("wins");
    const lossesDisplay = document.getElementById("losses");
    const tiesDisplay = document.getElementById("ties");
    const resetButton = document.getElementById("reset-button");

    const options = ["rock", "paper", "scissors"];
    let shuffleInterval;
    let playerChoice = null;
    let thinking = false;

    let wins = 0;
    let losses = 0;
    let ties = 0;

    choices.forEach(choice => {
        choice.addEventListener("click", function () {

            if (thinking) return;

            clearSelection();
            choice.classList.add("selected");
            playerChoice = choice.dataset.choice;

            startComputerTurn();
        });
    });

    resetButton.addEventListener("click", resetScore);

    function clearSelection() {
        choices.forEach(choice => {
            choice.classList.remove("selected");
        });
    }

    function startComputerTurn() {

        thinking = true;

        let counter = 0;

        shuffleInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 3);
            computerImage.src = `Images/${options[randomIndex]}.png`;
            counter++;

            if (counter >= 6) {
                clearInterval(shuffleInterval);
                finalizeComputerChoice();
            }
        }, 500);

    }

    function finalizeComputerChoice() {
        const randomIndex = Math.floor(Math.random() * 3);
        const computerChoice = options[randomIndex];
        computerImage.src = `Images/${computerChoice}.png`;

        determineWinner(playerChoice, computerChoice);

        thinking = false;
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            resultText.textContent = "It's a tie!";
            ties++;
        }
        else if (
            (player === "rock" && computer === "scissors") ||
            (player === "scissors" && computer === "paper") ||
            (player === "paper" && computer === "rock")
        ) {
            resultText.textContent = "You win!";
            wins++;
        } else {
            resultText.textContent = "Computer wins!";
        }
        updateScore();
    }

    function updateScore() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }

    function resetScore() {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
        resultText.textContent = "Make your move!";
        computerImage.src = "Images/question.png";
        clearSelection();
    }
}); 