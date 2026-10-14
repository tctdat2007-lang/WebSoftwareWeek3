import {
  addUser,
  findUserById,
  listAllUsers,
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res, next) => {
  const user = findUserById(req.params.id);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;

    next(error);
    return;
  }

  res.json(user);
};

const postUser = (req, res, next) => {
  const result = addUser(req.body);

  if (!result.user_id) {
    const error = new Error('Could not add user');
    error.status = 400;

    next(error);
    return;
  }

  res.status(201).json({
    message: 'New user added.',
    result,
  });
};

const putUser = (req, res) => {
  res.json({
    message: 'User item updated.',
  });
};

const deleteUser = (req, res) => {
  res.json({
    message: 'User item deleted.',
  });
};

export {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
