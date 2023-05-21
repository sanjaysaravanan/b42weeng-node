import { MongoClient } from "mongodb";

// Local Mongo URL
const LOCAL_MONGO_URL = 'mongodb://localhost:27017';

const Client = new MongoClient(LOCAL_MONGO_URL);

export default Client;
