import StudentModel from '../../../models/StudentModel';
import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns all students.
 * @returns An array of student objects for the client.
 *
 * @beta
 */

const getAllStudents = async (callback: Callback) => {
	try {
		const studentsWithoutUser = await StudentModel.find({});

		async function getCorrespondingUser(student: any) {
			const user = await UserModel.findOne({
				_id: student.userId,
			});
			return user;
		}

		const allStudents = async () => {
			const students = await Promise.all(
				studentsWithoutUser.map(async (student: any) => {
					const user: any = await getCorrespondingUser(student);

					return {
						_id: user._id,
						cName: user.cName,
						address: user.address,
						contact: user.contact,
						class: student.class,
						grades: student.grades,
						courses: student.courses,
						role: user.role,
					};
				}),
			);

			return students;
		};

		allStudents()
			.then((students) => {
				if (!students) {
					callback({
						isSuccess: false,
						message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
					});
					return;
				}

				callback({
					isSuccess: true,
					message: Message.STUDENTS_SUCCESSFULLY_FETCHED,
					res: students,
				});
			})
			.catch((err) => {
				console.log(err);
				callback({
					isSuccess: false,
					message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
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

export default getAllStudents;
