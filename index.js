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
            console.log(data)
        })})