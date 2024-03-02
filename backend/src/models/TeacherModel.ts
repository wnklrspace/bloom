import mongoose, { Schema } from 'mongoose';

const TeacherModel = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class',
		required: false,
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Course',
			required: false,
		},
	],
});

export default mongoose.model('Teacher', TeacherModel);
