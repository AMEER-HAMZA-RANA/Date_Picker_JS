import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "/node_modules/date-fns/index.js";
import format from "/node_modules/date-fns/format/index.js";

const datePickerBtn = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");
const prevMothBtn = document.querySelector(".prev-month-button");
const nextMothBtn = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

datePickerBtn.addEventListener("click", () => {
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  currentDate = selectedDate;
  setupDatePicker(selectedDate);
});

function setDate(date) {
  datePickerBtn.innerText = format(date, "MMMM do, yyyy");
  datePickerBtn.dataset.selectedDate = getUnixTime(date);
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, "MMMM - yyyy");
  setupDates(selectedDate);
}

function setupDates(selectedDate) {
  let firstWeekStart = startOfWeek(startOfMonth(currentDate));
  let lastWeekEnd = endOfWeek(endOfMonth(currentDate));
  dateGrid.innerHTML = "";

  let dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  dates.forEach((d) => {
    const dateCell = document.createElement("button");
    dateCell.classList.add("date");
    dateCell.innerText = d.getDate();
    if (!isSameMonth(d, selectedDate)) {
      dateCell.classList.add("date-picker-other-month-date");
    }
    if (isSameDay(d, selectedDate)) {
      dateCell.classList.add("selected");
    }
    dateCell.addEventListener("click", () => {
      setDate(d);
      dateCell.classList.add("selected");
      datePicker.classList.remove("show");
    });
    dateGrid.appendChild(dateCell);
  });
}

prevMothBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  currentDate = subMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});
2;
nextMothBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  currentDate = addMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});

setDate(new Date());
