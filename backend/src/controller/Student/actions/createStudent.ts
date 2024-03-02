import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { ROLES } from '../../../types/enums';
import { DatabaseClassProps } from '../../../types/interfaces/classInterface';
import StudentModel from '../../../models/StudentModel';
import UserModel from '../../../models/UserModel';
import { ClassController } from '../..';

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

const createStudent = async (
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
		selectedClass: DatabaseClassProps['_id'];
	},
	callback: Callback,
) => {
	try {
		const { cName, address, contact, role, selectedClass } = params;

		const potentialStudent = await UserModel.findOne({
			cName,
		}).catch((err) => {
			callback({
				isSuccess: false,
				message: ErrorMessage.FETCHING_STUDENT_FAILED,
			});
			return;
		});

		if (potentialStudent) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_ALREADY_EXISTS,
			});
			return;
		}

		const newUser: any = await UserModel.create({
			userName: 's' + cName.toLowerCase().split(' ').join(''),
			password: 'tins',
			cName,
			address,
			contact: {
				phoneNumber: contact.phoneNumber,
				email: 'test@bloom-school.de',
			},
			role,
		}).catch((err) => {
			callback({
				isSuccess: false,
				message: ErrorMessage.USER_COULD_NOT_BE_CREATED,
			});
			return;
		});

		await StudentModel.create({
			userId: newUser._id,
		});

		/**
		 * Update the class with the new student.
		 */
		await ClassController.addStudentToClass(
			{
				classId: selectedClass.toString(),
				studentId: newUser._id,
			},
			(response) => {
				if (!response.isSuccess) {
					callback({
						isSuccess: false,
						message: response.message,
					});
				}
			},
		);

		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_CREATED,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_CREATED,
		});
	}
};

export default createStudent;
