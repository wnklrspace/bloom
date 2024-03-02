import { Types } from 'mongoose';
import { DatabaseUserProps } from './userInterface';
import { DatabaseClassProps } from './classInterface';
import { DatabaseGradeProps } from './gradeInterface';
import { DatabaseCourseProps } from './courseInterface';

interface StudentProps {
	userId: DatabaseUserProps['_id'];
	class: DatabaseClassProps['_id'];
	grades: DatabaseGradeProps['_id'][];
	courses: DatabaseCourseProps['_id'][];
}

interface DatabaseStudentProps extends StudentProps {
	_id: Types.ObjectId;
}

export type { StudentProps, DatabaseStudentProps };
