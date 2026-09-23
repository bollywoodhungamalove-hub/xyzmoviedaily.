```javascript
/* ==========================================
   XYZMOVIEDAILY
   Movie Data
========================================== */

const trendingMovies = [

  {
    title: "Avatar",
    year: "2009",
    genre: "Sci-Fi / Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Avatar+official+trailer"
  },

  {
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi / Thriller",
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Inception+official+trailer"
  },

  {
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi / Drama",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Interstellar+official+trailer"
  },

  {
    title: "The Dark Knight",
    year: "2008",
    genre: "Action / Crime",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=The+Dark+Knight+official+trailer"
  },

  {
    title: "Oppenheimer",
    year: "2023",
    genre: "Drama / History",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Oppenheimer+official+trailer"
  },

  {
    title: "Dune",
    year: "2021",
    genre: "Sci-Fi / Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/8c/Dune_%282021%29.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Dune+official+trailer"
  },

  {
    title: "Avengers: Endgame",
    year: "2019",
    genre: "Action / Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Avengers+Endgame+official+trailer"
  },

  {
    title: "Joker",
    year: "2019",
    genre: "Crime / Drama",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Joker+2019+official+trailer"
  }

];


const latestMovies = [

  {
    title: "Avatar: The Way of Water",
    year: "2022",
    genre: "Sci-Fi / Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5a/Avatar_The_Way_of_Water_poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Avatar+The+Way+of+Water+official+trailer"
  },

  {
    title: "Top Gun: Maverick",
    year: "2022",
    genre: "Action / Drama",
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Top+Gun+Maverick+official+trailer"
  },

  {
    title: "John Wick",
    year: "2014",
    genre: "Action / Thriller",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=John+Wick+official+trailer"
  },

  {
    title: "Spider-Man: No Way Home",
    year: "2021",
    genre: "Action / Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    trailer:
      "https://www.youtube.com/results?search_query=Spider-Man+No+Way+Home+official+trailer"
  }

];


/* ==========================================
   CREATE MOVIE CARD
========================================== */

function createMovieCard(movie, trending = false) {

  const card = document.createElement("article");

  card.className = "movie-card";

  card.innerHTML = `

    <div class="poster-wrapper">

      <img
        src="${movie.image}"
        alt="${movie.title} poster"
        loading="lazy"
        onerror="this.onerror=null; this.src='https://placehold.co/500x750/18181f/ffffff?text=Poster+Unavailable';"
      >

      ${
        trending
          ? `<span class="trending-badge">TRENDING</span>`
          : ""
      }

    </div>

    <div class="movie-info">

      <h3 title="${movie.title}">
        ${movie.title}
      </h3>

      <p class="movie-meta">
        ${movie.year} • ${movie.genre}
      </p>

      <a
        class="trailer-button"
        href="${movie.trailer}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch Official Trailer
      </a>

    </div>

  `;

  return card;
}


/* ==========================================
   DISPLAY MOVIES
========================================== */

function displayMovies() {

  const movieGrid =
    document.getElementById("movieGrid");

  const latestGrid =
    document.getElementById("latestGrid");

  const movieCount =
    document.getElementById("movieCount");


  if (movieGrid) {

    movieGrid.innerHTML = "";

    trendingMovies.forEach((movie) => {

      movieGrid.appendChild(
        createMovieCard(movie, true)
      );

    });

  }


  if (latestGrid) {

    latestGrid.innerHTML = "";

    latestMovies.forEach((movie) => {

      latestGrid.appendChild(
        createMovieCard(movie, false)
      );

    });

  }


  if (movieCount) {

    movieCount.textContent =
      `${trendingMovies.length} Movies`;

  }

}


/* ==========================================
   MOBILE MENU
========================================== */

function setupMobileMenu() {

  const menuButton =
    document.getElementById("menuButton");

  const mobileMenu =
    document.getElementById("mobileMenu");


  if (!menuButton || !mobileMenu) {
    return;
  }


  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

  });


  const links =
    mobileMenu.querySelectorAll("a");


  links.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

    });

  });

}


/* ==========================================
   CURRENT YEAR
========================================== */

function setCurrentYear() {

  const year =
    document.getElementById("year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


/* ==========================================
   START WEBSITE
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    displayMovies();

    setupMobileMenu();

    setCurrentYear();

  }
);
```
