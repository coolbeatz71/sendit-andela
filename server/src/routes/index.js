import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './auth';
import userRoutes from './user';
import parcelRoutes from './parcel';
import adminRoutes from './admin';

import swaggerDocument from '../api-docs-swagger.json';


const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/parcels', parcelRoutes);
router.use('/admin', adminRoutes);

export default router;
