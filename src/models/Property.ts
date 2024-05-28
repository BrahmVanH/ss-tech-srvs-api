import { model, Schema, Types } from 'mongoose';

const AddressSchema: Schema = new Schema({
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
	zip: {
		type: String,
		required: true,
	},
});

const propertySchema: Schema = new Schema({
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

const Property = model('Property', propertySchema);

export default Property;
