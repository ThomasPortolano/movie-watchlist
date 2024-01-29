const url = "https://api.themoviedb.org/3/"
const apiKey = "59ab02093e40c14bbbdccbc69b8198b9"
const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWFiMDIwOTNlNDBjMTRiYmJkY2NiYzY5YjgxOThiOSIsInN1YiI6IjY1YWY3MWI5ODQ4ZWI5MDBhYzljY2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._cYP2CGeLxnQLCJmh7-uXPX0umrAhR1Zb7475B3lvIc"
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
    }
}
let id = []
const resultsEl = document.querySelector(".search-results");
const watchListEl = document.querySelector(".watchlist-container");
const titleEl = document.querySelector(".title");
const ratingEl = document.querySelector(".rating");
const releaseDateEl = document.querySelector(".release-date");
const overviewEl = document.querySelector(".overview");
const posterEl = document.querySelector(".poster");
const runtimeEl = document.querySelector(".runtime")


const searchMovieParams = "search/movie?query="

const searchButton = document.querySelector("#search-button");


const searchInput = document.querySelector("#input-field");

function renderResults(){
    fetch(url + searchMovieParams + searchInput.value, options)
        .then (res => res.json())
        .then(data => {
            let html = ''
            for (let i = 0; i < data.results.length; i++) {
                html += `
                <div id="film-container">
                    <div class="film-container" data-movie-id=${data.results[i].id}>
                        <div class="poster">
                            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.results[i].poster_path}" alt="${data.results[i].original_title} poster">
                        </div>
                        <div id="film-details-container">
                            <div id="intro-container">
                                <div class="title">
                                    ${data.results[i].original_title}
                                </div>
                                <div class="rating">
                                ⭐ ${data.results[i].vote_average}
                                </div>
                                <button class="add-to-watchlist">Add</button>
                            </div>
                            <div id="classification-container">
                                <div class="release-date">
                                    ${data.results[i].release_date}
                                </div>
                                <div class="runtime"></div>
                                <div class="genre" id="${data.results[i].id}"></div>
                            </div>
                            <div class="overview-container">
                                <div class="overview">
                                    ${(data.results[i].overview).substring(0, 137)}
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
                `
                id.push(data.results[i].id)
        }
        resultsEl.innerHTML = html
        
    })
}


if (searchButton) {
  // Add event listener or perform other operations on searchButton
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderResults();
    getMovieDetails(id);
})
}



    let runtimeArr = []

function getMovieDetails(id){
    let fetchPromises = []
    let genreArr = []

    for (let i = 0; i < id.length; i++) {
        let fetchPromise = fetch(url + `movie/${id[i]}`, options)
        .then (res => res.json())
        .then(data => {
            runtimeArr.push(data.runtime)
            genreArr.push(data.genres)
            // genreArr = []
        })

        fetchPromises.push(fetchPromise)
    }

    Promise.all(fetchPromises).then(() => {
        // console.log(runtimeArr)
        renderRunTime() 
        let genreElements = document.querySelectorAll('.genre');
        for (let i = 0; i < genreArr.length; i++){
            if(genreElements[i]) {
                renderGenre(genreArr[i], genreElements[i]);
            }
        }

            function renderRunTime() {
                let runtimeElements = document.querySelectorAll('.runtime');
                for (let i = 0; i < runtimeArr.length; i++){
                    if(runtimeElements[i]) {
                        runtimeElements[i].innerHTML = runtimeArr[i];
                    }
                }
            }

            function renderGenre(genres, targetElement) {
                let genreNames = genres.map(genre => genre.name).join(', ');
                targetElement.textContent = genreNames;
            }

            resultsEl.addEventListener('click', (event) => {
                if (event.target.classList.contains('add-to-watchlist')) {
                    let movieId = event.target.closest('.film-container').dataset.movieId;
                    addToWatchList(movieId);
                }
            });

            function addToWatchList(movieId){
                fetch(url + `movie/${movieId}`, options)
                .then(res => res.json())
                .then(movie => {
                    localStorage.setItem(`movie-${movieId}`, JSON.stringify(movie))
                })
                .catch(err => {
                    console.log('Error');
                })
            }

            
            
        })
}

if (document.readyState === "loading") {  // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", renderWatchList);
  } else {  // `DOMContentLoaded` has already fired
    renderWatchList();
    console.log('ready')
  }

  function renderWatchList() {
    let watchList = Object.keys(localStorage);
    let html = '';
    for (let i = 0; i < watchList.length; i++) {
        let movie = JSON.parse(localStorage.getItem(watchList[i]));
        html += `
        <div class="film-container" data-movie-id=${movie.id}>
            <div class="poster">
                <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}" alt="${movie.original_title} poster">
            </div>
            <div id="film-details-container">
                <div id="intro-container">
                    <div class="title">
                        ${movie.original_title}
                    </div>
                    <div class="rating">
                    ⭐ ${movie.vote_average}
                    </div>
                    <button class="add-to-watchlist">Add</button>
                </div>
                <div id="classification-container">
                    <div class="release-date">
                        ${movie.release_date}
                    </div>
                    <div class="runtime"></div>
                    <div class="genre" id="${movie.id}"></div>
                </div>
                <div class="overview-container">
                    <div class="overview">
                        ${(movie.overview).substring(0, 137)}
                    </div>
                </div>
            </div>    
        </div>
        `
        console.log(`movie-${movieId}`)
        
    }
    
    watchListEl.innerHTML = html;
}
  
// function handleClick(event) {

    // if (event.target.classList.contains('add-to-watchlist')) {
    //     let id = event.target.id;
    //     let movie = movies.find(movie => movie.id === id);
    //     if (movie) {
    //         alert('Movie already in watchlist');
    //     } else {
    //         movies.push(movie);
    //         localStorage.setItem('movies', JSON.stringify(movies));
    //     }
    // }
// }

