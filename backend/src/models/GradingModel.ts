import mongoose, { Schema } from 'mongoose';
import { GRADES } from '../types/enums';

const GradingModel = new Schema({
	grade: {
		type: Number,
		enum: GRADES,
		required: true,
	},
	examination: {
		type: Schema.Types.ObjectId,
		ref: 'Examination',
		required: true,
	},
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true,
	},
});

export default mongoose.model('Grading', GradingModel);
