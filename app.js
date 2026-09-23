```javascript
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     CURRENT YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     MOVIE SEARCH
  ========================= */

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  const movieCards = document.querySelectorAll(".movie-card");
  const newsCards = document.querySelectorAll(
    ".main-news, .small-news, .review-card"
  );


  function performSearch() {

    const searchText = searchInput.value
      .trim()
      .toLowerCase();


    if (searchText === "") {

      movieCards.forEach(function (card) {
        card.style.display = "";
      });

      newsCards.forEach(function (card) {
        card.style.display = "";
      });

      return;
    }


    movieCards.forEach(function (card) {

      const text = card.textContent.toLowerCase();

      if (text.includes(searchText)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });


    newsCards.forEach(function (card) {

      const text = card.textContent.toLowerCase();

      if (text.includes(searchText)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  }


  /* Search button */

  if (searchButton) {
    searchButton.addEventListener(
      "click",
      performSearch
    );
  }


  /* Search while typing */

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      performSearch
    );

    searchInput.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {
          performSearch();
        }

      }
    );
  }


  /* =========================
     MOVIE BUTTONS
  ========================= */

  const movieButtons =
    document.querySelectorAll(".primary-button");


  movieButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      alert(
        "Movie details will be available soon on XYZMOVIEDAILY!"
      );

    });

  });


  /* =========================
     CONSOLE MESSAGE
  ========================= */

  console.log(
    "XYZMOVIEDAILY is running successfully!"
  );

});
```
