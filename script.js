let initialMovies = 0;
let loadMovies = 0;

function getMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2Q3MmYzZDIyODYwOGYxMzgxMWM1YmE5YzM5YmE0MCIsInN1YiI6IjY0ODIwMmVlYmYzMWYyMDEwMDMzYjEwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.str8-__MX1TXzcgRmP6o4PXUViiAzrohUJT0e1iUjSk'
        }
        };
        
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then(response => response.json())
        .then((data) => {
            // your code here
            for (initialMovies; initialMovies < data.results.length + loadMovies; initialMovies++)
            {
                generateCards(data.results[initialMovies]);
            }
            loadMovies += 20;
            console.log(data.results.length);
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
{
//Displays Pop-Up When Movie is Clicked
//const movieElement = document.getElementsByClassName('movie-card');
// const getClassVar = document.getElementByClassName('movie-card');
// const popup = document.querySelector('.popup');
// const close = document.querySelector('.close-popup');

// for (let i = 0; i < movieElement.results.length; i++)
// {
//     document.getElementById(movieElement.results.id[i]).addEventListener(
//         'click', function() {
//             displayPopUps
//         }
//     ) 
// }


// function displayPopUps () {
//    popup.classList.toggle("show-popup")
// }
// function windowClick(){
//     if (event.target === popup)
//     {
//         displayPopUps();
//     }
// }

// // console.log(queryVar);
// // console.log(getClassVar);

// // queryVar.forEach(function(item) {
// //     item.addEventListener("click", displayPopUps);
// // });


// close.addEventListener("click",displayPopUps);
// window.addEventListener("click",windowClick);
}

//Load More Button
const loadMoreButton = document.querySelector('#load-more');

loadMoreButton.addEventListener('click', getMovies);