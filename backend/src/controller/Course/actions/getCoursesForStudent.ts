import { STATUS } from '../../../types/enums';

const getCoursesForStudent = async ({
	params,
	callback,
}: {
	params: any;
	callback: (status: any, message?: string | undefined) => void;
}) => {
	try {
		callback(STATUS.SUCCESS, 'Courses for student fetched successfully');
	} catch (error) {
		callback(STATUS.ERROR, 'Error happened while fetching courses for student');
	}
};

export default getCoursesForStudent;
