import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { UserProps } from '../../../types/interfaces/userInterface';

const createUser = async (params: UserProps, callback: Callback) => {
	const { userName, password, cName, address, contact, role } = params;
	const newUser = {
		userName,
		password,
		cName,
		address,
		contact,
		role,
	};

	await UserModel.create(newUser)
		.then((user) => {
			callback({
				isSuccess: true,
				message: Message.USER_SUCCESSFULLY_CREATED,
				res: user,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.USER_COULD_NOT_BE_CREATED,
			});
		});
};

export default createUser;
