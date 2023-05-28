// router ---> /<path-name>
// GET, POST, PUT, DELETE for movies

import express from 'express';

import {
  readAll,
  readOneEntity,
  createEntity,
  updateEntity,
  deleteEntity
} from '../crud-db.js';
import { ObjectId } from 'mongodb';

const movieRouter = express.Router();

// GET All Movies API --> READ All
movieRouter.get('/', async (req, res) => {
  res.send(await readAll('movies'));
});

// GET One Movie ---> READ One
movieRouter.get('/:movieId', async (request, response) => {
  // Destructure the req.params
  const { movieId } = request.params;

  response.send(await readOneEntity('movies', movieId));
});

movieRouter.post('/', async (request, response) => {
  const movieObj = request.body;
  await createEntity('movies', { id: new ObjectId().toString(), ...movieObj });
  response.send({ msg: 'Movie Created Successfully' });
});

movieRouter.put('/:movieId', async (request, response) => {
  const movieObj = request.body;
  const { movieId } = request.params;
  await updateEntity('movies', movieId, movieObj);
  response.send({ msg: 'Update the movie successfully' });
});

// path param
movieRouter.delete('/:movieId', async (request, response) => {
  const { movieId } = request.params;
  await deleteEntity('movies', movieId)
  response.send({ msg: 'Movie Deleted Successfully' });
});


export default movieRouter;