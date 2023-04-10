document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro');
});

const timer = {
    pomodoro: 1,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
};

const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
    const { action } = mainButton.dataset;
    action == 'start' ? startTimer() : stopTimer();
})

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function handleMode(event) {
    const { mode } = event.target.dataset;

    if (!mode) return;

    switchMode(mode);
    stopTimer();
}

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
    
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        minutes: `${minutes}`.padStart(2, '0'),
        seconds: `${seconds}`.padStart(2, '0'),
    };
}

function updateTimer(endTime) {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    total <= 0 ? clearInterval(interval) : null;
}

let interval;

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');

    interval = setInterval(() => {
        updateTimer(endTime);
    }, 1000);

}

function stopTimer() {
    clearInterval(interval);

    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
}

function updateClock() {
    const minutes = `${timer.remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${timer.remainingTime.seconds}`.padStart(2, '0');

    document.getElementById('js-minutes').textContent = minutes;
    document.getElementById('js-seconds').textContent = seconds;
}

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    };

    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));

    document
        .querySelector(`[data-mode="${mode}"]`)
        .classList.add('active');

    document
        .body
        .style
        .backgroundColor = `var(--${mode})`;

    updateClock();

}