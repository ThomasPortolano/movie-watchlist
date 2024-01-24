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
                            </div>
                            <div id="classification-container">
                                <div class="release-date">
                                    ${data.results[i].release_date}
                                </div>
                                <div class="runtime">
                                </div>
                                <div class="genre">
                                    TBD
                                </div>
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

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderResults();
    getMovieDetails(id);
    })

    function getMovieDetails(id){
        let html = ''
        let runtimeArr = []
        let fetchPromises = []
    
        for (let i = 0; i < id.length; i++) {
            let fetchPromise = fetch(url + `movie/${id[i]}`, options)
            .then (res => res.json())
            .then(data => {
                runtimeArr.push(data.runtime)
            })
    
            fetchPromises.push(fetchPromise)
        }

    Promise.all(fetchPromises).then(() => {
        console.log(runtimeArr)

        let runtimeElements = document.querySelectorAll('.runtime');
        for (let i = 0; i < runtimeArr.length; i++){
            if(runtimeElements[i]) {
                runtimeElements[i].innerHTML = runtimeArr[i];
            }
        }
    })}
