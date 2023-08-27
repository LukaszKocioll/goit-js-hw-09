import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const datetimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector("[data-start]");
  const daysValue = document.querySelector("[data-days]");
  const hoursValue = document.querySelector("[data-hours]");
  const minutesValue = document.querySelector("[data-minutes]");
  const secondsValue = document.querySelector("[data-seconds]");

  function startCountdown(targetDate) {
    const interval = setInterval(() => {
      const now = new Date();
      const timeRemaining = targetDate - now;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateDisplay({ days, hours, minutes, seconds });
    }, 1000);
  }

  function updateDisplay({ days, hours, minutes, seconds }) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
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

  flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();

      if (selectedDate <= now) {
        alert("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

  startButton.addEventListener("click", () => {
    const selectedDate = new Date(datetimePicker.value);
    startCountdown(selectedDate);
  });
});
