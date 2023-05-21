// ES Module
import express from 'express';
import { readAll, readOneMovie, createMovie, updateMovie, deleteMovie } from './crud.js';

// CommonJS 
// const express = require('express'); // 
// const { readAll, readOneMovie, createMovie, updateMovie, deleteMovie } = require('./crud.js');

const app = express();

const PORT = 5000;
const HOSTNAME = 'localhost';

// For parsing application/json
app.use(express.json());

// Normal Operations with in memory storage
// GET Method ---> READ
app.get('/', function (req, res) {
  res.send('{ "name": "B42WEENG" }');
});

// GET All Movies API --> READ All
app.get('/movies', (req, res) => {
  res.send(readAll());
});

// GET One Movie ---> READ One
app.get('/movies/:movieName', (request, response) => {

  // Destructure the req.params
  const { movieName } = request.params;
  response.send(readOneMovie(movieName));
});

app.post('/movies', (request, response) => {
  const movieObj = request.body;
  createMovie(movieObj);
  response.send('{ "msg": "Movie Created Successfully" }');
});

app.put('/movies/:movieName', (request, response) => {
  const movieObj = request.body;
  const { movieName } = request.params;
  updateMovie(movieName, movieObj);
  response.send('{ "msg": "Movie Updated Successfully" }');
});

// path param
app.delete('/movies/:movieName', (request, response) => {
  const { movieName } = request.params;
  deleteMovie(movieName);
  response.send('{ "msg": "Movie Deleted Successfully" }');
});

// query param
app.delete('/movies', (request, response) => {
  const { movieName } = request.query;
  deleteMovie(movieName);
  response.send('{ "msg": "Movie Deleted Successfully" }');
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});