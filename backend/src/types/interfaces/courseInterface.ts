import { DatabaseClassProps } from './classInterface';
import { DatabaseExaminationProps } from './examinationInterface';
import { DatabaseStudentProps } from './studentInterface';
import { DatabaseTeacherProps } from './teacherInterface';
import { TIMESLOTS, WEEKDAYS } from '../enums';
import { DatabaseRoomProps } from './roomInterface';

interface CourseProps {
	name: string;
	shortName: string;
	courseTeacher: DatabaseTeacherProps['_id'];
	students: DatabaseStudentProps['_id'][];
	exams: DatabaseExaminationProps['_id'][];
	mandatory: boolean;
	room: DatabaseRoomProps['_id'];
	time: {
		weekday: WEEKDAYS;
		timeslot: TIMESLOTS;
	};
	schoolClasses: DatabaseClassProps['_id'][];
}

interface DatabaseCourseProps extends CourseProps {
	_id: string;
}

export type { CourseProps, DatabaseCourseProps };
