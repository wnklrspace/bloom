import { Types } from 'mongoose';
import { EXAMINATION_TYPES } from '../enums';
import { DatabaseGradeProps } from './gradeInterface';

interface ExaminationProps {
	name: string;
	weight: number;
	type: EXAMINATION_TYPES;
	grade: DatabaseGradeProps['_id'];
	courseId: DatabaseExaminationProps['_id'];
}

interface DatabaseExaminationProps extends ExaminationProps {
	_id: Types.ObjectId;
}

export type { ExaminationProps, DatabaseExaminationProps };
