import { STATUS } from '../../../types/enums';

const getCoursesForTeacher = async ({
	params,
	callback,
}: {
	params: any;
	callback: (status: any, message?: string | undefined) => void;
}) => {
	try {
		callback(STATUS.SUCCESS, 'Courses for teachers fetched successfully');
	} catch (error) {
		callback(
			STATUS.ERROR,
			'Error happened while fetching courses for teachers',
		);
	}
};

export default getCoursesForTeacher;
