function fetchData(apiLink, domItem) {
  const url = `https://api.themoviedb.org/3${apiLink}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2ZmZlZDg3MzYwOTJiMDEzYmFmNGZmMzgyZTcwYSIsIm5iZiI6MTcyMTQ1MzczMS42ODQ0MSwic3ViIjoiNjY5YjRiZTZlNDVjNmM1ZTJlZGU5NGZhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.t2nYZZRTvQ07h25BUiRLnOWbuxz769xfuYdMjLSgK9s",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      // top 10 movies with highest rating
      domItem.innerHTML = json.results
        .map((movie) => {
          return `
            <div class="movieCard">
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

onLoad();
