import { Callback, ErrorMessage } from '../../../types/EventsMap';
import { DatabaseStudentProps } from '../../../types/interfaces/studentInterface';

const getStudentsById = async (
	params: {
		ids: DatabaseStudentProps['_id'][];
	},
	callback: Callback,
) => {
	try {
	} catch (err) {
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
		});
	}
};

export default getStudentsById;
