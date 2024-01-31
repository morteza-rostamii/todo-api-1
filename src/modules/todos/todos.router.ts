import express from 'express'
import todosController from './todos.controller';
import authGuard from '../../middlewares/authGuard.mid';

const router = express.Router();

// Get: /todos
router
  .route('/')
  .get(authGuard, todosController.gets);

// Get: /todos/:id
router
  .route('/:id')
  .get(todosController.get);

// Post: /todos
router
  .route('/')
  .post(todosController.create);

// Patch: /todos/:id
router
  .route('/:id')
  .put(todosController.update);

router
  .route('/:id')
  .delete(todosController.delete);

export default router