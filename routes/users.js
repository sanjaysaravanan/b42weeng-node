// CRUD Operations for Users
import express from 'express';
import {
  createEntity,
  readAll,
  readOneEntity,
  updateEntity,
  deleteEntity,
  findWithQuery
} from '../crud-db.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersRouter = express.Router();

// Get all users
usersRouter.get('/', async (_req, res) => {
  res.send(await readAll('users'));
});

// Get a user
usersRouter.get('/:userId', async (req, res) => {
  // Destructure the req.params
  const { userId } = req.params;

  res.send(await readOneEntity('users', userId));
});

// Create a user
usersRouter.post('/', async (req, res) => {
  const userObj = req.body;
  console.log(userObj);
  await bcrypt.hash(userObj.password, 10, async function (_err, hash) {
    userObj.password = hash;
    console.log(userObj);
    await createEntity('users', { id: new ObjectId().toString(), ...userObj });
  });
  res.send({ msg: 'User Created Successfully' });
});

// Login User ---> email, password in body
usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userObj = await findWithQuery('users', { email });

  await bcrypt.compare(password, userObj.password, async (err, result) => {
    console.log('Match', result);
    if (result) {
      let role = userObj.role;
      let responseToken = null;
      // encryption role in jwt payload
      await jwt.sign({ role }, process.env.TOKEN_SECRET, { expiresIn: '1d' }, function (err, token) {
        console.log('Token', token);
        responseToken = token;
      });
      delete userObj.password;
      delete userObj.role;
      res.send({
        msg: 'Login Successfull',
        ...userObj,
        accessToken: responseToken
      }); // response sends the details of the user
    } else {
      res.send({ msg: 'Invalid Credentials' });
    }
  });
});

// Update a user
usersRouter.put('/:userId', async (req, res) => {
  const userObj = req.body;
  const { userId } = req.params;
  await updateEntity('users', userId, userObj);
  res.send({ msg: 'Update the user successfully' });
});

// Delete a user
usersRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  await deleteEntity('users', userId)
  res.send({ msg: "deleted successfully" });
})

export default usersRouter;