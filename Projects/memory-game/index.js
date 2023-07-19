const numberOfItems = 12;
const section = document.querySelector("section.game-on");
const menu = document.querySelector("section.before-start");
const leaderboardPage = document.querySelector("section.leader-board");
const buttons = document.querySelectorAll("button");
const cardFlipAudio = new Audio("utils/card-sounds-35956.mp3");
const cardHiddenAudio = new Audio("utils/poof-of-smoke-87381.mp3");
///for number of attempts
let attempts = 0;

///Timer for game
let timer = 0;
///game Timer Interval
let timerInterval;

///Creates board Elements and pushes them into section
const createBoard = () => {
  menu.style.display = "none";
  section.style.display = "grid";
  document.querySelector("article.game-on").style.display = "flex";
  document.querySelector(".attempts").innerHTML = `Tries:<br> ${attempts}`;
  ///Creates random Array///
  const arr = [];
  const randomArr = [];
  for (let i = 1; i <= numberOfItems; i++) {
    arr.push(i, i);
  }
  for (let y = 1; y <= numberOfItems * 2; y++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  ///pushes all random Numbers from random Arr and creates the board///
  randomArr.forEach((el) => {
    const element = document.createElement("div");
    element.innerHTML = `<span>${el}</span>`;
    element.classList.add("card");
    section.appendChild(element);
  });
};
///Handles localStorage when winning a game///
const storageHandler = () => {
  const date = new Date();
  const score = {
    minuts: date.getMinutes(),
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    seconds: date.getSeconds(),
    hours: date.getHours(),
    attempts: attempts,
    time: document.querySelector(".timer").innerHTML,
  };
  if (window.localStorage.getItem("leaderboards")) {
    const history = JSON.parse(window.localStorage.getItem("leaderboards"));
    window.localStorage.removeItem("leaderboards");
    window.localStorage.setItem(
      "leaderboards",
      JSON.stringify([score, ...history])
    );
  } else {
    window.localStorage.setItem("leaderboards", JSON.stringify([score]));
  }
  console.log(JSON.parse(window.localStorage.getItem("leaderboards")));
};
///Defines what will happen on each button we press, all buttons are here///
buttons.forEach((el) => {
  el.addEventListener("click", (ev) => {
    if (ev.target.id === "play") {
      createBoard();
    }
    if (ev.target.id === "leaderboard") {
      showLeaderBoards();
    }

    if (ev.target.id === "startgame") {
      const gameOnDivs = [...Array.from(document.querySelectorAll(".card"))];
      startGame();
      gameOnDivs.forEach((el) => {
        el.addEventListener("click", (ev) => {
          if (el.classList.contains("hidden")) {
            return;
          }
          if (document.querySelectorAll(".showing").length == 2) {
            return;
          }
          el.classList.add("showing");
          cardFlipAudio.play();
          checkCards();
        });
      });
    }

    if (ev.target.id === "endgame") {
      menu.style.display = "block";
      section.style.display = "none";
      document.querySelector("article.game-on").style.display = "none";
      attempts = 0;
      const gameOnDivs = [...Array.from(section.children)];
      gameOnDivs.forEach((el) => {
        el.remove();
      });
      clearInterval(timerInterval);
      timer = 0;
      document.querySelector(".timer").innerHTML = "00:00";
    }

    if (ev.target.id === "replay") {
      document.querySelectorAll(".card").forEach((el) => {
        el.remove();
      });
      document.querySelector("section.win-wrapper").style.display = "none";
      createBoard();
    }

    if (ev.target.id === "back-to-menu") {
      leaderboardPage.style.display = "none";
      menu.style.display = "block";
      const storageArray = JSON.parse(
        window.localStorage.getItem("leaderboards")
      );
      document.querySelectorAll(".leader-board > div").forEach((el) => {
        el.remove();
      });
    }

    if (ev.target.id === "reset-board") {
      window.localStorage.removeItem("leaderboards");
      document.querySelectorAll(".leader-board > div").forEach((el) => {
        el.remove();
      });
    }
  });
});

///Shows LeaderBoard Page and Creates it///
const showLeaderBoards = () => {
  console.log(buttons);
  menu.style.display = "none";
  leaderboardPage.style.display = "grid";
  const storageArray = JSON.parse(window.localStorage.getItem("leaderboards"));
  let num = 1;

  storageArray.forEach((el) => {
    const element = document.createElement("div");
    element.innerHTML = `
    <p class='number'>${num}:  </p>
    <p class='time'> ${el.year}  - ${
      el.month < 10 ? "0" + el.month : el.month
    } - ${el.day < 10 ? "0" + el.day : el.day}        ${el.hours}:${
      el.minuts
    }:${el.seconds < 10 ? "0" + el.seconds : el.seconds} </p>
    <p>:attempts <br>${el.attempts}</p>
    `;
    leaderboardPage.appendChild(element);
    num = num + 1;
  });
};
///Starting the game making it possible to Play and starts the Timer!///
const startGame = () => {
  timerInterval = setInterval(() => {
    timer++;

    const date = new Date(timer * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();

    document.querySelector(".timer").innerHTML = `${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
    document.querySelector(".attempts").innerHTML = `Tries:<br> ${attempts}`;
  }, 1000);
};

///Checks if Cards are the same or if there are no cards, Basically Game LOGIC!///
const checkCards = () => {
  const showingArr = document.querySelectorAll(".showing");
  if (showingArr.length == 2) {
    attempts++;
    const firstCard = showingArr[0];
    const secondCard = showingArr[1];
    if (firstCard.innerHTML === secondCard.innerHTML) {
      firstCard.classList.remove("showing");
      secondCard.classList.remove("showing");

      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      cardHiddenAudio.play();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("showing");
        secondCard.classList.remove("showing");
      }, 1500);
    }
  }
  ///returns an Array of HTML elements with class of hidden to determine end of the game///
  const cards = [...Array.from(document.querySelectorAll(".hidden"))];
  if (cards.length === numberOfItems * 2) {
    const moduleWrapper = document.querySelector("section.win-wrapper");
    moduleWrapper.style.display = "flex";
    storageHandler();
  }
};
