import { model, Schema, Types } from 'mongoose';
import { Address, Property } from '../generated/graphql';

export const AddressSchema: Schema<Address> = new Schema<Address>({
	street: {
		type: String,
		required: true,
	},
	unit: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
});

const propertySchema: Schema<Property> = new Schema<Property>({
	propertyName: {
		type: String,
		required: true,
	},
	propertyAddress: {
		type: AddressSchema,
		required: true,
	},
	propertyDescription: {
		type: String,
		required: true,
	},
	agent: {
		type: Types.ObjectId,
		required: true,
		ref: 'Customer',
	},
});

const Property = model<Property>('Property', propertySchema);

export default Property;
