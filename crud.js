import moviesData from './movies-data.js';

// let moviesData = require('./movies.json');

let movies = { ...moviesData };

//  // importing json file as a data

// console.log('movies type is', typeof movies);

// GET All Movies -> READ ALL
const readAll = () => JSON.stringify(movies);

// GET One Movies --> READ One
const readOneMovie = (movieName) => {
  return JSON.stringify(movies.find(({ name }) => name === movieName));
}

// create new movie --> CREATE
const createMovie = (movieObj) => {
  movies.push(movieObj);
}

// update one movie --> PUT

const updateMovie = (movieName, movieObj) => {
  const movie = movies.find(({ name }) => movieName === name);

  const index = movies.findIndex(({ name }) => movieName === name);

  movies[index] = { ...movie, ...movieObj };
}

const deleteMovie = (movieName) => {
  movies = movies.filter(({ name }) => movieName !== name);
}

// older way for exporting functions/variables
// module.exports = {
//   readAll,
//   readOneMovie,
//   createMovie,
//   updateMovie,
//   deleteMovie,
// }

export {
  readAll,
  readOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
