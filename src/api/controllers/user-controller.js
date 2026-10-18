import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await addUser(req.body);

  if (result) {
    res.status(201).json({
      message: 'New user added.',
      result,
    });
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const loggedInUser = res.locals.user;

  if (
    loggedInUser.user_id !== Number(req.params.id) &&
    loggedInUser.role !== 'admin'
  ) {
    return res.sendStatus(403);
  }

  const result = await modifyUser(
    req.body,
    req.params.id
  );

  if (result) {
    res.json({
      message: 'User item updated.',
    });
  } else {
    res.sendStatus(404);
  }
};

const deleteUser = async (req, res) => {
  const loggedInUser = res.locals.user;

  if (
    loggedInUser.user_id !== Number(req.params.id) &&
    loggedInUser.role !== 'admin'
  ) {
    return res.sendStatus(403);
  }

  const result = await removeUser(req.params.id);

  if (result) {
    res.json({
      message: 'User item deleted.',
    });
  } else {
    res.sendStatus(404);
  }
};

export {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
