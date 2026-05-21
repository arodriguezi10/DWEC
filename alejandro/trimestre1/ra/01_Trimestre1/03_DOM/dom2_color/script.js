const clock = document.getElementById("clock");
const select = document.getElementById("colorSelect");

const savedColor = localStorage.getItem("clockColor");
if (savedColor) {
  clock.style.color = savedColor;
  select.value = savedColor;
}

select.addEventListener("change", () => {
  const color = select.value;
  clock.style.color = color;
  localStorage.setItem("clockColor", color);
});