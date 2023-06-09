//Global variable Declaration
let pageNumber = 1;

function getMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2Q3MmYzZDIyODYwOGYxMzgxMWM1YmE5YzM5YmE0MCIsInN1YiI6IjY0ODIwMmVlYmYzMWYyMDEwMDMzYjEwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.str8-__MX1TXzcgRmP6o4PXUViiAzrohUJT0e1iUjSk'
        }
        };
        
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='+pageNumber, options)
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < data.results.length; i++)
            {
                generateCards(data.results[i]);
            }
            pageNumber++;
        });
}

//Gets and Displays Movie Card Information
function generateCards(movieObject) {
    //Create Star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

    //Create rating
    let rating = document.createElement('span');
    rating.classList.add('rating');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingContent);

    //Create Average Container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('movie-votes');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);

    document.body.appendChild (averageContainer);

    //Create Image
    let image = document.createElement('img');
    image.classList.add('movie-poster');
    image.setAttribute('alt',"Movie Poster for " + movieObject.original_title);
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    //document.body.insertBefore(img, averageContainer);

    //Create Movie Name
    let name = document.createElement('div');
    name.classList.add('movie-title');
    name.innerText = movieObject.original_title;
    //document.body.insertBefore(name, averageContainer.nextSibling);

    //Places card into section
    let movie = document.createElement('section');
    movie.classList.add('movie-card');
    movie.setAttribute("id", movieObject.id)
    movie.appendChild(image);
    movie.appendChild(averageContainer);
    movie.appendChild(name);
    
    //document.body.appendChild(movie);
    let movieGrid = document.querySelector('#movie-grid');
    movieGrid.appendChild(movie);
}
getMovies();

//Search Bar Functionality
let searchInput = document.getElementById('search-input')
const grid = document.getElementById('movie-grid')
let clearSearchButton = document.getElementById('clear-search-btn')

clearSearchButton.addEventListener('click', () => {
    event.preventDefault();
    clearSearchButton.style.visibility = "hidden";
    searchInput.value = "";
    pageNumber = 1;
    grid.innerHTML = ""
    getMovies();
})

function searchMovieAPI() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2Q3MmYzZDIyODYwOGYxMzgxMWM1YmE5YzM5YmE0MCIsInN1YiI6IjY0ODIwMmVlYmYzMWYyMDEwMDMzYjEwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.str8-__MX1TXzcgRmP6o4PXUViiAzrohUJT0e1iUjSk'
        }
        };
        
        fetch('https://api.themoviedb.org/3/search/movie?query='+searchInput.value+'&include_adult=false&language=en-US&page='+pageNumber, options)
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < data.results.length; i++)
            {
                generateCards(data.results[i]);
            }   
        })
}

searchInput.addEventListener('keyup', () => {
    grid.innerHTML = ""
    if (searchInput.value.length >= 1){
        clearSearchButton.style.visibility = "visible";
        searchMovieAPI();
    }
    else {
        clearSearchButton.style.visibility = "hidden";
        pageNumber = 1;
        getMovies();
    }
});

//Load More Button
const loadMoreButton = document.querySelector('#load-more-movies-btn');
loadMoreButton.addEventListener('click', () => {
    if (searchInput.value === "")
    {
        getMovies();
    }
    else
    {
        pageNumber++;
        searchMovieAPI();
    }

});

//Dark Mode Button
const lightModeButton = document.getElementById('light-mode-btn');
function lightModeFunc() {
    document.body.classList.toggle('dark-mode');

    if (lightModeButton.innerText === "Light Mode")
    {
        lightModeButton.innerText = "Dark Mode";
    }
    else if (lightModeButton.innerText === "Dark Mode")
    {
        lightModeButton.innerText = "Light Mode"; 
    }
    
}

lightModeButton.addEventListener('click', lightModeFunc);



