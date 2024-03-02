import { Types } from 'mongoose';
import { ROLES } from '../enums';

interface ClientUserProps {
	userId: Types.ObjectId;
	userName: string;
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
	role: ROLES;
}

interface UserProps {
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
	role: ROLES;
}

interface DatabaseUserProps extends UserProps {
	_id: Types.ObjectId;
}

export type { UserProps, DatabaseUserProps, ClientUserProps };
