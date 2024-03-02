import { Error } from 'mongoose';
import TeacherModel from '../../../models/TeacherModel';
import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns all teacher.
 * @returns An array of teacher objects for the client.
 *
 * @param callback
 */

const getAllTeacher = async (callback: Callback) => {
	try {
		const teacherWithoutUser = await TeacherModel.find({});

		async function getCorrespondingUser(teacher: any) {
			const user = await UserModel.findOne({
				_id: teacher.userId,
			});
			return user;
		}

		const allTeacher = async () => {
			const teacher = await Promise.all(
				teacherWithoutUser.map(async (teacher: any) => {
					const user: any = await getCorrespondingUser(teacher);

					return {
						_id: user._id,
						cName: user.cName,
						address: user.address,
						contact: user.contact,
						role: user.role,
					};
				}),
			);

			return teacher;
		};

		allTeacher()
			.then((teacher) => {
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
			})
			.catch((err) => {
				callback({
					isSuccess: false,
					message: ErrorMessage.TEACHER_COULD_NOT_BE_FETCHED,
				});
				return;
			});
	} catch (err) {}
};

export default getAllTeacher;
