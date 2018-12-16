import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import parcelRoutes from './parcel';
import adminRoutes from './admin';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/parcels', parcelRoutes);
router.use('/admin', adminRoutes);

export default router;
