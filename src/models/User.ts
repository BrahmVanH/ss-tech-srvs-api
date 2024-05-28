import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types.d';
import { User } from '../generated/graphql';
const userSchema: Schema<User> = new Schema<User>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},

);


const User = model<User>('User', userSchema);

export default User;
