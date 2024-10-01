const body = document.body;
const buttons = document.querySelectorAll(".btn");
const calculationArea = document.querySelector(".calculationarea");
const frame = document.querySelector(".frame");
const cool = document.querySelector(".toggle-coolness");
let valueToDisplay = "";

if(localStorage.getItem("coolMode") === "on") {
    cool.textContent = "😎";
    frame.classList.add("neon-shadow");
    body.style.backgroundColor = "rgb(29, 29, 29)";
}

buttons.forEach((button) => {
    button.addEventListener("click", ()=> {
        if(button.textContent === "=") {
            try {
                valueToDisplay = eval(valueToDisplay);
            } catch (error) {
                valueToDisplay = error;
            }
        } else if(button.textContent === "clear") {
            valueToDisplay = "";
        } else {
            valueToDisplay += `${button.textContent}`;
        }
        calculationArea.value = valueToDisplay;
    })
})

body.addEventListener("keydown", (e)=> {
    let key = e.key;
    if(key === "Enter" && valueToDisplay.length>0) {
        try {
            valueToDisplay = eval(valueToDisplay);
        } catch (error) {
            valueToDisplay = error;
        }
    } else if(key === "Escape") {
        valueToDisplay = "";
    } else if (key === "Backspace") {
        valueToDisplay = valueToDisplay.substring(0, valueToDisplay.length-1);
    } else if((key >= "0" && key <= "9") || key === "." || key === "*" || key === "/" || key === "-" || key === "+") {
        valueToDisplay += `${key}`;
    }
    valueToDisplay = String(valueToDisplay);
    calculationArea.value = valueToDisplay;
})

function toggle() {
    if(localStorage.getItem("coolMode") === "off" || localStorage.getItem("coolMode") === null) {
        cool.textContent = "😎";
        localStorage.setItem("coolMode", "on");
        frame.classList.remove("normal-shadow");
        frame.classList.add("neon-shadow");
        body.style.backgroundColor = "rgb(29, 29, 29)";
    } else {
        cool.textContent = "😑";
        localStorage.setItem("coolMode", "off");
        frame.classList.remove("neon-shadow");
        frame.classList.add("normal-shadow");
        body.style.backgroundColor = "white";
    }
}

cool.addEventListener("click", ()=> {
    toggle();
})
