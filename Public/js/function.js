//input range 
const rangeDays = document.getElementById("rangeDays");
const spanDays = rangeDays.parentElement.querySelector("span");

rangeDays.addEventListener("input", () => {
  spanDays.textContent = `${rangeDays.value} hari`;
});

//