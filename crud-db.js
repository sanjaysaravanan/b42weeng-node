import { ObjectId } from 'mongodb';

import DbClient from './mongo-db-client.js'

// GET All Movies -> READ ALL
// entity name 
// users ---> return all users
// movies ---> return all movies
const readAll = async (entityName) => {
  return await DbClient.db('test-compass').collection(entityName).find(
    {},
    {
      projection: {
        _id: 0
      }
    }).toArray();
};

// GET One Entity --> READ One
const readOneEntity = async (entityName, entityId) => {
  return await DbClient.db('test-compass').collection(entityName).findOne(
    { 'id': entityId },
    {
      projection: {
        _id: 0
      }
    }
  );
}

// create new movie --> CREATE
const createEntity = async (entityName, entityObj) => {
  return await DbClient.db('test-compass').collection(entityName).insertOne(
    entityObj
  );
}

// update one entity --> PUT
const updateEntity = async (entityName, entityId, entityObj) => {
  return await DbClient.db('test-compass').collection(entityName).updateOne(
    { 'id': entityId },
    { '$set': entityObj }
  );
}

const deleteEntity = async (entityName, entityId) => {
  return await DbClient.db('test-compass').collection(entityName).deleteOne(
    { 'id': entityId });
}

const findWithQuery = async (entityName, query) => {
  return await DbClient.db('test-compass').collection(entityName).findOne(
    query,
    {
      projection: {
        _id: 0
      }
    }
  );
}

export {
  readAll,
  readOneEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  findWithQuery
}
