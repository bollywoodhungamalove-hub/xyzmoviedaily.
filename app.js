```javascript
/* =========================================================
   XYZMOVIEDAILY
   Poster-fix version
   No TMDB
   No API key
   No external poster images
   ========================================================= */


/* =========================================================
   MOVIE DATA
   ========================================================= */

const movies = [
  {
    title: "Dhurandhar",
    year: "2025",
    genre: "Action • Thriller",
    rating: "8.5",
    color1: "#8b0000",
    color2: "#111111",
    trailer:
      "https://www.youtube.com/results?search_query=Dhurandhar+official+trailer",
    description:
      "An action thriller filled with suspense, drama and powerful characters."
  },

  {
    title: "War 2",
    year: "2025",
    genre: "Action • Spy",
    rating: "8.2",
    color1: "#143d59",
    color2: "#050505",
    trailer:
      "https://www.youtube.com/results?search_query=War+2+official+trailer",
    description:
      "An action-packed spy adventure featuring missions, combat and high-stakes drama."
  },

  {
    title: "Coolie",
    year: "2025",
    genre: "Action • Drama",
    rating: "8.0",
    color1: "#7b3f00",
    color2: "#100c08",
    trailer:
      "https://www.youtube.com/results?search_query=Coolie+official+trailer",
    description:
      "A stylish action drama packed with powerful characters and explosive moments."
  },

  {
    title: "Housefull 5",
    year: "2025",
    genre: "Comedy",
    rating: "7.6",
    color1: "#5b2c83",
    color2: "#160b20",
    trailer:
      "https://www.youtube.com/results?search_query=Housefull+5+official+trailer",
    description:
      "A comedy entertainer filled with characters, confusion, twists and fun."
  },

  {
    title: "Avatar Fire and Ash",
    year: "2025",
    genre: "Adventure • Sci-Fi",
    rating: "8.7",
    color1: "#006994",
    color2: "#06141c",
    trailer:
      "https://www.youtube.com/results?search_query=Avatar+Fire+and+Ash+official+trailer",
    description:
      "A new adventure in the Avatar universe featuring spectacular worlds and action."
  },

  {
    title: "Superman",
    year: "2025",
    genre: "Action • Superhero",
    rating: "8.1",
    color1: "#174ea6",
    color2: "#07152f",
    trailer:
      "https://www.youtube.com/results?search_query=Superman+2025+official+trailer",
    description:
      "A superhero adventure following Superman as he protects his world."
  },

  {
    title: "The Fantastic Four",
    year: "2025",
    genre: "Action • Sci-Fi",
    rating: "8.0",
    color1: "#176b87",
    color2: "#071316",
    trailer:
      "https://www.youtube.com/results?search_query=Fantastic+Four+2025+official+trailer",
    description:
      "A superhero team faces extraordinary challenges while protecting their world."
  },

  {
    title: "Mission Impossible",
    year: "2025",
    genre: "Action • Adventure",
    rating: "8.4",
    color1: "#4a4a4a",
    color2: "#050505",
    trailer:
      "https://www.youtube.com/results?search_query=Mission+Impossible+2025+official+trailer",
    description:
      "An elite team faces a dangerous mission with impossible odds."
  }
];


/* =========================================================
   CREATE POSTER
   ========================================================= */

function createPoster(movie) {

  const titleParts =
    movie.title.split(" ");

  let line1 = "";
  let line2 = "";

  if (titleParts.length <= 2) {

    line1 = movie.title;

  } else {

    const middle =
      Math.ceil(titleParts.length / 2);

    line1 =
      titleParts.slice(0, middle).join(" ");

    line2 =
      titleParts.slice(middle).join(" ");

  }


  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="600"
      height="900"
      viewBox="0 0 600 900"
    >

      <defs>

        <linearGradient
          id="bg"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >

          <stop
            offset="0%"
            stop-color="${movie.color1}"
          />

          <stop
            offset="100%"
            stop-color="${movie.color2}"
          />

        </linearGradient>

        <radialGradient
          id="glow"
          cx="50%"
          cy="35%"
          r="60%"
        >

          <stop
            offset="0%"
            stop-color="white"
            stop-opacity=".20"
          />

          <stop
            offset="100%"
            stop-color="white"
            stop-opacity="0"
          />

        </radialGradient>

      </defs>


      <rect
        width="600"
        height="900"
        fill="url(#bg)"
      />


      <circle
        cx="300"
        cy="300"
        r="280"
        fill="url(#glow)"
      />


      <circle
        cx="300"
        cy="330"
        r="150"
        fill="none"
        stroke="white"
        stroke-opacity=".15"
        stroke-width="3"
      />


      <circle
        cx="300"
        cy="330"
        r="105"
        fill="none"
        stroke="white"
        stroke-opacity=".12"
        stroke-width="2"
      />


      <text
        x="300"
        y="80"
        text-anchor="middle"
        fill="white"
        font-family="Arial, Helvetica, sans-serif"
        font-size="22"
        font-weight="bold"
        letter-spacing="5"
      >
        XYZMOVIEDAILY
      </text>


      <text
        x="300"
        y="625"
        text-anchor="middle"
        fill="white"
        font-family="Arial, Helvetica, sans-serif"
        font-size="46"
        font-weight="900"
      >
        ${escapeSvg(line1)}
      </text>


      ${
        line2
          ? `
            <text
              x="300"
              y="680"
              text-anchor="middle"
              fill="white"
              font-family="Arial, Helvetica, sans-serif"
              font-size="42"
              font-weight="900"
            >
              ${escapeSvg(line2)}
            </text>
          `
          : ""
      }


      <rect
        x="180"
        y="735"
        width="240"
        height="3"
        fill="white"
        opacity=".7"
      />


      <text
        x="300"
        y="780"
        text-anchor="middle"
        fill="white"
        font-family="Arial, Helvetica, sans-serif"
        font-size="21"
        font-weight="bold"
        letter-spacing="3"
      >
        ${escapeSvg(movie.genre)}
      </text>


      <text
        x="300"
        y="830"
        text-anchor="middle"
        fill="white"
        opacity=".75"
        font-family="Arial, Helvetica, sans-serif"
        font-size="20"
      >
        ${escapeSvg(movie.year)}
      </text>

    </svg>
  `;


  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg)
  );

}


