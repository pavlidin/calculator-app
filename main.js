const btns = document.querySelectorAll("button");

const disp = document.querySelector(".disp");
const msg = document.querySelector(".msg");
const maxDigits = 15;
msg.innerHTML = "0";
disp.innerHTML = 'Welcome';

if (msg.innerHTML == 0) {
  for (let btn of btns) {
    btn.addEventListener("click", (e) => {
      if (msg.innerHTML.length <= maxDigits) {
        if (msg.innerHTML == 0) {
          msg.innerHTML = "";
        }
        if (e.target.id.length < 3) {
          ud(e.target.id[1]);
        } else if (e.target.id == "dec" && !msg.innerHTML.includes(".")) {
          ud(".");
        } else if (e.target.id == "add") {
          ud("+");
        } else if (e.target.id == "subtr") {
          ud("-");
        } else if (e.target.id == "mult") {
          ud("*");
        } else if (e.target.id == "division") {
          ud("/");
        } else if (e.target.id == "clear") {
          clc();
        } else if (e.target.id == "ans") {
          ans();
        } else if (e.target.id == "backspace") {
          backspace();
          }
      } else {
        disp.innerHTML = "MAX INPUT";
        
        if (e.target.id == "clear") {
            clc();
        } else if (e.target.id == "ans") {
            ans();
        } else if (e.target.id == "backspace") {
            disp.innerHTML = '';
            backspace();
          }
      }
    });
  }
}

function backspace(){
  msg.innerHTML = msg.innerHTML.slice(0, -1);
}

function ud(n) {
  msg.innerHTML += n;
}
function ans() {
  try {
    disp.innerHTML = eval(msg.innerHTML);
    if (disp.innerHTML.length>11){
      disp.classList.add('max-display');
    } else{
      disp.classList.remove('max-display');
    }
  } catch (e) {
    disp.innerHTML = `<div style='color: red'>Error</div>`;
    msg.innerHTML = '';
    setTimeout(() => {
      disp.innerHTML = "";
    }, 1500);
  }
}
function clc() {
  disp.innerHTML = "";
  msg.innerHTML = "0";
}
