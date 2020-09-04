const btns = document.querySelectorAll("button");
const disp = document.querySelector(".disp");
const input = document.querySelector(".msg");
const calc = document.querySelector(".calc");
const switcher = document.querySelector(".switcher");
const welcome = document.querySelector('.welcome');
const goodbye = document.querySelector('.goodbye');
const maxDigits = 12;
let sw = true;
input.innerHTML = "0";


// ON-OFF FUNCTIONALITY
// den douleuei to css transition alla exei leitourgeia-(e.preventDefault;)
switcher.addEventListener("click", (e) => {
  e.preventDefault();
  if(sw){
    welcome.classList.add("secret");
    goodbye.classList.remove("secret");
    setTimeout(()=>goodbye.classList.add("secret"), 1000);
    input.innerHTML = "";
    sw= false;
  } else{
    goodbye.classList.add("secret");
    welcome.classList.remove("secret");
    setTimeout(()=>input.innerHTML = "0", 1000);
    sw= true;
    
  }
  
});

// Evaluation function

function evaluation(e) {
  //If mouseevents
  if (e.type == "click") {
    if (input.innerHTML.length <= maxDigits) {
      if (input.innerHTML == 0) {
        input.innerHTML = "";
      }
      if (e.target.id.length < 3) {
        ud(e.target.id[1]);
      } else if (e.target.id == "dec") {
        ud(".");
      } else if (e.target.id == "add" && !input.innerHTML == "") {
        ud("+");
      } else if (e.target.id == "subtr") {
        ud("-");
      } else if (e.target.id == "mult" && !input.innerHTML == "") {
        ud("*");
      } else if (e.target.id == "division" && !input.innerHTML == "") {
        ud("/");
      } else if (e.target.id == "clear") {
        clc();
      } else if (e.target.id == "ans") {
        ans();
      } else if (e.target.id == "backspace") {
        backspace();
      }
    } else if (input.innerHTML.length > maxDigits) {
      disp.innerHTML = "MAX INPUT";

      if (e.target.id == "clear") {
        clc();
      } else if (e.target.id == "ans") {
        ans();
      } else if (e.target.id == "backspace") {
        disp.innerHTML = "";
        backspace();
      }
    }
  } else if (e.type == "keydown") {
    if (input.innerHTML.length <= maxDigits) {
      if (input.innerHTML == 0) {
        input.innerHTML = "";
      }
      if (e.key == ".") {
        ud(".");
      } else if (e.key == "+" && !input.innerHTML == "") {
        ud("+");
      } else if (e.key == "-") {
        ud("-");
      } else if (e.key == "*" && !input.innerHTML == "") {
        ud("*");
      } else if (e.key == "/" && !input.innerHTML == "") {
        ud("/");
      } else if (e.key == "Enter") {
        ans();
      } else if (e.key == "Backspace") {
        backspace();
      } else {
        ud(e.key);
      }
    } else {
      disp.innerHTML = "MAX INPUT";

      if (e.key == "clear") {
        clc();
      } else if (e.key == "Enter") {
        ans();
      } else if (e.key == "Backspace") {
        disp.innerHTML = "";
        backspace();
      }
    }
  }
}

function backspace() {
  if (input.innerHTML.length < 2) {
    input.innerHTML = "0";
  } else {
    input.innerHTML = input.innerHTML.slice(0, -1);
  }
}

function ud(n) {
  let previous = input.innerHTML[input.innerHTML.length - 1];
  if (
    !+n.match(/[0-9]/) &&
    (previous == "+" ||
      previous == "-" ||
      previous == "*" ||
      previous == "." ||
      previous == "/")
  ) {
    input.innerHTML = input.innerHTML.split("").slice(0, -1).concat(n).join("");
  } else {
    input.innerHTML += n;
  }
}
function ans() {
  try {
    disp.innerHTML = eval(input.innerHTML);
    if (disp.innerHTML.length > 13) {
      errorMsg("Output Overflow");
    } else if (disp.innerHTML.length > 11) {
      disp.classList.add("max-display");
    } else {
      disp.classList.remove("max-display");
    }
  } catch (e) {
    errorMsg("Error");
  }
}
function clc() {
  location.reload();
}
function errorMsg(msg) {
  disp.innerHTML = `<div style='color: red;font-size:2rem;'>${msg}</div>`;
  setTimeout(() => {
    disp.innerHTML = "Welcome";
    input.innerHTML = "0";
  }, 2000);
}

// EVENTS BTN+KBRD

for (let btn of btns) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    evaluation(e);
    btn.blur();
  });
}

window.addEventListener("keydown", (e) => {
  let keyCode = e.keyCode;
  if (
    (keyCode >= 42 && keyCode <= 57) ||
    (keyCode >= 96 && keyCode <= 105) ||
    keyCode == 106 ||
    keyCode == 107 ||
    keyCode == 110 ||
    keyCode == 109 ||
    keyCode == 111 ||
    keyCode == 13 ||
    keyCode == 190 ||
    keyCode == 8
  )
    evaluation(e);
});
