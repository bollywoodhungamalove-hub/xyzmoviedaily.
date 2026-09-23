```javascript
/* ==================================================
   XYZMOVIEDAILY

   AUTOMATIC MOVIE WEBSITE

   Powered by TMDB API
================================================== */


/* ==================================================
   1. TMDB API KEY

   IMPORTANT:
   Put your own TMDB API key here.

   Example:

   const TMDB_API_KEY = "abc123...";

================================================== */

const TMDB_API_KEY =
  "PASTE_YOUR_TMDB_API_KEY_HERE";


/* ==================================================
   2. TMDB SETTINGS
================================================== */

const TMDB_BASE_URL =
  "https://api.themoviedb.org/3";


const TMDB_IMAGE_URL =
  "https://image.tmdb.org/t/p/w500";


const TMDB_BACKDROP_URL =
  "https://image.tmdb.org/t/p/w1280";


/* ==================================================
   3. GLOBAL VARIABLES
================================================== */

let currentMovies = [];

let searchResults = [];


/* ==================================================
   4. GENRE NAMES
================================================== */

const genres = {

  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"

};


/* ==================================================
   5. CHECK API KEY
================================================== */

function hasApiKey() {

  return (
    TMDB_API_KEY &&
    TMDB_API_KEY !==
      "PASTE_YOUR_TMDB_API_KEY_HERE"
  );

}


/* ==================================================
   6. API REQUEST
================================================== */

async function tmdbRequest(endpoint) {

  if (!hasApiKey()) {

    throw new Error(
      "TMDB API key is missing."
    );

  }


  const separator =
    endpoint.includes("?")
      ? "&"
      : "?";


  const url =
    `${TMDB_BASE_URL}${endpoint}` +
    `${separator}api_key=${encodeURIComponent(TMDB_API_KEY)}`;


  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      `TMDB API error: ${response.status}`
    );

  }


  return await response.json();

}


/* ==================================================
   7. IMAGE URL
================================================== */

function getPosterUrl(movie) {

  if (!movie.poster_path) {

    return (
      "https://placehold.co/500x750/18181f/ffffff" +
      "?text=No+Poster"
    );

  }


  return (
    TMDB_IMAGE_URL +
    movie.poster_path
  );

}


/* ==================================================
   8. RELEASE YEAR
================================================== */

function getYear(movie) {

  const date =
    movie.release_date;


  if (!date) {

    return "Coming Soon";

  }


  return date.substring(0, 4);

}


/* ==================================================
   9. GENRES
================================================== */

function getGenres(movie) {

  if (
    !movie.genre_ids ||
    movie.genre_ids.length === 0
  ) {

    return "Movie";

  }


  return movie.genre_ids
    .slice(0, 2)
    .map(
      id => genres[id] || "Movie"
    )
    .join(" / ");

}


/* ==================================================
   10. GET MOVIE TRAILER
================================================== */

async function getMovieTrailer(movieId) {

  try {

    const data =
      await tmdbRequest(
        `/movie/${movieId}/videos?language=en-US`
      );


    const videos =
      data.results || [];


    /* ------------------------------------------
       FIRST: OFFICIAL YOUTUBE TRAILER
    ------------------------------------------ */

    let trailer =
      videos.find(video => {

        return (
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true
        );

      });


    /* ------------------------------------------
       SECOND: ANY YOUTUBE TRAILER
    ------------------------------------------ */

    if (!trailer) {

      trailer =
        videos.find(video => {

          return (
            video.site === "YouTube" &&
            video.type === "Trailer"
          );

        });

    }


    /* ------------------------------------------
       THIRD: YOUTUBE TEASER
    ------------------------------------------ */

    if (!trailer) {

      trailer =
        videos.find(video => {

          return (
            video.site === "YouTube" &&
            video.type === "Teaser"
          );

        });

    }


    if (trailer) {

      return (
        `https://www.youtube.com/watch?v=${trailer.key}`
      );

    }


    return null;

  } catch (error) {

    console.error(
      "Trailer error:",
      error
    );

    return null;

  }

}


/* ==================================================
   11. CREATE TRAILER LINK
================================================== */

function createTrailerLink(movie) {

  const query =
    encodeURIComponent(
      `${movie.title} official trailer`
    );


  return (
    `https://www.youtube.com/results?search_query=${query}`
  );

}


/* ==================================================
   12. CREATE MOVIE CARD
================================================== */

