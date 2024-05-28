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
	businessName: {
		type: String,
		required: true,
	},
	workOrders: {
		type: Schema.Types.ObjectId,
		required: false,
	},
});

const Customer = model<Customer>('Customer', customerSchema);

export default Customer;
