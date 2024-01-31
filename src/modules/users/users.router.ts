import express from 'express'
import usersController from './users.controller';

const router = express.Router();

// Get: /todos
router
  .route('/')
  .get(usersController.gets);

// Get: /todos/:id
router
  .route('/:id')
  .get(usersController.get);

// Post: /todos
router
  .route('/')
  .post(usersController.create);

// Patch: /todos/:id
router
  .route('/:id')
  .patch(usersController.update);

router
  .route('/:id')
  .delete(usersController.delete);

export default router