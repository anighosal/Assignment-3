import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacilityService } from './facility.service';

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const facilityData = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const facility = await FacilityService.createFacilityIntoDB(
    facilityData,
    user._id,
  );
  res.status(201).json({
    success: true,
    message: 'Facility added successfully',
    data: facility,
  });
});

const getFacilities = catchAsync(async (req: Request, res: Response) => {
  const facilities = await FacilityService.getFacilitiesFromDB();

  if (!facilities) {
    return res.status(404).json({
      success: false,
      message: 'No data found',
      data: [],
    });
  }
  res.status(200).json({
    success: true,
    message: 'Facilities retrieved successfully',
    data: facilities,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const facilityId = req.params.id;
  const updateData = req.body;

  const updatedFacility = await FacilityService.updateFacilityIntoDB(
    facilityId,
    updateData,
  );
  if (!updatedFacility) {
    return res
      .status(404)
      .json({ success: false, message: 'Facility not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Facility updated successfully',
    data: updatedFacility,
  });
});

const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const facilityId = req.params.id;

  const deletedFacility =
    await FacilityService.deleteFacilityFromDB(facilityId);
  if (!deletedFacility) {
    return res
      .status(404)
      .json({ success: false, message: 'Facility not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Facility deleted successfully',
    data: deletedFacility,
  });
});

export const FacilityController = {
  createFacility,
  getFacilities,
  updateFacility,
  deleteFacility,
};
