// ES Module
import express from 'express';
import cors from 'cors';

import DbClient from './mongo-db-client.js';

import movieRouter from './routes/movies.js';
import usersRouter from './routes/users.js';

const app = express();

const PORT = 5000;
const HOSTNAME = 'localhost';

const myLogger = function (req, _res, next) {
  console.log(new Date().toISOString(), '::', req.method, req.originalUrl);
  next();
}

// Top/Global Level await
await DbClient.connect();
console.log('Connected to the DB');
// this is a latest feature nodejs which allows global asynchronous operation execution

// For parsing application/json
app.use(express.json()); // Middleware needed for passing data in post method
app.use(cors());

app.use(myLogger);

//     prefix path   router without prefix
app.use('/movies', movieRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});