const numOfDivs = 9;
const board = document.querySelector("div.board");
const winContainer = document.querySelector("div.win-container");
let winner;
let isX = true;
let arr = [];
const createBoard = (num) => {
  for (let i = 0; i < num; i++) {
    const newDiv = document.createElement("div");
    newDiv.id = i;
    newDiv.addEventListener("click", (ev) => {
      if (!ev.target.innerHTML && !winner) {
        if (isX) {
          ev.target.innerHTML = "X";
          ev.target.classList.add("used");
          isX = !isX;
          if (!winner) {
            setTimeout(() => {
              logic();
            }, 800);
          }
        }
      }
      check();
    });
    board.appendChild(newDiv);
  }
  arr = [...Array.from(document.querySelectorAll(".board > div"))];
};

const check = () => {
  const divsArr = [...Array.from(document.querySelectorAll(".board > div"))];
  console.log(divsArr);
  const options = [
    [0, 1, 2],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
  ];

  options.forEach((checkArr) => {
    const res = checkArr.map((index) => divsArr[index].innerHTML);
    if (res.every((el) => el === "X")) {
      winner = "X";
      winContainer.style.display = "flex";
      document.querySelector(
        "div.win-container > h1"
      ).innerHTML = `winner is ${winner}`;
      setTimeout(() => {
        winContainer.style.display = "none";
        location.reload();
      }, 2000);
      return;
    } else if (res.every((el) => el === "O")) {
      winner = "O";
      winContainer.style.display = "flex";
      document.querySelector(
        "div.win-container > h1"
      ).innerHTML = `winner is ${winner}`;
      setTimeout(() => {
        winContainer.style.display = "none";
        location.reload();
      }, 2000);
      return;
    }
  });
};

const logic = () => {
  const randomNum = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomNum];
  const randomIndex = arr.findIndex((el) => el.id == randomItem.id);
  if (randomItem.innerHTML && arr.length !== 0) {
    arr.splice(randomIndex, 1);
    logic();
  }
  if (!randomItem.innerHTML && !winner && !isX) {
    randomItem.innerHTML = "O";
    randomItem.classList = "used";
    isX = !isX;
    check();
  }
};

createBoard(numOfDivs);