async function createMovieCard(
  movie,
  position = 0,
  section = "movie"
) {

  const card =
    document.createElement("article");


  card.className =
    "movie-card";


  const poster =
    getPosterUrl(movie);


  let trailer =
    await getMovieTrailer(movie.id);


  if (!trailer) {

    trailer =
      createTrailerLink(movie);

  }


  const badge =
    section === "trending"
      ? `
        <span class="trending-badge">
          #${position + 1} TRENDING
        </span>
      `
      : "";


  card.innerHTML = `

    <div class="poster-wrapper">

      <img
        src="${poster}"
        alt="${escapeHtml(movie.title || "Movie")}"
        loading="lazy"
      >

      ${badge}

    </div>


    <div class="movie-info">

      <h3
        title="${escapeHtml(movie.title || "")}"
      >
        ${escapeHtml(movie.title || "Untitled")}
      </h3>


      <p class="movie-meta">

        ${getYear(movie)}

        •

        ${getGenres(movie)}

      </p>


      <a
        class="trailer-button"
        href="${trailer}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch Official Trailer
      </a>

    </div>

  `;


  /* ------------------------------------------
     OPEN DETAILS WHEN POSTER / TITLE CLICKED
  ------------------------------------------ */

  const posterArea =
    card.querySelector(
      ".poster-wrapper"
    );


  const title =
    card.querySelector("h3");


  posterArea.style.cursor =
    "pointer";


  title.style.cursor =
    "pointer";


  posterArea.addEventListener(
    "click",
    () => {

      openMovieModal(movie);

    }
  );


  title.addEventListener(
    "click",
    () => {

      openMovieModal(movie);

    }
  );


  return card;

}


/* ==================================================
   13. DISPLAY MOVIES
================================================== */

async function displayMovies(
  movies,
  containerId,
  countId,
  sectionName
) {

  const container =
    document.getElementById(
      containerId
    );


  const count =
    document.getElementById(
      countId
    );


  if (!container) {

    return;

  }


  if (!movies || movies.length === 0) {

    showError(
      container,
      "No movies found."
    );

    if (count) {

      count.textContent =
        "0 Movies";

    }

    return;

  }


  container.innerHTML = "";


  const limitedMovies =
    movies.slice(0, 12);


  if (count) {

    count.textContent =
      `${limitedMovies.length} Movies`;

  }


  for (
    let i = 0;
    i < limitedMovies.length;
    i++
  ) {

    try {

      const card =
        await createMovieCard(
          limitedMovies[i],
          i,
          sectionName
        );


      container.appendChild(card);

    } catch (error) {

      console.error(
        "Card error:",
        error
      );

    }

  }

}


/* ==================================================
   14. LOADING
================================================== */

function showLoading(
  containerId,
  message
) {

  const container =
    document.getElementById(
      containerId
    );


  if (!container) {

    return;

  }


  container.innerHTML = `

    <div class="loading-message">

      <div class="loader"></div>

      <p>
        ${message}
      </p>

    </div>

  `;

}


/* ==================================================
   15. ERROR
================================================== */

function showError(
  container,
  message
) {

  container.innerHTML = `

    <div class="error-message">

      <h3>
        Unable to load movies
      </h3>

      <p>
        ${message}
      </p>

    </div>

  `;

}


/* ==================================================
   16. LOAD TRENDING
================================================== */

async function loadTrending() {

  showLoading(
    "trendingGrid",
    "Loading trending movies..."
  );


  try {

    const data =
      await tmdbRequest(
        "/trending/movie/week?language=en-US"
      );


    currentMovies =
      data.results || [];


    await displayMovies(
      currentMovies,
      "trendingGrid",
      "trendingCount",
      "trending"
    );


  } catch (error) {

    console.error(
      "Trending error:",
      error
    );


    showError(
      document.getElementById(
        "trendingGrid"
      ),
      hasApiKey()
        ? "There was a problem connecting to TMDB."
        : "Add your TMDB API key in app.js first."
    );

  }

}


/* ==================================================
   17. LOAD POPULAR
================================================== */

async function loadPopular() {

  showLoading(
    "popularGrid",
    "Loading popular movies..."
  );


  try {

    const data =
      await tmdbRequest(
        "/movie/popular?language=en-US&page=1"
      );


    await displayMovies(
      data.results || [],
      "popularGrid",
      "popularCount",
      "popular"
    );


  } catch (error) {

    console.error(
      "Popular error:",
      error
    );


    showError(
      document.getElementById(
        "popularGrid"
      ),
      hasApiKey()
        ? "There was a problem connecting to TMDB."
        : "Add your TMDB API key in app.js first."
    );

  }

}


/* ==================================================
   18. LOAD UPCOMING
================================================== */

async function loadUpcoming() {

  showLoading(
    "upcomingGrid",
    "Loading upcoming movies..."
  );


  try {

    const data =
      await tmdbRequest(
        "/movie/upcoming?language=en-US&page=1"
      );


    await displayMovies(
      data.results || [],
      "upcomingGrid",
      "upcomingCount",
      "upcoming"
    );


  } catch (error) {

    console.error(
      "Upcoming error:",
      error
    );


    showError(
      document.getElementById(
        "upcomingGrid"
      ),
      hasApiKey()
        ? "There was a problem connecting to TMDB."
        : "Add your TMDB API key in app.js first."
    );

  }

}


/* ==================================================
   19. SEARCH MOVIES
================================================== */

