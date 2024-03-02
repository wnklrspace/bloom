import mongoose, { Schema } from 'mongoose';
import { EXAMINATION_TYPES, GRADES } from '../types/enums';

const ExaminationModel = new Schema({
	name: {
		type: String,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		enum: EXAMINATION_TYPES,
		required: true,
	},
	grade: {
		type: Schema.Types.ObjectId,
		ref: 'Grade',
	},
	courseId: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});

export default mongoose.model('Exams', ExaminationModel);
