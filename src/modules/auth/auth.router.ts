import express from 'express'
import authController from './auth.controller';

const router = express.Router();

router
  .route('/register')
  .post(authController.register);

router
  .route('/verify')
  .post(authController.verify);

router
  .route('/check-auth')
  .post(authController.checkAuth);

router
  .route('/logout')
  .post(authController.logout);

export default router