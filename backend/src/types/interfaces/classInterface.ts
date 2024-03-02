import { Types } from 'mongoose';
import { RANKS } from '../enums';
import { DatabaseStudentProps } from './studentInterface';
import { DatabaseTeacherProps } from './teacherInterface';

interface ClassProps {
	name: string;
	classTeacher: DatabaseTeacherProps['_id'];
	students: DatabaseStudentProps['_id'][];
	rank: RANKS;
	announcements: {
		name: string;
		description: string;
		date: Date;
	}[];
}

interface DatabaseClassProps extends ClassProps {
	_id: Types.ObjectId;
}

export type { ClassProps, DatabaseClassProps };
