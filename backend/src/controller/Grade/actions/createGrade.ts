import { GradeProps } from '../../../types/interfaces';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Creates a new grade.
 *
 * @param params
 * @param callback
 */

const createGrade = async (params: GradeProps, callback: Callback) => {
	try {
		callback({
			isSuccess: true,
			message: Message.GRADE_SUCCESSFULLY_CREATED,
		});
	} catch (error) {
		console.error(error);
		callback({
			isSuccess: false,
			message: ErrorMessage.GRADE_COULD_NOT_BE_CREATED,
		});
	}
};

export default createGrade;