/* =========================================================
   ELEMENTS
   ========================================================= */

const trendingGrid =
  document.getElementById("trendingGrid");

const popularGrid =
  document.getElementById("popularGrid");

const upcomingGrid =
  document.getElementById("upcomingGrid");

const searchForm =
  document.getElementById("searchForm");

const searchInput =
  document.getElementById("searchInput");

const searchSection =
  document.getElementById("searchSection");

const searchGrid =
  document.getElementById("searchGrid");

const searchTitle =
  document.getElementById("searchTitle");

const clearSearch =
  document.getElementById("clearSearch");

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

const year =
  document.getElementById("year");

const movieModal =
  document.getElementById("movieModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const modalClose =
  document.getElementById("modalClose");

const modalPoster =
  document.getElementById("modalPoster");

const modalTitle =
  document.getElementById("modalTitle");

const modalLabel =
  document.getElementById("modalLabel");

const modalMeta =
  document.getElementById("modalMeta");

const modalOverview =
  document.getElementById("modalOverview");

const modalTrailer =
  document.getElementById("modalTrailer");


/* =========================================================
   CREATE MOVIE CARD
   ========================================================= */

function createMovieCard(movie, number = "") {

  const poster =
    createPoster(movie);

  return `
    <article class="movie-card">

      <button
        class="movie-poster-button"
        data-movie="${escapeAttribute(movie.title)}"
        aria-label="Open ${escapeAttribute(movie.title)}"
      >

        <div class="movie-poster-wrapper">

          <img
            class="movie-poster"
            src="${poster}"
            alt="${escapeAttribute(movie.title)} poster"
          >

          ${
            number
              ? `
                <span class="trending-number">
                  ${number}
                </span>
              `
              : ""
          }

          <span class="play-overlay">
            ▶
          </span>

        </div>

      </button>


      <div class="movie-info">

        <h3 class="movie-title">
          ${escapeHtml(movie.title)}
        </h3>

        <div class="movie-meta">

          <span>
            ${escapeHtml(movie.year)}
          </span>

          <span>•</span>

          <span>
            ⭐ ${escapeHtml(movie.rating)}
          </span>

        </div>


        <p class="movie-genre">
          ${escapeHtml(movie.genre)}
        </p>


        <button
          class="trailer-button"
          data-trailer="${escapeAttribute(movie.trailer)}"
        >
          ▶ Watch Trailer
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   DISPLAY MOVIES
   ========================================================= */

function displayMovies(
  movieList,
  container,
  numbered = false
) {

  if (!container) return;


  container.innerHTML =
    movieList
      .map((movie, index) => {

        return createMovieCard(
          movie,
          numbered
            ? index + 1
            : ""
        );

      })
      .join("");


  setupMovieButtons(container);
}


/* =========================================================
   MOVIE BUTTONS
   ========================================================= */

function setupMovieButtons(container) {

  const posterButtons =
    container.querySelectorAll(
      ".movie-poster-button"
    );


  posterButtons.forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const title =
          button.dataset.movie;

        const movie =
          movies.find(
            item =>
              item.title === title
          );


        if (movie) {
          openMovieModal(movie);
        }

      }
    );

  });


  const trailerButtons =
    container.querySelectorAll(
      ".trailer-button"
    );


  trailerButtons.forEach(button => {

    button.addEventListener(
      "click",
      function() {

        openTrailer(
          button.dataset.trailer
        );

      }
    );

  });

}


/* =========================================================
   OPEN TRAILER
   ========================================================= */

function openTrailer(url) {

  if (!url) return;


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   LOAD MOVIES
   ========================================================= */

function loadMovies() {

  displayMovies(
    movies.slice(0, 6),
    trendingGrid,
    true
  );


  displayMovies(
    movies.slice(2, 8),
    popularGrid,
    false
  );


  displayMovies(
    movies.slice(4, 8),
    upcomingGrid,
    false
  );


  updateCounts();

}


/* =========================================================
   UPDATE COUNTS
   ========================================================= */

function updateCounts() {

  const trendingCount =
    document.getElementById(
      "trendingCount"
    );

  const popularCount =
    document.getElementById(
      "popularCount"
    );

  const upcomingCount =
    document.getElementById(
      "upcomingCount"
    );


  if (trendingCount) {

    trendingCount.textContent =
      "6 Movies";

  }


  if (popularCount) {

    popularCount.textContent =
      "6 Movies";

  }


  if (upcomingCount) {

    upcomingCount.textContent =
      "4 Movies";

  }

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchMovies(query) {

  const cleanQuery =
    query.trim().toLowerCase();


  if (!cleanQuery) {

    searchSection.hidden = true;

    return;

  }


  const results =
    movies.filter(movie => {

      return (
        movie.title
          .toLowerCase()
          .includes(cleanQuery)
        ||
        movie.genre
          .toLowerCase()
          .includes(cleanQuery)
      );

    });


  searchSection.hidden = false;


  searchTitle.textContent =
    `Results for "${query.trim()}"`;


  displayMovies(
    results,
    searchGrid
  );


  searchSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   SEARCH FORM
   ========================================================= */

if (searchForm) {

  searchForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      searchMovies(
        searchInput.value
      );

    }
  );

}


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

if (clearSearch) {

  clearSearch.addEventListener(
    "click",
    function() {

      searchInput.value = "";

      searchSection.hidden = true;

    }
  );

}


/* =========================================================
   MODAL
   ========================================================= */

function openMovieModal(movie) {

  if (!movieModal) return;


  modalPoster.src =
    createPoster(movie);

  modalPoster.alt =
    `${movie.title} poster`;


  modalTitle.textContent =
    movie.title;


  modalLabel.textContent =
    movie.genre;


  modalMeta.innerHTML = `
    <span>${escapeHtml(movie.year)}</span>
    <span>•</span>
    <span>⭐ ${escapeHtml(movie.rating)}</span>
  `;


  modalOverview.textContent =
    movie.description;


  modalTrailer.href =
    movie.trailer;


  movieModal.classList.add(
    "active"
  );


  movieModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeMovieModal() {

  if (!movieModal) return;


  movieModal.classList.remove(
    "active"
  );


  movieModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   MODAL EVENTS
   ========================================================= */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeMovieModal
  );

}


if (modalOverlay) {

  modalOverlay.addEventListener(
    "click",
    closeMovieModal
  );

}


document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeMovieModal();

    }

  }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (
  mobileMenuButton &&
  mobileMenu
) {

  mobileMenuButton.addEventListener(
    "click",
    function() {

      mobileMenu.classList.toggle(
        "active"
      );

    }
  );


  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        function() {

          mobileMenu.classList.remove(
            "active"
          );

        }
      );

    });

}


/* =========================================================
   YEAR
   ========================================================= */

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   ESCAPE ATTRIBUTE
   ========================================================= */

function escapeAttribute(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}


/* =========================================================
   ESCAPE SVG
   ========================================================= */

function escapeSvg(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

}


/* =========================================================
   START
   ========================================================= */

loadMovies();
```
