import { Types } from 'mongoose';
import { DatabaseExaminationProps } from './examinationInterface';
import { DatabaseStudentProps } from './studentInterface';

interface GradeProps {
	grade: number;
	examination: DatabaseExaminationProps['_id'];
	student: DatabaseStudentProps['_id'];
}

interface DatabaseGradeProps extends GradeProps {
	_id: Types.ObjectId;
}

export type { GradeProps, DatabaseGradeProps };
