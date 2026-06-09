const FINISH = 100;

let player = 0;
let enemy = 0;

let playerScore = 0;
let enemyScore = 0;

let gameRunning = false;
let pauseAfterFinish = false;

let botInterval;

const playerCar = document.getElementById("playerCar");
const botCar = document.getElementById("botCar");

const playerBar = document.getElementById("playerBar");
const botBar = document.getElementById("botBar");

const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");

const difficulty = document.getElementById("difficulty");
const mode = document.getElementById("mode");

const playerKeyInput =
  document.getElementById("playerKey");

const player2KeyInput =
  document.getElementById("player2Key");

const playerScoreText =
  document.getElementById("playerScore");

const enemyScoreText =
  document.getElementById("enemyScore");

const enemyName =
  document.getElementById("enemyName");

const enemyLaneName =
  document.getElementById("enemyLaneName");

mode.addEventListener("change", () => {

  if(mode.value === "bot"){
    enemyName.textContent = "Бот";
    enemyLaneName.textContent = "Бот";
  }else{
    enemyName.textContent = "Игрок 2";
    enemyLaneName.textContent = "Игрок 2";
  }

});

function updateUI(){

  playerBar.style.width =
    player + "%";

  botBar.style.width =
    enemy + "%";

  playerCar.style.left =
    (player * 8) + "px";

  botCar.style.left =
    (enemy * 8) + "px";

}

function finish(winner){

  gameRunning = false;

  clearInterval(botInterval);

  pauseAfterFinish = true;

  if(winner === "player"){

    playerScore++;

    playerScoreText.textContent =
      playerScore;

    statusText.textContent =
      "🎉 Победа!";

  }else{

    enemyScore++;

    enemyScoreText.textContent =
      enemyScore;

    if(mode.value === "bot"){
      statusText.textContent =
        "🤖 Бот победил!";
    }else{
      statusText.textContent =
        "🏎️ Игрок 2 победил!";
    }

  }

  setTimeout(() => {

    pauseAfterFinish = false;

    statusText.textContent =
      "Нажмите СТАРТ для новой гонки";

  },3000);

}

function startGame(){

  if(pauseAfterFinish) return;

  clearInterval(botInterval);

  player = 0;
  enemy = 0;

  gameRunning = true;

  statusText.textContent = "";

  updateUI();

  if(mode.value === "bot"){

    let speed;

    switch(difficulty.value){

      case "easy":
        speed = 1.8;
        break;

      case "normal":
        speed = 2.8;
        break;

      case "hard":
        speed = 4;
        break;

      case "insane":
        speed = 5.5;
        break;

    }

    botInterval = setInterval(() => {

      if(!gameRunning) return;

      enemy += Math.random() * speed;

      if(enemy >= FINISH){

        enemy = FINISH;

        updateUI();

        finish("enemy");

        return;
      }

      updateUI();

    },100);

  }

}

startBtn.addEventListener(
  "click",
  startGame
);

document.addEventListener(
  "keydown",
  (e) => {

    if(e.repeat) return;

    if(!gameRunning) return;

    const playerKey =
      playerKeyInput.value.trim();

    const player2Key =
      player2KeyInput.value.trim();

    if(e.code === playerKey){

      player += 2;

      if(player >= FINISH){

        player = FINISH;

        updateUI();

        finish("player");

        return;
      }

      updateUI();

    }

    if(mode.value === "pvp"){

      if(e.code === player2Key){

        enemy += 2;

        if(enemy >= FINISH){

          enemy = FINISH;

          updateUI();

          finish("enemy");

          return;
        }

        updateUI();

      }

    }

  }
);

updateUI();
