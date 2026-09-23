```javascript
document.addEventListener("DOMContentLoaded", function () {

  /* ==================================
     MOVIE DATABASE
  ================================== */

  const movies = [

    {
      title: "Mirzapur: The Movie",
      genre: "Action • Crime • Thriller",
      image:
        "https://newimages.qfxcinemas.com/S3/uploads/gallery/1782813261880-mirzapur_poster.jpg"
    },

    {
      title: "Haiwaan",
      genre: "Action • Thriller",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDI3MDI3NmUtNjAwZS00OWU5LWI4ODEtMzMxMTI2OGRhZjQ5XkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg"
    },

    {
      title: "The Vvaan",
      genre: "Fantasy • Action",
      image:
        "https://www.keralatv.in/media/2026/07/The-Vvan-Release-Date-941x941.jpg"
    },

    {
      title: "Love & War",
      genre: "Drama • Romance",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2IwZmI5OTEtNjljMi00YWIxLWJkYWYtMTRiNTAzMDZjM2M0XkEyXkFqcGc%40._V1_.jpg"
    }

  ];


  /* ==================================
     ELEMENTS
  ================================== */

  const movieList =
    document.getElementById("movieList");

  const movieCount =
    document.getElementById("movieCount");

  const noResults =
    document.getElementById("noResults");

  const searchInput =
    document.getElementById("searchInput");

  const searchButton =
    document.getElementById("searchButton");

  const year =
    document.getElementById("year");


  /* ==================================
     DISPLAY MOVIES
  ================================== */

  function displayMovies(movieData) {

    movieList.innerHTML = "";


    if (movieData.length === 0) {

      noResults.hidden = false;

      movieCount.textContent =
        "0 Movies";

      return;

    }


    noResults.hidden = true;


    movieCount.textContent =
      movieData.length +
      (movieData.length === 1
        ? " Movie"
        : " Movies");


    movieData.forEach(function (movie) {

      const card =
        document.createElement("article");

      card.className =
        "movie-card";


      card.innerHTML = `

        <img
          src="${movie.image}"
          alt="${movie.title}"
          loading="lazy"
        >

        <div class="movie-card-content">

          <h3>${movie.title}</h3>

          <p>${movie.genre}</p>

        </div>

      `;


      movieList.appendChild(card);

    });

  }


  /* ==================================
     SEARCH MOVIES
  ================================== */

  function searchMovies() {

    const searchText =
      searchInput.value
        .trim()
        .toLowerCase();


    if (searchText === "") {

      displayMovies(movies);

      return;

    }


    const results =
      movies.filter(function (movie) {

        return (
          movie.title
            .toLowerCase()
            .includes(searchText)
          ||
          movie.genre
            .toLowerCase()
            .includes(searchText)
        );

      });


    displayMovies(results);

  }


  /* ==================================
     SEARCH BUTTON
  ================================== */

  if (searchButton) {

    searchButton.addEventListener(
      "click",
      searchMovies
    );

  }


  /* ==================================
     LIVE SEARCH
  ================================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      searchMovies
    );


    searchInput.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          searchMovies();

        }

      }
    );

  }


  /* ==================================
     CURRENT YEAR
  ================================== */

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* ==================================
     INITIAL LOAD
  ================================== */

  displayMovies(movies);


  console.log(
    "XYZMOVIEDAILY loaded successfully."
  );

});
```
