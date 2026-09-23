document.addEventListener("DOMContentLoaded", function () {

  const movies = [
    {
      title: "Mirzapur: The Movie",
      genre: "Action • Crime • Thriller",
      image: "https://newimages.qfxcinemas.com/S3/uploads/gallery/1782813261880-mirzapur_poster.jpg",
      trailer: "https://www.youtube.com/results?search_query=Mirzapur+The+Movie+official+trailer"
    },

    {
      title: "Haiwaan",
      genre: "Action • Thriller",
      image: "https://m.media-amazon.com/images/M/MV5BMDI3MDI3NmUtNjAwZS00OWU5LWI4ODEtMzMxMTI2OGRhZjQ5XkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg",
      trailer: "https://www.youtube.com/results?search_query=Haiwaan+official+trailer"
    },

    {
      title: "The Vvaan",
      genre: "Fantasy • Action",
      image: "https://www.keralatv.in/media/2026/07/The-Vvan-Release-Date-941x941.jpg",
      trailer: "https://www.youtube.com/results?search_query=The+Vvaan+official+trailer"
    },

    {
      title: "Love & War",
      genre: "Drama • Romance",
      image: "https://m.media-amazon.com/images/M/MV5BY2IwZmI5OTEtNjljMi00YWIxLWJkYWYtMTRiNTAzMDZjM2M0XkEyXkFqcGc%40._V1_.jpg",
      trailer: "https://www.youtube.com/results?search_query=Love+and+War+official+trailer+Bollywood"
    }
  ];


  const movieList = document.getElementById("movieList");
  const movieCount = document.getElementById("movieCount");
  const noResults = document.getElementById("noResults");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const year = document.getElementById("year");


  function displayMovies(movieData) {

    movieList.innerHTML = "";

    if (movieData.length === 0) {

      noResults.hidden = false;
      movieCount.textContent = "0 Movies";
      return;

    }

    noResults.hidden = true;

    movieCount.textContent =
      movieData.length +
      (movieData.length === 1 ? " Movie" : " Movies");


    movieData.forEach(function (movie) {

      const card = document.createElement("article");

      card.className = "movie-card";


      const link = document.createElement("a");

      link.href = movie.trailer;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      link.style.display = "block";
      link.style.textDecoration = "none";
      link.style.color = "inherit";
      link.style.cursor = "pointer";


      const image = document.createElement("img");

      image.src = movie.image;
      image.alt = movie.title;
      image.loading = "lazy";


      const content = document.createElement("div");

      content.className = "movie-card-content";


      const title = document.createElement("h3");

      title.textContent = movie.title;


      const genre = document.createElement("p");

      genre.textContent = movie.genre;


      content.appendChild(title);
      content.appendChild(genre);

      link.appendChild(image);
      link.appendChild(content);

      card.appendChild(link);

      movieList.appendChild(card);

    });

  }


  function searchMovies() {

    const searchText =
      searchInput.value.trim().toLowerCase();


    if (searchText === "") {

      displayMovies(movies);
      return;

    }


    const results = movies.filter(function (movie) {

      return (
        movie.title.toLowerCase().includes(searchText) ||
        movie.genre.toLowerCase().includes(searchText)
      );

    });


    displayMovies(results);

  }


  if (searchButton) {

    searchButton.addEventListener(
      "click",
      searchMovies
    );

  }


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


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  displayMovies(movies);


  console.log(
    "XYZMOVIEDAILY loaded successfully."
  );

});
