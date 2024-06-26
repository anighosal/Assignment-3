import express from 'express';
import { auth } from '../../middlewares/auth'; // Ensure correct path
import { FacilityController } from './facility.controller';
import { validateFacilityCreation } from './facility.validation';

const router = express.Router();

router.post(
  '/',
  auth('ADMIN'),
  validateFacilityCreation,
  FacilityController.createFacility,
);

router.get('/', FacilityController.getFacilities);

router.put('/:id', auth('ADMIN'), FacilityController.updateFacility);

router.delete('/:id', auth('ADMIN'), FacilityController.deleteFacility);

export const FacilityRoutes = router;
