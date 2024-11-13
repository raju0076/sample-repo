// Variables
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const movieResults = document.getElementById('movieResults');
const pagination = document.getElementById('pagination');
const errorMessage = document.getElementById('errorMessage');

let currentPage = 1;
let totalResults = 0;

// OMDB API Key (replace this with your own key)
const API_KEY = 'your_api_key';

// Function to fetch movie data
async function fetchMovies(query, page = 1) {
    try {
        // Clear previous results and error message
        movieResults.innerHTML = '';
        errorMessage.textContent = '';

        // Fetch data from OMDB API
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`);

        // Check if response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if there are search results
        if (data.Response === 'True') {
            totalResults = parseInt(data.totalResults);
            displayMovies(data.Search);
            createPagination(Math.ceil(totalResults / 10));
        } else {
            errorMessage.textContent = data.Error;
        }
    } catch (error) {
        errorMessage.textContent = 'Error fetching data. Please try again later.';
        console.error(error);
    }
}

// Function to display movie results
function displayMovies(movies) {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <p>${movie.Plot || 'No plot available'}</p>
        `;
        movieResults.appendChild(movieCard);
    });
}

// Function to create pagination buttons
function createPagination(pages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('page-btn');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            fetchMovies(searchInput.value, currentPage);
        });
        pagination.appendChild(pageBtn);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        errorMessage.textContent = 'Please enter a movie title.';
    }
});

// Initial fetch when page loads (if any predefined query is needed)
fetchMovies('Inception'); // You can change this to any default movie query if desired
