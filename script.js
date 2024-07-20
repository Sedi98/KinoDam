function fetchData(apiLink, domItem) {
  const url = `https://api.themoviedb.org/3${apiLink}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tkn,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      // top 10 movies with highest rating
      console.log(json);
      domItem.innerHTML = json.results
        .map((movie) => {
          return `
            <div class="movieCard" onclick="setFilmID(${movie.id},'${movie.title ? 'movie':'tv'}')">
              <img class="poster" src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title ? movie.title : movie.name}" />
              <div class="movie-info">
                <h5>${movie.title ? movie.title : movie.name}</h5>
                <span class="green"><i class='bx bxs-star'></i> </span> <span class="green">${movie.vote_average.toFixed(
                  2
                )}</span>
              </div>
          
            </div>`;
        })
        .join("");
    })
    .catch((err) => console.error("error:" + err));
}

function getPopularMovies() {
  fetchData("/movie/popular", PopularMovies);
}

function getTopRatedMovies() {
  fetchData("/movie/top_rated", topRatedMovies);
}

function getUpComingMovies() {
  fetchData("/movie/upcoming", upComingMovies);
}

// series

function getPopularSeries() {
  fetchData("/tv/popular", PopularSeries);
}

function getTopRatedSeries() {
  fetchData("/tv/top_rated", topRatedSeries);
}

function getOnAirSeries() {
  fetchData("/tv/on_the_air", onAirSeries);
}

function getAiringToday() {
  fetchData("/tv/airing_today", airingToday);
}

function onLoad() {
  // movies
  getPopularMovies();
  getTopRatedMovies();
  getUpComingMovies();

  //   series
  getPopularSeries();
  getTopRatedSeries();
  getOnAirSeries();
  getAiringToday();
}

// details

function setFilmID(movie_id, filmType) {
  console.log(movie_id, filmType);
    localStorage.setItem("filmID", JSON.stringify(movie_id));
    localStorage.setItem("filmType", JSON.stringify(filmType));
       window.location.href = "./pages/details.html";
}

function filmDetails() {
  let movie_id = JSON.parse(localStorage.getItem("filmID"))
  let filmType = JSON.parse(localStorage.getItem("filmType"))
  console.log(movie_id, filmType);
  fetch(`https://api.themoviedb.org/3/${filmType.trim()}/${movie_id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tkn,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      filmTitle.innerHTML = filmType == "movie" ? json.title : json.name
      filmDescription.innerHTML = json.overview
      filmImage.src = "https://image.tmdb.org/t/p/w500" + json.poster_path
     
     
    });
}

// onLoad();
