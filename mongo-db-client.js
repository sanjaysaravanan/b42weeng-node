import { MongoClient } from "mongodb";

// Local Mongo URL
const LOCAL_MONGO_URL = 'mongodb://localhost:27017';

// Cloud Mongo URL
// passowrd: t7M9FwoRryTPhNny, userName: sanjaysaravanan

const CLOUD_MONGO_URL = 'mongodb+srv://sanjaysaravanan:t7M9FwoRryTPhNny@cluster0.ef0xa80.mongodb.net/?retryWrites=true&w=majority'

const Client = new MongoClient(CLOUD_MONGO_URL);

export default Client;
