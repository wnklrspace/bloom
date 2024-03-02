import { Types } from 'mongoose';
import { DatabaseCourseProps } from './courseInterface';
import { DatabaseClassProps } from './classInterface';
import { DatabaseUserProps } from './userInterface';

interface TeacherProps {
	userId: DatabaseUserProps['_id'];
	class: DatabaseClassProps['_id'];
	courses: DatabaseCourseProps['_id'][];
}

interface DatabaseTeacherProps extends TeacherProps {
	_id: Types.ObjectId;
}

export type { TeacherProps, DatabaseTeacherProps };
