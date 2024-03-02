import CourseModel from '../../../models/CourseModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns a class.
 *
 *
 * @param _id - The first input _id
 * @returns A class object for the client.
 */

const getOneCourse = async (
	params: {
		_id: string;
	},
	callback: Callback,
) => {
	CourseModel.findOne({
		_id: params._id,
	})
		.then((course) => {
			if (!course) {
				callback({
					isSuccess: false,
					message: ErrorMessage.COURSE_COULD_NOT_BE_FOUND,
				});
				return;
			}

			callback({
				isSuccess: true,
				message: Message.COURSE_SUCCESSFULLY_FETCHED,
				res: course,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_COULD_NOT_BE_FOUND,
			});
		});
};

export default getOneCourse;
