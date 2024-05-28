import { model, Schema } from 'mongoose';
import { Customer } from '../generated/graphql';

const customerSchema: Schema<Customer> = new Schema<Customer>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: false,
	},
	phone: {
		type: Number,
		required: true,
	},
	businessName: {
		type: String,
		required: true,
	},
	workOrders: [
		{
			type: Schema.Types.ObjectId,
			ref: 'WorkOrder',
		},
	],
	
});

const Customer = model<Customer>('Customer', customerSchema);

export default Customer;
