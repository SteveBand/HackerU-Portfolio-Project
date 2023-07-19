const checkBtn = document.querySelector("#check");
const firstNum = document.querySelector(".num1");
const secondNum = document.querySelector(".num2");
const operator = document.querySelector(".operator");
const operatorArr = ["+", "-", "%", "/", "*"];
const inputResult = document.getElementById("userInput");
let result;

const generate = () => {
  let arr = [];
  const randomOperindex = Math.floor(Math.random() * (operatorArr.length - 1));
  for (let i = 0; i < 2; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    arr[i] = randomNum;
  }

  if (arr[0] > arr[1]) {
    firstNum.innerHTML = arr[1];
    secondNum.innerHTML = arr[0];
  } else {
    secondNum.innerHTML = arr[1];
    firstNum.innerHTML = arr[0];
  }
  operator.innerHTML = operatorArr[randomOperindex];
};

const logic = () => {
  const num1 = +firstNum.innerHTML;
  const num2 = +secondNum.innerHTML;

  switch (operator.innerHTML) {
    case "+":
      result = num2 + num1;
      break;
    case "-":
      result = num2 - num1;
      break;
    case "*":
      result = num2 * num1;
      break;
    case "/":
      result = Math.round(num2 / num1);
      break;
    case "%":
      result = num2 % num1;
      break;
  }

  console.log(result);
  if (+inputResult.value == result) {
    snackBar("! Correct", true);
    generate();
    inputResult.value = "";
  } else if (!inputResult.value !== result) {
    snackBar("! False", false);
  }
};

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logic();
});

generate();
console.log(secondNum);

function snackBar(param1, param2) {
  const x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML = param1;
  if (param2) {
    x.style.backgroundColor = "rgb(166, 222, 83)";
  }
  if (!param2) {
    x.style.backgroundColor = "rgb(242, 72, 72)";
  }
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
