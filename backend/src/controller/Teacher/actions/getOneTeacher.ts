import StudentModel from '../../../models/StudentModel';
import TeacherModel from '../../../models/TeacherModel';
import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns a teacher.
 *
 *
 * @param _id - The first input _id
 * @returns A teacher object for the client.
 *
 * @beta
 */

const getOneTeacher = async (
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

		const getTeacher = async () => {
			const teacher = await TeacherModel.findOne({
				userId: _id,
			}).then((t) => {
				if (!t) {
					callback({
						isSuccess: false,
						message: ErrorMessage.TEACHER_COULD_NOT_BE_FOUND,
					});
					return;
				}

				return {
					_id: potentialUser._id,
					cName: potentialUser.cName,
					address: potentialUser.address,
					contact: potentialUser.contact,
					courses: t.courses,
					role: potentialUser.role,
				};
			});

			return teacher;
		};

		getTeacher().then((teacher) => {
			if (!teacher) {
				callback({
					isSuccess: false,
					message: ErrorMessage.TEACHER_COULD_NOT_BE_FOUND,
				});
				return;
			}

			callback({
				isSuccess: true,
				message: Message.TEACHER_SUCCESSFULLY_FETCHED,
				res: teacher,
			});
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.TEACHER_COULD_NOT_BE_FOUND,
		});
	}
};

export default getOneTeacher;
