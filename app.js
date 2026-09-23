```javascript
/* =========================================================
   XYZMOVIEDAILY
   Simple version - NO TMDB API
   ========================================================= */


/* ================= MOVIE DATA ================= */

const movies = [

  {
    title: "Dhurandhar",
    year: "2025",
    genre: "Action • Thriller",
    rating: "8.5",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    description:
      "An action thriller filled with suspense, drama and powerful characters.",
    trailer:
      "https://www.youtube.com/results?search_query=Dhurandhar+official+trailer"
  },

  {
    title: "War 2",
    year: "2025",
    genre: "Action • Spy",
    rating: "8.2",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    description:
      "An action-packed spy adventure featuring missions, combat and high-stakes drama.",
    trailer:
      "https://www.youtube.com/results?search_query=War+2+official+trailer"
  },

  {
    title: "Coolie",
    year: "2025",
    genre: "Action • Drama",
    rating: "8.0",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",
    description:
      "A stylish action drama packed with powerful characters and explosive moments.",
    trailer:
      "https://www.youtube.com/results?search_query=Coolie+official+trailer"
  },

  {
    title: "Housefull 5",
    year: "2025",
    genre: "Comedy",
    rating: "7.6",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    description:
      "A comedy entertainer filled with characters, confusion, twists and fun.",
    trailer:
      "https://www.youtube.com/results?search_query=Housefull+5+official+trailer"
  },

  {
    title: "Avatar Fire and Ash",
    year: "2025",
    genre: "Adventure • Sci-Fi",
    rating: "8.7",
    poster:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    description:
      "A new adventure in the Avatar universe featuring spectacular worlds and action.",
    trailer:
      "https://www.youtube.com/results?search_query=Avatar+Fire+and+Ash+official+trailer"
  },

  {
    title: "Superman",
    year: "2025",
    genre: "Action • Superhero",
    rating: "8.1",
    poster:
      "https://images.unsplash.com/photo-1534801022022-6e5a8f7f5b4f?auto=format&fit=crop&w=600&q=80",
    description:
      "A superhero adventure following Superman as he protects his world.",
    trailer:
      "https://www.youtube.com/results?search_query=Superman+2025+official+trailer"
  },

  {
    title: "The Fantastic Four",
    year: "2025",
    genre: "Action • Sci-Fi",
    rating: "8.0",
    poster:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    description:
      "A superhero team faces extraordinary challenges while protecting their world.",
    trailer:
      "https://www.youtube.com/results?search_query=Fantastic+Four+2025+official+trailer"
  },

  {
    title: "Mission Impossible",
    year: "2025",
    genre: "Action • Adventure",
    rating: "8.4",
    poster:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
    description:
      "An elite team faces a dangerous mission with impossible odds.",
    trailer:
      "https://www.youtube.com/results?search_query=Mission+Impossible+2025+official+trailer"
  }

];


/* ================= ELEMENTS ================= */

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


/* ================= MOVIE CARD ================= */

function createMovieCard(movie, number = "") {

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
            src="${movie.poster}"
            alt="${escapeAttribute(movie.title)} poster"
            loading="lazy"
            onerror="this.src='https://placehold.co/600x900/18181f/ffffff?text=Movie'"
          >

          ${
            number
              ? `<span class="trending-number">${number}</span>`
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
          <span>${escapeHtml(movie.year)}</span>
          <span>•</span>
          <span>⭐ ${escapeHtml(movie.rating)}</span>
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


/* ================= DISPLAY MOVIES ================= */

function displayMovies(
  movieList,
  container,
  numbered = false
) {

  if (!container) return;

  container.innerHTML = movieList
    .map((movie, index) => {

      const number =
        numbered
          ? index + 1
          : "";

      return createMovieCard(
        movie,
        number
      );

    })
    .join("");


  setupMovieButtons(container);
}


/* ================= MOVIE BUTTONS ================= */

function setupMovieButtons(container) {

  const posterButtons =
    container.querySelectorAll(
      ".movie-poster-button"
    );


  posterButtons.forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const movieTitle =
          button.dataset.movie;

        const movie =
          movies.find(
            item =>
              item.title === movieTitle
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

        const url =
          button.dataset.trailer;

        openTrailer(url);

      }
    );

  });

}


/* ================= TRAILER ================= */

function openTrailer(url) {

  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* ================= HOME MOVIES ================= */

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


/* ================= COUNTS ================= */

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
      `${Math.min(6, movies.length)} Movies`;
  }


  if (popularCount) {
    popularCount.textContent =
      `${Math.min(6, movies.length)} Movies`;
  }


  if (upcomingCount) {
    upcomingCount.textContent =
      `${Math.min(4, movies.length)} Movies`;
  }

}


/* ================= SEARCH ================= */

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
    searchGrid,
    false
  );


  searchSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* ================= SEARCH FORM ================= */

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


/* ================= CLEAR SEARCH ================= */

if (clearSearch) {

  clearSearch.addEventListener(
    "click",
    function() {

      searchInput.value = "";

      searchSection.hidden = true;

    }
  );

}


/* ================= MODAL ================= */

function openMovieModal(movie) {

  if (!movieModal) return;


  modalPoster.src =
    movie.poster;

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


/* ================= CLOSE MODAL ================= */

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


/* ================= MODAL EVENTS ================= */

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


/* ================= MOBILE MENU ================= */

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

}


/* Close mobile menu after clicking link */

if (mobileMenu) {

  const menuLinks =
    mobileMenu.querySelectorAll("a");


  menuLinks.forEach(link => {

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


/* ================= YEAR ================= */

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* ================= SECURITY ================= */

function escapeHtml(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttribute(value) {

  return String(value)
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* ================= START ================= */

loadMovies();
```
