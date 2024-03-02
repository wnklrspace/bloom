import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { UserController } from '../..';
import { ROLES } from '../../../types/enums';
import { DatabaseUserProps } from '../../../types/interfaces/userInterface';

import TeacherModel from '../../../models/TeacherModel';
import UserModel from '../../../models/UserModel';

/**
 * Creates a new student.
 *
 *
 * @param cName - The first input cName
 * @param address - The second input address
 * @param contact - The third input contact
 * @param role - The fourth input role
 * @returns A message for the client.
 *
 * @beta
 */

const createTeacher = async (
	params: {
		cName: string;
		address: {
			street: string;
			city: string;
			zipCode: string;
		};
		contact: {
			phoneNumber: string;
			email: string;
		};
		role: ROLES;
	},
	callback: Callback,
) => {
	const { cName, address, contact, role } = params;

	const potentialTeacher = await UserModel.findOne({
		cName,
	}).catch((err) => {
		callback({
			isSuccess: false,
			message: ErrorMessage.FETCHING_TEACHER_FAILED,
		});
		return;
	});

	if (potentialTeacher) {
		callback({
			isSuccess: false,
			message: ErrorMessage.TEACHER_ALREADY_EXISTS,
		});
		return;
	}

	const newUser: any = await UserModel.create({
		userName: 't' + cName.toLowerCase().split(' ').join(''),
		password: 'tins',
		cName,
		address,
		contact: {
			phoneNumber: contact.phoneNumber,
			email: 'teacher@bloom-school.de',
		},
		role,
	}).catch((err) => {
		callback({
			isSuccess: false,
			message: ErrorMessage.USER_COULD_NOT_BE_CREATED,
		});
		return;
	});

	await TeacherModel.create({
		userId: newUser._id,
	})
		.then((res) => {
			callback({
				isSuccess: true,
				message: Message.TEACHER_SUCCESSFULLY_CREATED,
			});
		})
		.catch((err) => {
			callback({
				isSuccess: false,
				message: ErrorMessage.TEACHER_COULD_NOT_BE_CREATED,
			});
		});
};

export default createTeacher;
