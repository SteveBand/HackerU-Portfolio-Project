const board = document.querySelector(".board");
const boardDivs = document.querySelectorAll(".board > div");
const snake = [4, 3, 2, 1];
let head = 4;
let snakeBody = null;
let direction = null;
let snakeHead = document.querySelector(`.board :nth-child(${head})`);
let num = 0;
let applesEaten = 0;
let start = false;
let intervalFunc = setInterval(() => {
  boardUpdate();
}, 90);
///Creates Board + Apple + starts interval///
const createBoard = () => {
  for (let i = 0; i < 900; i++) {
    const div = document.createElement("div");
    board.appendChild(div);
  }
  randomBlock();
  intervalFunc;
};

//Updates the Board And checks hits + eats//
const boardUpdate = () => {
  //updates snakes body each time
  document.querySelector(".score").innerHTML = `Appels eaten: ${applesEaten}`;
  snakeBody = snake.slice(1);
  //checks for direction movement for the right condition//
  if (direction === "left") {
    snake.pop();
    snake.unshift(head + 1);
    head++;
  } else if (direction === "right") {
    snake.pop();
    snake.unshift(head - 1);
    head--;
  } else if (direction === "down") {
    snake.pop();
    snake.unshift(head + 30);
    head += 30;
  } else if (direction === "up") {
    snake.pop();
    snake.unshift(head - 30);
    head -= 30;
  }
  //changes all board none snake squares to white each time//
  document.querySelectorAll(`.board > div`).forEach((elem) => {
    if (elem !== document.querySelector(`.board :nth-child(${num})`))
      elem.style.backgroundColor = "transparent";
  });

  //creates Snake and check if out of 'Y' Boundaries//
  snake.forEach((n, i) => {
    // checks Y Boundaries
    if (document.querySelector(`.board :nth-child(${n})`) === null) {
      clearInterval(intervalFunc);
      location.reload();
    }

    //Creates Snake//
    document.querySelector(`.board :nth-child(${n})`).style.backgroundColor =
      "green";
    //Checks Hits on 'X' Boundaries
    for (let i = 1; i < board.children.length; i += 30) {
      if (direction === "left" && head === i) {
        clearInterval(intervalFunc);
        location.reload();
      } else if (direction === "right" && head === i - 1) {
        clearInterval(intervalFunc);
        location.reload();
      }
    }
  });
  //Checks if Snake Eats the apple and adds body length to snake//
  if (head === num) {
    snake.push(snake[snake.length - 1] + 1);
    randomBlock();
    applesEaten++;
    console.log(applesEaten);
  }

  //Checks if snake Eats itself and stops the game//
  snakeBody.forEach((x) => {
    if (head === x) {
      clearInterval(intervalFunc);
      location.reload();
      document.querySelector("div.menu-wrapper").style.display = "block";
    }
  });

  headRadiusCheck(direction);
};

//Creates random Block which will be the apple function//
const randomBlock = () => {
  boardDivs.forEach((div) => {
    div.classList.remove("apple");
  });
  num = Math.ceil(Math.random() * (board.children.length - 1));
  if (snake.includes(num)) {
    randomBlock();
  } else {
    document.querySelector(`.board :nth-child(${num})`).classList.add("apple");
  }
};
//Listens to th right KeyPresses to know which direction to move

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      if (direction === "right" || !start) break;
      direction = "left";
      break;
    case "ArrowRight":
      if (direction === "left" || !start) break;
      direction = "right";
      break;
    case "ArrowDown":
      if (direction === "up" || !start) break;
      direction = "down";
      break;
    case "ArrowUp":
      if (direction === "down" || !start) break;
      direction = "up";
      break;
  }
});

const headRadiusCheck = (direction) => {
  const snakeHead = document.querySelector(`.board :nth-child(${head})`);
  snake.forEach((n) => {
    document.querySelector(`.board :nth-child(${n})`).className = "";
  });

  if (direction == "left") {
    snakeHead.className = "left-head";
  }
  if (direction == "right") {
    snakeHead.className = "right-head";
  }

  if (direction == "down") {
    snakeHead.className = "bottom-head";
  }

  if (direction == "up") {
    snakeHead.className = "upper-head";
  }
};

createBoard();

const startBtn = document.querySelector(".play-btn");

startBtn.addEventListener("click", () => {
  document.querySelector("div.menu-wrapper").style.display = "none";
  start = true;
  direction = "left";
});
