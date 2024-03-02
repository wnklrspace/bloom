import StudentModel from '../../../models/StudentModel';
import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns a student.
 *
 *
 * @param _id - The first input _id
 * @returns A student object for the client.
 *
 * @beta
 */

const getOneStudent = async (
	params: {
		_id: string;
	},
	callback: Callback,
) => {
	try {
		const { _id } = params;

		const potentialUser = await UserModel.findOne({
			_id,
		});

		if (!potentialUser) {
			callback({
				isSuccess: false,
				message: ErrorMessage.USER_COULD_NOT_BE_FOUND,
			});
			return;
		}

		const getStudent = async () => {
			const student = await StudentModel.findOne({
				userId: _id,
			}).then((s) => {
				if (!s) {
					callback({
						isSuccess: false,
						message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
					});
					return;
				}

				return {
					_id: potentialUser._id,
					cName: potentialUser.cName,
					address: potentialUser.address,
					contact: potentialUser.contact,
					class: s.class,
					grades: s.grades,
					courses: s.courses,
					role: potentialUser.role,
				};
			});

			return student;
		};

		getStudent().then((student) => {
			if (!student) {
				callback({
					isSuccess: false,
					message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
				});
				return;
			}

			callback({
				isSuccess: true,
				message: Message.STUDENT_SUCCESSFULLY_FETCHED,
				res: student,
			});
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
		});
	}
};

export default getOneStudent;
