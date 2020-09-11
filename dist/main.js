const btns = document.querySelectorAll("button");
const disp = document.querySelector(".disp");
const input = document.querySelector(".msg");
const calc = document.querySelector(".calc");
const switcher = document.querySelector(".onoffswitch-checkbox");
const welcome = document.querySelector(".welcome");
const goodbye = document.querySelector(".goodbye");
const battery = document.querySelector(".battery");
const batteryImg = document.querySelector(".battery-img");
const batteryIndicator = document.querySelector(".battery-indicator");
const maxDigits = 12;
var on = true;
var hasBattery = true;
turnOn();
batteryDrain(10);

// ON-OFF FUNCTIONALITY
switcher.addEventListener("click", (e) => {
  if (on) {
    turnOff();
  } else {
    turnOn();
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
  turnOn();
}

function errorMsg(msg) {
  disp.innerHTML = `<div style='color: red;font-size:2rem;'>${msg}</div>`;
  setTimeout(() => {
    disp.innerHTML = "Welcome";
    input.innerHTML = "0";
  }, 2000);
}

// EVENTS BTN+KBRD

function batteryDrain(mins) {
  let secs = mins * 60;
  let seconds = secs;
  batteryIndicator.innerHTML = parseInt((100 * seconds) / secs) + "%";
  window.batteryInterval = setInterval(() => {
    if (on) {
      seconds--;
      batteryIndicator.innerHTML = parseInt((100 * seconds) / secs) + "%";
      if (seconds > 0.75 * secs) {
        batteryImg.src = "battery100.png";
      } else if (seconds > 0.5 * secs) {
        batteryImg.src = "battery75.png";
      } else if (seconds > 0.25 * secs) {
        batteryImg.src = "battery50.png";
      } else if (seconds >= 0.1 * secs) {
        batteryImg.src = "battery25.png";
      } else if (seconds > 0) {
        batteryImg.src = "battery0.png";
      } else {
        batteryIndicator.innerHTML = 0 + "%";
        batteryImg.src = "battery0.png";
        clearInterval(batteryInterval);
        hasBattery = false;
        disp.textContent = "LOW BAT.";
        setTimeout(() => {
          disp.textContent = "SHUT DOWN";
        }, 2000);
        setTimeout(() => {
          battery.classList.add("secret");
          disp.textContent = "";
          turnOff();
          return seconds;
        }, 5000);
      }
    }
  }, 1000);
}

function inputEnabled(bool) {
  if (bool) {
    for (let btn of btns) {
      btn.addEventListener("click", clicked, true);
    }
    window.addEventListener("keydown", typed, true);
  } else {
    for (let btn of btns) {
      btn.removeEventListener("click", clicked, true);
    }
    window.removeEventListener("keydown", typed, true);
  }
}

function clicked(e) {
  e.preventDefault();
  evaluation(e);
}

function typed(e) {
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
}

function turnOn() {
  if (hasBattery) {
    on = true;
    inputEnabled(true);
    welcome.classList.remove("secret");
    goodbye.classList.add("secret");
    input.innerHTML = "0";
    disp.style.backgroundColor = "#94b918";
    input.style.backgroundColor = "#94b918";
    setTimeout(() => {
      if (battery.classList.contains("secret"))
        battery.classList.remove("secret");
      welcome.classList.add("secret");
      // preventDefault();
    }, 1000);
  }
}

function turnOff() {
  console.log("Turned off!");
  on = false;
  inputEnabled(false);
  welcome.classList.add("secret");
  goodbye.classList.remove("secret");
  input.innerHTML = "";
  setTimeout(() => {
    goodbye.classList.add("secret");
    disp.style.backgroundColor = "#255505";
    input.style.backgroundColor = "#255505";
    if (!battery.classList.contains("secret")) battery.classList.add("secret");
  }, 1000);
}
