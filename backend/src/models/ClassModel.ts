import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { RANKS } from '../types/enums';

const ClassModel = new Schema({
	name: {
		type: String,
		required: true,
	},
	classTeacher: {
		type: Schema.Types.ObjectId,
		ref: 'Teacher',
		default: null,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
	rank: {
		type: String,
		enum: RANKS,
		required: true,
	},
	announcements: [
		{
			name: String,
			description: String,
			date: Date,
		},
	],
});

export default mongoose.model('Class', ClassModel);
