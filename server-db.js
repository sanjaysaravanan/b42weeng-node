// ES Module
import express from 'express';

import DbClient from './mongo-db-client.js'

import { readAll, readOneMovie, createMovie, updateMovie, deleteMovie } from './crud-db.js';
import { ObjectId } from 'mongodb';

const app = express();

const PORT = 5000;
const HOSTNAME = 'localhost';

// Top/Global Level await
await DbClient.connect();
console.log('Connected to the DB');
// this is a latest feature nodejs which allows global asynchronous operation execution

// For parsing application/json
app.use(express.json());


// GET All Movies API --> READ All
app.get('/movies', async (req, res) => {
  res.send(await readAll());
});

// GET One Movie ---> READ One
app.get('/movies/:movieId', async (request, response) => {
  // Destructure the req.params
  const { movieId } = request.params;

  response.send(await readOneMovie(movieId));
});

app.post('/movies', async (request, response) => {
  const movieObj = request.body;
  await createMovie({ id: new ObjectId().toString(), movieObj });
  response.send({ msg: 'Movie Created Successfully' });
});

app.put('/movies/:movieId', async (request, response) => {
  const movieObj = request.body;
  const { movieId } = request.params;
  await updateMovie(movieId, movieObj);
  response.send({ msg: 'Update the movie successfully' });
});

// path param
app.delete('/movies/:movieId', async (request, response) => {
  const { movieId } = request.params;
  await deleteMovie(movieId)
  response.send({ msg: 'Movie Deleted Successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});