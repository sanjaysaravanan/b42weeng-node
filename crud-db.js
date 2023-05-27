import { ObjectId } from 'mongodb';

import DbClient from './mongo-db-client.js'

// GET All Movies -> READ ALL
const readAll = async () => {
  return await DbClient.db('test-compass').collection('movies').find(
    {},
    {
      projection: {
        _id: 0
      }
    }).toArray();
};

// GET One Movies --> READ One
const readOneMovie = async (movieId) => {
  return await DbClient.db('test-compass').collection('movies').findOne(
    { 'id': movieId },
    {
      projection: {
        _id: 0
      }
    }
  );
}

// create new movie --> CREATE
const createMovie = async (movieObj) => {
  return await DbClient.db('test-compass').collection('movies').insertOne(movieObj);
}

// update one movie --> PUT
const updateMovie = async (movieId, movieObj) => {
  return await DbClient.db('test-compass').collection('movies').updateOne({ 'id': movieId }, { '$set': movieObj });
}

const deleteMovie = async (movieId) => {
  return await DbClient.db('test-compass').collection('movies').deleteOne({ 'id': movieId });
}

export {
  readAll,
  readOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
