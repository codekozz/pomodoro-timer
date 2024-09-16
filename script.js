const timer = document.querySelector('#pomodoro-time');
let seconds = parseInt(timer.textContent[3] + timer.textContent[4]) + 1;
let minutes = parseInt(timer.textContent[0] + timer.textContent[1]);

let timerId;
let numberStart = 25;

function startTimer() {
    if (startButton.textContent === 'start') {
        timerId = setInterval(timerOn, 50);
        startButton.textContent = 'stop';

    } else {
        startButton.textContent = 'start';
        clearInterval(timerId);
    }
}

function timerOn() {

    seconds--;

    if (minutes > 9 && seconds > 9) {
        timer.textContent = `${minutes}:${seconds}`;
    } else if (minutes > 9 && seconds < 10) {
        timer.textContent = `${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds === 0) {
        timer.textContent = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds > 9) {
        timer.textContent = `0${minutes}:${seconds}`;
    } else {
        timer.textContent = `0${minutes}:0${seconds}`;
    }

    if (seconds < 1) {
        if (minutes == 0 && seconds < 1) {
            clearInterval(timerId);
            minutes = numberStart;
            if (numberStart < 10) {
                timer.textContent = `0${minutes}:0${seconds}`;
            } else {
                timer.textContent = `${minutes}:0${seconds}`;
            }
            startButton.textContent = 'start';
        }
        seconds = 60;
        minutes--;
    }
}

const startButton = document.querySelector('#start');
startButton.addEventListener('click', startTimer);

const optionsContainer = document.querySelector('.pomodoro-options');
const optionsButton = optionsContainer.querySelectorAll('.btn');

const resetButton = document.querySelector('#reset');

for (let item of optionsButton) {
    item.addEventListener('click', function() {

        const activeButton = document.querySelectorAll('.active');

        for (let newItem of activeButton) {
            newItem.classList.remove('active');
        }

        resetButton.addEventListener('click', function() {

            optionsChange(item);

        });

        item.classList.add('active');
        optionsChange(item);

    });
}

function optionsChange(item) {

    if (item.textContent === 'Pomodoro') {
        numberStart = 25
        minutes = numberStart;
        seconds = 1;
        timer.textContent = `${minutes}:00`;
    }

    if (item.textContent === 'Break') {
        numberStart = 5
        minutes = numberStart;
        seconds = 1;
        timer.textContent = `0${minutes}:00`;
    }

    startButton.textContent = 'start'
    clearInterval(timerId);
}