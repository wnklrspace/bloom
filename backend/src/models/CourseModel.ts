import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { RANKS, TIMESLOTS } from '../types/enums';

const CourseModel = new Schema({
	name: {
		type: String,
		required: true,
	},
	shortName: {
		type: String,
		required: true,
	},
	courseTeacher: {
		type: Schema.Types.ObjectId,
		ref: 'Teacher',
		default: null,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Student',
			required: false,
		},
	],
	exams: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Examination',
			required: false,
		},
	],
	mandatory: {
		type: Boolean,
		required: true,
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
		default: null,
	},
	time: {
		weekday: {
			type: String,
			required: true,
		},
		timeslot: {
			type: String,
			enum: TIMESLOTS,
			required: true,
		},
	},
	rank: {
		type: String,
		enum: RANKS,
		required: true,
		default: null,
	},
	schoolClasses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Class',
			required: true,
		},
	],
});

export default mongoose.model('Course', CourseModel);
