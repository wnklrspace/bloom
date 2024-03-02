import UserModel from '../../../models/UserModel';
import { STATUS } from '../../../types/enums';

const getUsers = async (
	callback: (status: STATUS, message?: string) => void,
) => {
	const users = await UserModel.find();

	if (users) {
		callback(STATUS.SUCCESS);
	} else {
		callback(STATUS.ERROR, 'Error getting users');
	}
};

export default getUsers;
