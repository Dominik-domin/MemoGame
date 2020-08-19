const imgElements = ["img/img1.jpg", "img/img1.jpg", "img/img2.jpg", "img/img2.jpg", "img/img4.jpg", "img/img4.jpg", "img/img5.jpg", "img/img5.jpg", "img/img7.jpg", "img/img7.jpg", "img/img8.jpg", "img/img8.jpg", "img/img9.jpg", "img/img9.jpg", "img/img10.jpg", "img/img10.jpg", "img/img11.jpg", "img/img11.jpg", "img/img12.jpg", "img/img12.jpg", "img/img13.jpg", "img/img13.jpg", "img/img15.jpg", "img/img15.jpg", "img/img16.jpg", "img/img16.jpg", "img/img17.png", "img/img17.png", "img/img18.jpg", "img/img18.jpg"];
const walls = document.querySelectorAll(".wall");
const images = document.querySelectorAll("img");
const startBtn = document.querySelector(".start");
const container = document.querySelector(".container");
const time = document.querySelector(".time");
wallsArr = Array.from(walls);
imagesArr = Array.from(images);


let startTime;
let clickedElements = [];
let numberOfClicks = 0;
let gamePairs = 0;

const startGame = function () {
    startTime = performance.now();
    interval = window.setInterval(stopWatch, 1000);
    startBtn.classList.add("hide");
    container.classList.remove("hide");
    shuffledImages = imgElements.sort(() => Math.random() - 0.5);
    for (let i = 0; i < imgElements.length; i++) {
        imagesArr[i].src = imgElements[i];
        wallsArr[i].dataset.imageSource = imgElements[i];
    }
    setTimeout(function () {
        wallsArr.forEach(wall => {
            wall.classList.add("black");
            wall.addEventListener("click", checkCards);
        })
    }, 2000)
}

const checkCards = function () {
    if (numberOfClicks === 0) {
        this.classList.remove("black");
        clickedElements[0] = this;
        numberOfClicks += 1;
    } else {
        this.classList.remove("black");
        clickedElements[1] = this;
        numberOfClicks += 1;
    }
    if (numberOfClicks === 2) {
        wallsArr.forEach(wall => {
            wall.removeEventListener("click", checkCards);
        })
        setTimeout(function () {
            if (clickedElements[0].dataset.imageSource === clickedElements[1].dataset.imageSource) {
                gamePairs += 1;
                console.log(gamePairs);
                clickedElements.forEach(clickedElement => {
                    clickedElement.classList.add("border");
                })
                wallsArr = wallsArr.filter(wall => !wall.classList.contains("border"));
            } else {
                clickedElements.forEach(clickedElement => {
                    clickedElement.classList.add("black");
                })
            }
            clickedElements = [];
            numberOfClicks = 0;
            wallsArr.forEach(wall => {
                wall.addEventListener("click", checkCards);
            })
        }, 400)
    }
    setTimeout(function () {
        if (gamePairs === 15) {
            window.clearInterval(interval);
            const endTime = performance.now();
            const gameTime = (endTime - startTime) / 1000
            startBtn.classList.remove("hide");
            startBtn.textContent = `Wygrałeś w ${gameTime.toFixed(2)} sekund!`;
            container.classList.add('hide');

        }
    }, 500)
}


// Licznik czasu
let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;
let status = "stopped";
const stopWatch = function () {
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours.toString();
    } else {
        displayHours = hours;
    }
    time.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

startBtn.addEventListener("click", startGame);