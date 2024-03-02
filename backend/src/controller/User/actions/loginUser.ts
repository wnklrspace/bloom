import UserModel from '../../../models/UserModel';
import { ErrorMessage } from '../../../types/EventsMap';
import { ROLES } from '../../../types/enums';
import { ClientUserProps } from '../../../types/interfaces/userInterface';

/**
 * Returns an user object for the client.
 *
 *
 * @param userName - The first input userName
 * @param password - The second input password
 * @returns An user object for the client and isSuccess flag or the isSuccess flag and a message.
 *
 * @beta
 */

const loginUser = async (
	params: {
		userName: string;
		password: string;
	},
	callback: (response: {
		isSuccess: boolean;
		message?: string;
		res?: ClientUserProps;
	}) => void,
) => {
	const { userName, password } = params;

	// Check if user exists
	const potentialUser = await UserModel.findOne({
		userName,
	});

	if (!potentialUser) {
		callback({
			isSuccess: false,
			message: ErrorMessage.USER_DOES_NOT_EXIST,
		});
		return;
	}

	// Check if password is correct
	const correctPassword = potentialUser.password === password;

	if (!correctPassword) {
		callback({
			isSuccess: false,
			message: ErrorMessage.PASSWORD_IS_INCORRECT,
		});
		return;
	}

	const clientUser = {
		userId: potentialUser._id,
		userName: potentialUser.userName,
		cName: potentialUser.cName,
		address: potentialUser.address!,
		contact: potentialUser.contact!,
		role: potentialUser.role as ROLES,
	};

	callback({
		isSuccess: true,
		res: clientUser,
	});
};

export default loginUser;
