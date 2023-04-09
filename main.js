const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
};

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function handleMode(event) {
    const { mode } = event.target.dataset;

    if (!mode) return;

    switchMode(mode);
}

function updateTimer() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    total <= 0 ? clearInterval(interval) : null;
}

let interval;

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    interval = setInterval(updateTimer, 1000);

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