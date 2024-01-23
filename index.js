// const url = "http://omdbapi.com/?";
// const apiKey = "apikey=7d5d7dd5"
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

const resultsEl = document.querySelector(".search-results");
const titleEl = document.querySelector(".title");
const ratingEl = document.querySelector(".rating");
const releaseDateEl = document.querySelector(".release-date");
const overviewEl = document.querySelector(".overview");
const posterEl = document.querySelector(".poster");

const searchMovieParams = "search/movie?query="

const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#input-field");

// On click to search, the keyword is passed to the API query
// searchButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     let search = `&tt=${searchInput.value}`

//     fetch(url + apiKey + `&s=${search}`)
//     .then(response => response.json())
//     .then(data => console.log(data))
// })

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(url + searchMovieParams + searchInput.value, options)
        .then (res => res.json())
        .then(data => {
            event.preventDefault();
            let html = ''
            // for (let movie in data.results) {
            //     html += `
            //     <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.results[movie].poster_path}" alt="${data.results[movie].original_title} poster">
            //     `}
            for (let i = 0; i < data.results.length; i++) {
                html += `
                <div id="film-container">
                    <div class="poster">
                        <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.results[i].poster_path}" alt="${data.results[i].original_title} poster">
                    </div>
                    <div id="intro-container">
                        <div class="title">
                            ${data.results[i].original_title}
                        </div>
                        <div class="rating">
                            ${data.results[i].vote_average}
                        </div>
                    </div>
                    <div id="classification-container">
                        <div class="release-date">
                            ${data.results[i].release_date}
                        </div>
                        <div class="runtime">
                            TBD
                        </div>
                        <div class="genre">
                            TBD
                        </div>
                    </div>
                    <div class="overview-container">
                        <div class="overview">
                            ${data.results[i].overview}
                        </div>
                    </div>
                </div>
                `

            // posterEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.results[0].poster_path}" alt="${data.results[0].original_title} poster">`
            // titleEl.textContent = data.results[0].original_title
            // ratingEl.textContent = data.results[0].vote_average
            // releaseDateEl.textContent = data.results[0].release_date
            // overviewEl.textContent = data.results[0].overview
        }
        posterEl.innerHTML = html
    })})