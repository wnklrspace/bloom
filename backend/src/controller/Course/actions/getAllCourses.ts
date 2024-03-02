import CourseModel from '../../../models/CourseModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

const getAllCourses = async (callback: Callback) => {
	try {
		const allCourses = await CourseModel.find({});

		if (!allCourses) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
			return;
		}

		callback({
			isSuccess: true,
			message: Message.CLASS_SUCCESSFULLY_CREATED,
			res: allCourses,
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
		});
	}
};

export default getAllCourses;
