import express from 'express';
import {body} from 'express-validator';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import {
  upload,
  createThumbnail,
} from '../../middlewares/upload.js';

import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCat)
  .post(
    upload.single('cat'),

    body('cat_name')
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 50}),

    body('weight')
      .notEmpty()
      .isNumeric(),

    body('owner')
      .notEmpty()
      .isInt(),

    body('birthdate')
      .notEmpty()
      .isDate(),

    validationErrors,
    createThumbnail,
    postCat
  );

catRouter
  .route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
