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
let id = [] // global array used to store each movie id. this array is flushed after each search
let runtimeArr = [] // global array used to store each movie runtime. this array is flushed after each search


const resultsEl = document.querySelector(".search-results");
const titleEl = document.querySelector(".title");
const ratingEl = document.querySelector(".rating");
const releaseDateEl = document.querySelector(".release-date");
const overviewEl = document.querySelector(".overview");
const posterEl = document.querySelector(".poster");
const runtimeEl = document.querySelector(".runtime")
// const classificationContainer = document.querySelector('#classification-container');

const searchMovieParams = "search/movie?query="

const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#input-field");

// 1.  On click, I capture the search input value and use it to query two API, the search Movie API and the Movie Details API
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderResults(); 
    getMovieDetails(id);
})

// 2. the render function will both fetch data (except rating and genre) and render the results on the page
function renderResults(){
    fetch(url + searchMovieParams + searchInput.value, options) // 3. the fetch query consists in the base url, the search param and the input value
        .then (res => res.json())
        .then(data => {
            let html = ''
            for (let i = 0; i < data.results.length; i++) { // 4. I loop through all the results in the results arrays and store the html in the html variable
                html += `
                <div id="film-container">
                    <div class="film-container">
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
                                <div class="add-watchlist" id=${data.results[i].id}>
                                </div>
                            </div>
                            <div id="classification-container">
                                <div class="release-date">
                                    ${data.results[i].release_date}
                                </div>
                                <div class="runtime"></div>
                                <div class="genre"></div>
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
                id.push(data.results[i].id) // 5. I also capture the id of each result and store it in an array that I will use in a second time
                 
        }
        resultsEl.innerHTML = html 
        getMovieDetails() // 6. I call this async function to fetch the remaining movie details (runtime and genre)
    })
}

// 7. Following the call in the final .then of the renderResults function, I use the id array to fetch the remaining movie details
function getMovieDetails(){
    let fetchPromises = []
    let genreArr = []
    let runtimeArr = []
  
    for (let i = 0; i < id.length; i++) {
        let fetchPromise = fetch(url + `movie/${id[i]}`, options)
        .then (res => res.json())
        .then(data => {
            runtimeArr.push(data.runtime)
            genreArr.push(data.genres)
        })
        fetchPromises.push(fetchPromise)
    }

    Promise.all(fetchPromises).then(() => {
        for (let i = 0; i < runtimeArr.length; i++){
            let runtimeElements = document.querySelectorAll('.runtime');
            if(runtimeElements[i]) {
                runtimeElements[i].innerHTML = runtimeArr[i];
            } else {runtimeElements[i].innerHTML = "N/A"}
        }
        for (let i = 0; i < genreArr.length; i++){   
            let genreNames = genreArr[i].map(genre => genre.name).join(', ');
            console.log(genreNames); // Logs the genre names for the i-th movie, joined by commas
        
            let genreContainers = document.querySelectorAll('.genre'); // Changed the selector to '.genre'
            if(genreContainers[i]) {
                genreContainers[i].textContent = genreNames; // Clear the existing content
            }
        }
    })}