```javascript
// ==========================================
// XYZMOVIEDAILY
// AUTOMATIC TMDB TRENDING MOVIES
// ==========================================


// ------------------------------------------
// 1. PUT YOUR TMDB API KEY HERE
// ------------------------------------------

const TMDB_API_KEY = "PASTE_YOUR_TMDB_API_KEY_HERE";


// ------------------------------------------
// 2. TMDB SETTINGS
// ------------------------------------------

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


// ------------------------------------------
// 3. GET TRENDING MOVIES
// ------------------------------------------

async function getTrendingMovies() {

  const url =
    `${TMDB_BASE_URL}/trending/movie/week` +
    `?api_key=${TMDB_API_KEY}` +
    `&language=en-US`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `TMDB error: ${response.status}`
      );
    }

    const data = await response.json();

    return data.results || [];

  } catch (error) {

    console.error(
      "Could not load TMDB movies:",
      error
    );

    return [];

  }
}


// ------------------------------------------
// 4. GET MOVIE TRAILER
// ------------------------------------------

async function getMovieTrailer(movieId) {

  const url =
    `${TMDB_BASE_URL}/movie/${movieId}/videos` +
    `?api_key=${TMDB_API_KEY}` +
    `&language=en-US`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const videos = data.results || [];


    // First look for an official YouTube trailer

    let trailer = videos.find((video) => {

      return (
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true
      );

    });


    // If no official trailer exists,
    // look for any YouTube trailer

    if (!trailer) {

      trailer = videos.find((video) => {

        return (
          video.site === "YouTube" &&
          video.type === "Trailer"
        );

      });

    }


    // If still nothing, look for a teaser

    if (!trailer) {

      trailer = videos.find((video) => {

        return (
          video.site === "YouTube" &&
          video.type === "Teaser"
        );

      });

    }


    if (!trailer) {
      return null;
    }


    return `https://www.youtube.com/watch?v=${trailer.key}`;

  } catch (error) {

    console.error(
      "Trailer error:",
      error
    );

    return null;

  }
}


// ------------------------------------------
// 5. GET GENRE NAME
// ------------------------------------------

const genreNames = {

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
      (id) => genreNames[id] || "Movie"
    )
    .join(" / ");

}


// ------------------------------------------
// 6. CREATE MOVIE CARD
// ------------------------------------------

async function createMovieCard(
  movie,
  index
) {

  const card =
    document.createElement("article");

  card.className = "movie-card";


  // Poster

  let poster;

  if (movie.poster_path) {

    poster =
      IMAGE_BASE_URL +
      movie.poster_path;

  } else {

    poster =
      "https://placehold.co/500x750/18181f/ffffff?text=No+Poster";

  }


  // Trailer

  const trailer =
    await getMovieTrailer(movie.id);


  let trailerButton;


  if (trailer) {

    trailerButton = `

      <a
        class="trailer-button"
        href="${trailer}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch Official Trailer
      </a>

    `;

  } else {

    // If TMDB has no trailer,
    // search YouTube instead.

    const searchText =
      encodeURIComponent(
        `${movie.title} official trailer`
      );

    trailerButton = `

      <a
        class="trailer-button"
        href="https://www.youtube.com/results?search_query=${searchText}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Find Official Trailer
      </a>

    `;

  }


  card.innerHTML = `

    <div class="poster-wrapper">

      <img
        src="${poster}"
        alt="${movie.title} poster"
        loading="lazy"
      >

      ${
        index < 5
          ? `<span class="trending-badge">
               #${index + 1} TRENDING
             </span>`
          : ""
      }

    </div>


    <div class="movie-info">

      <h3 title="${movie.title}">
        ${movie.title}
      </h3>


      <p class="movie-meta">

        ${
          movie.release_date
            ? movie.release_date.substring(0, 4)
            : "Coming Soon"
        }

        •

        ${getGenres(movie)}

      </p>


      ${trailerButton}

    </div>

  `;


  return card;

}


// ------------------------------------------
// 7. DISPLAY TRENDING MOVIES
// ------------------------------------------

async function displayTrendingMovies() {

  const movieGrid =
    document.getElementById(
      "movieGrid"
    );

  const movieCount =
    document.getElementById(
      "movieCount"
    );


  if (!movieGrid) {
    return;
  }


  // Loading message

  movieGrid.innerHTML = `

    <div class="loading-message">

      <div class="loader"></div>

      <p>
        Loading trending movies...
      </p>

    </div>

  `;


  const movies =
    await getTrendingMovies();


  // No movies

  if (!movies.length) {

    movieGrid.innerHTML = `

      <div class="error-message">

        <h3>
          Unable to load movies
        </h3>

        <p>
          Please check your TMDB API key
          and refresh the page.
        </p>

      </div>

    `;

    if (movieCount) {
      movieCount.textContent =
        "0 Movies";
    }

    return;

  }


  // Clear loading

  movieGrid.innerHTML = "";


  // Show first 12 movies

  const selectedMovies =
    movies.slice(0, 12);


  // Create cards

  for (
    let i = 0;
    i < selectedMovies.length;
    i++
  ) {

    const card =
      await createMovieCard(
        selectedMovies[i],
        i
      );

    movieGrid.appendChild(card);

  }


  // Update count

  if (movieCount) {

    movieCount.textContent =
      `${selectedMovies.length} Movies`;

  }

}


// ------------------------------------------
// 8. MOBILE MENU
// ------------------------------------------

function setupMobileMenu() {

  const menuButton =
    document.getElementById(
      "menuButton"
    );

  const mobileMenu =
    document.getElementById(
      "mobileMenu"
    );


  if (
    !menuButton ||
    !mobileMenu
  ) {
    return;
  }


  menuButton.addEventListener(
    "click",
    () => {

      mobileMenu.classList.toggle(
        "active"
      );

    }
  );


  const links =
    mobileMenu.querySelectorAll("a");


  links.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.remove(
          "active"
        );

      }
    );

  });

}


// ------------------------------------------
// 9. CURRENT YEAR
// ------------------------------------------

function setCurrentYear() {

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


// ------------------------------------------
// 10. START WEBSITE
// ------------------------------------------

document.addEventListener(
  "DOMContentLoaded",
  () => {

    displayTrendingMovies();

    setupMobileMenu();

    setCurrentYear();

  }
);
```
