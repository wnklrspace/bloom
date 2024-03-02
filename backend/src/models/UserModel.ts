import mongoose, { Schema, Document } from 'mongoose';
import { ROLES } from '../types/enums';
import User from '../controller/User';

interface UserInterface extends Document {
	userName: string;
	password: string;
	cName: string;
	address: {
	  street: string;
	  zipCode: string;
	  city: string;
	};
	contact: {
	  phoneNumber: string;
	  email: string;
	};
	role: string;
	comparePassword(candidatePassword: string): boolean;
  }

const UserModel = new Schema({
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cName: {
		type: String,
		required: true,
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
	},
	contact: {
		phoneNumber: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		enum: ROLES,
		required: true,
	},
});

UserModel.methods.comparePassword = function(candidatePassword: string): boolean {
	return candidatePassword === this.password;
};

export default mongoose.model<UserInterface>('User', UserModel);
