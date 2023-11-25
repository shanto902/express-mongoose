import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getSingleUser);

router.put('/:userId', UserController.updateUser);

router.put('/:userId/orders', UserController.addOrderToUser);

router.get('/:userId/orders', UserController.getUserOrders);

router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const UserRoutes = router;
