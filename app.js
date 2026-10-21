let userScore = 0;
let compScore = 0;
let gameOver = false;

// DOM Elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const targetSelect = document.querySelector("#target-select");
const resetBtn = document.querySelector("#reset-btn");

let winningScore = parseInt(targetSelect.value);

targetSelect.addEventListener("change", (e) => {
  winningScore = parseInt(e.target.value);
  resetGame();
});

// Computer Move Generator
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was a draw! Play again.";
  msg.style.backgroundColor = "#1c2541";
  msg.style.color = "#ffffff";
};

const checkGameOver = () => {
  if (userScore >= winningScore) {
    msg.innerText = "🏆 CONGRATULATIONS! You won the match (" + userScore + " to " + compScore + ")!";
    msg.style.backgroundColor = "#06d6a0";
    msg.style.color = "#0b132b";
    gameOver = true;
  } else if (compScore >= winningScore) {
    msg.innerText = "❌ GAME OVER! Computer won the match (" + compScore + " to " + userScore + ")!";
    msg.style.backgroundColor = "#ef476f";
    msg.style.color = "#ffffff";
    gameOver = true;
  }
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = "You win! Your " + userChoice + " beats " + compChoice;
    msg.style.backgroundColor = "#06d6a0";
    msg.style.color = "#0b132b";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = "You lost! " + compChoice + " beats your " + userChoice;
    msg.style.backgroundColor = "#ef476f";
    msg.style.color = "#ffffff";
  }
  checkGameOver();
};

const playGame = (userChoice) => {
  if (gameOver) {
    msg.innerText = "Match finished! Click 'Reset Game' to start again.";
    msg.style.backgroundColor = "#ffd166";
    msg.style.color = "#0b132b";
    return;
  }

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#1c2541";
  msg.style.color = "#ffffff";
};

resetBtn.addEventListener("click", resetGame);

// --- Review / Rating Section ---
const stars = document.querySelectorAll(".star");
const submitReviewBtn = document.querySelector("#submit-review-btn");
const reviewTextInput = document.querySelector("#review-text");
const reviewStatus = document.querySelector("#review-status");
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-val"));
    stars.forEach((s) => {
      const val = parseInt(s.getAttribute("data-val"));
      if (val <= selectedRating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  });
});

submitReviewBtn.addEventListener("click", () => {
  const text = reviewTextInput.value.trim();

  if (selectedRating === 0) {
    reviewStatus.style.color = "#ef476f";
    reviewStatus.innerText = "Please select stars before submitting!";
    return;
  }
  reviewStatus.style.color = "#06d6a0";
  reviewStatus.innerText = "Thank you! Your " + selectedRating + "-star review was submitted!";
  reviewTextInput.value = "";
  selectedRating = 0;
  stars.forEach((s) => s.classList.remove("active"));
});