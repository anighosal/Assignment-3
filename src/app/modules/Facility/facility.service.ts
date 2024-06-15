import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (
  facilityData: TFacility,
  userId: string,
): Promise<TFacility> => {
  const facility = new Facility({ ...facilityData, createdBy: userId });
  await facility.save();
  return facility;
};

const getFacilitiesFromDB = async () => {
  return Facility.find({ isDeleted: false }).populate(
    'createdBy',
    'name email',
  );
};

export const FacilityService = {
  createFacilityIntoDB,
  getFacilitiesFromDB,
};
