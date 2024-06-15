// import { User } from './user.model';

// export const findLastAdminId = async () => {
//   const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();

//   return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
// };

// export const generateAdminId = async () => {
//   let currentId = '0000'; // Starting ID if no previous admins exist
//   const lastAdminId = await findLastAdminId();

//   if (lastAdminId) {
//     currentId = lastAdminId;
//   }

//   const nextIdNumber = parseInt(currentId.substring(2), 10) + 1;
//   const nextId = `A-${nextIdNumber.toString().padStart(4, '0')}`;

//   return nextId;
// };
