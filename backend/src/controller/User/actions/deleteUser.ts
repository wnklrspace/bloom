import UserModel from '../../../models/UserModel';
import { STATUS } from '../../../types/enums';

const deleteUser = async (
	params: {
		userName: string;
	},
	callback: (status: STATUS, message?: string) => void,
) => {
	const { userName } = params;
	UserModel.deleteOne({ userName: userName })
		.then(() => {
			callback(STATUS.SUCCESS, 'Successfully deleted user');
		})
		.catch((err) => {
			console.log(err);
			callback(STATUS.ERROR, 'Error deleting user');
		});
};

export default deleteUser;
