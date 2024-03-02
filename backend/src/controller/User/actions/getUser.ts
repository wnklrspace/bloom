import UserModel from '../../../models/UserModel';
import { STATUS } from '../../../types/enums';

const getUser = async (
	params: {
		userName: string;
	},
	callback: (status: STATUS, message?: string) => void,
) => {
	const { userName } = params;
	const potentialUser = UserModel.find({ userName: userName });

	potentialUser
		.then((user) => {
			callback(STATUS.SUCCESS, 'Successfully retrieved user');
		})
		.catch((err) => {
			console.log(err);
			callback(STATUS.ERROR, 'Error retrieving user');
		});
};

export default getUser;