async function searchMovies(query) {

  const searchSection =
    document.getElementById(
      "searchSection"
    );


  const searchGrid =
    document.getElementById(
      "searchGrid"
    );


  const searchTitle =
    document.getElementById(
      "searchTitle"
    );


  if (!query) {

    return;

  }


  searchSection.hidden =
    false;


  searchTitle.textContent =
    `Results for "${query}"`;


  searchGrid.innerHTML = `

    <div class="loading-message">

      <div class="loader"></div>

      <p>
        Searching movies...
      </p>

    </div>

  `;


  searchSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  try {

    const encoded =
      encodeURIComponent(query);


    const data =
      await tmdbRequest(
        `/search/movie?query=${encoded}&language=en-US&page=1&include_adult=false`
      );


    searchResults =
      data.results || [];


    await displayMovies(
      searchResults,
      "searchGrid",
      null,
      "search"
    );


  } catch (error) {

    console.error(
      "Search error:",
      error
    );


    showError(
      searchGrid,
      "Unable to search movies right now."
    );

  }

}


/* ==================================================
   20. SEARCH FORM
================================================== */

function setupSearch() {

  const form =
    document.getElementById(
      "searchForm"
    );


  const input =
    document.getElementById(
      "searchInput"
    );


  if (!form || !input) {

    return;

  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const query =
        input.value.trim();


      if (!query) {

        input.focus();

        return;

      }


      searchMovies(query);

    }
  );

}


/* ==================================================
   21. CLEAR SEARCH
================================================== */

function setupClearSearch() {

  const button =
    document.getElementById(
      "clearSearch"
    );


  const section =
    document.getElementById(
      "searchSection"
    );


  const input =
    document.getElementById(
      "searchInput"
    );


  if (!button) {

    return;

  }


  button.addEventListener(
    "click",
    () => {

      section.hidden =
        true;


      input.value =
        "";


      document.getElementById(
        "trending"
      ).scrollIntoView({
        behavior: "smooth"
      });

    }
  );

}


/* ==================================================
   22. MOVIE MODAL
================================================== */

async function openMovieModal(movie) {

  const modal =
    document.getElementById(
      "movieModal"
    );


  const poster =
    document.getElementById(
      "modalPoster"
    );


  const title =
    document.getElementById(
      "modalTitle"
    );


  const meta =
    document.getElementById(
      "modalMeta"
    );


  const overview =
    document.getElementById(
      "modalOverview"
    );


  const trailerButton =
    document.getElementById(
      "modalTrailer"
    );


  poster.src =
    getPosterUrl(movie);


  poster.alt =
    movie.title || "Movie poster";


  title.textContent =
    movie.title || "Untitled";


  meta.textContent =
    `${getYear(movie)} • ${getGenres(movie)}`;


  overview.textContent =
    movie.overview ||
    "No movie description is available yet.";


  trailerButton.href =
    createTrailerLink(movie);


  modal.classList.add(
    "active"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );


  /* ------------------------------------------
     FIND BETTER TRAILER
  ------------------------------------------ */

  const trailer =
    await getMovieTrailer(movie.id);


  if (trailer) {

    trailerButton.href =
      trailer;

  }

}


/* ==================================================
   23. CLOSE MODAL
================================================== */

function closeMovieModal() {

  const modal =
    document.getElementById(
      "movieModal"
    );


  modal.classList.remove(
    "active"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


/* ==================================================
   24. MODAL EVENTS
================================================== */

function setupModal() {

  const close =
    document.getElementById(
      "modalClose"
    );


  const overlay =
    document.getElementById(
      "modalOverlay"
    );


  if (close) {

    close.addEventListener(
      "click",
      closeMovieModal
    );

  }


  if (overlay) {

    overlay.addEventListener(
      "click",
      closeMovieModal
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMovieModal();

      }

    }
  );

}


/* ==================================================
   25. MOBILE MENU
================================================== */

function setupMobileMenu() {

  const button =
    document.getElementById(
      "menuButton"
    );


  const menu =
    document.getElementById(
      "mobileMenu"
    );


  if (!button || !menu) {

    return;

  }


  button.addEventListener(
    "click",
    () => {

      menu.classList.toggle(
        "active"
      );

    }
  );


  const links =
    menu.querySelectorAll(
      "a"
    );


  links.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        menu.classList.remove(
          "active"
        );

      }
    );

  });

}


/* ==================================================
   26. YEAR
================================================== */

function setYear() {

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


/* ==================================================
   27. ESCAPE HTML
================================================== */

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


/* ==================================================
   28. START WEBSITE
================================================== */

async function startWebsite() {

  setYear();

  setupMobileMenu();

  setupSearch();

  setupClearSearch();

  setupModal();


  if (!hasApiKey()) {

    showError(
      document.getElementById(
        "trendingGrid"
      ),
      "Add your TMDB API key in app.js."
    );


    showError(
      document.getElementById(
        "popularGrid"
      ),
      "Add your TMDB API key in app.js."
    );


    showError(
      document.getElementById(
        "upcomingGrid"
      ),
      "Add your TMDB API key in app.js."
    );


    return;

  }


  /* ------------------------------------------
     LOAD ALL MOVIE SECTIONS
  ------------------------------------------ */

  await Promise.all([
    loadTrending(),
    loadPopular(),
    loadUpcoming()
  ]);

}


/* ==================================================
   RUN
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  startWebsite
);
```
