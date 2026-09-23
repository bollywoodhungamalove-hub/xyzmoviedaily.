document.addEventListener("DOMContentLoaded", function () {
  const year = new Date().getFullYear();
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = year;
  }

  console.log("XYZMOVIEDAILY website loaded successfully!");
});
