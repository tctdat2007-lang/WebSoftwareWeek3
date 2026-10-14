import {
  addCat,
  findCatById,
  listAllCats,
} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res, next) => {
  const cat = findCatById(req.params.id);

  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    next(error);
    return;
  }

  res.json(cat);
};

const postCat = (req, res, next) => {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
    return;
  }

  req.body.filename = req.file.filename;

  const result = addCat(req.body);

  if (!result.cat_id) {
    const error = new Error('Could not add cat');
    next(error);
    return;
  }

  res.status(201).json({
    message: 'New cat added.',
    result,
  });
};

const putCat = (req, res) => {
  res.json({
    message: 'Cat item updated.',
  });
};

const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

export {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
};
