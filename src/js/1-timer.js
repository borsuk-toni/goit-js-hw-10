import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

let timerInterval;

function startCountdown() {
  timerInterval = setInterval(changeTimer, 1000, userSelectedDate);
  inputDate.disabled = true;
  startBtn.disabled = true;
}

function changeTimer(endDate) {
  const currentDate = new Date();
  const timeLeft = endDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }
  
  if (timeLeft <= 0) {
    stopCountdown();
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopCountdown() {
  clearInterval(timerInterval);
  daysValue.textContent = '00';
  hoursValue.textContent = '00';
  minutesValue.textContent = '00';
  secondsValue.textContent = '00';
  timerInterval = null;
  inputDate.disabled = false;
  startBtn.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputDate, options);

startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown();
    inputDate.disabled = true;
  }
});

startBtn.disabled = true;