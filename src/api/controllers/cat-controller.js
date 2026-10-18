import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();

  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);

  res.json(cats);
};

const postCat = async (req, res) => {
  req.body.filename = req.file.filename;

  const result = await addCat(req.body);

  if (result) {
    res.status(201).json({
      message: 'New cat added.',
      result,
    });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(
    req.body,
    req.params.id
  );

  if (result) {
    res.json({
      message: 'Cat item updated.',
    });
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);

  if (result) {
    res.json({
      message: 'Cat item deleted.',
    });
  } else {
    res.sendStatus(404);
  }
};

export {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
};
