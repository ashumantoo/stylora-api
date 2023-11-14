import express from 'express';
import { isUser, requiresSignin } from '../../middleware/auth-middleware';
import { createUserAddress, getUserAddress, getUserAddresses, removeUserAddress, updateUserAddress } from './address-controller';

const userAddressRoutes = express.Router();

userAddressRoutes.post('/consumer/address', requiresSignin, isUser, createUserAddress)
userAddressRoutes.get('/consumer/address', requiresSignin, isUser, getUserAddresses)
userAddressRoutes.get('/consumer/address/:addressId', requiresSignin, isUser, getUserAddress)
userAddressRoutes.put('/consumer/address/:addressId', requiresSignin, isUser, updateUserAddress)
userAddressRoutes.delete('/consumer/address/:addressId', requiresSignin, isUser, removeUserAddress)


export default userAddressRoutes;