import mongoose, { Schema } from 'mongoose';

const StudentModel = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class',
		default: null,
	},
	grades: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Grade',
			required: false,
		},
	],
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Course',
			required: false,
		},
	],
});

export default mongoose.model('Student', StudentModel);
