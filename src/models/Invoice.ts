import { model, Schema, Types } from 'mongoose';
import { Invoice } from '../generated/graphql';

const invoiceSchema: Schema<Invoice> = new Schema<Invoice>({
	date: {
		type: String,
		required: true,
	},
	invoiceNumber: {
		type: String,
		required: true,
	},
	customerId: {
		type: Types.ObjectId,
		required: true,
		ref: 'Customer',
	},
	workOrders: [
		{
			type: Types.ObjectId,
			ref: 'WorkOrder',
		},
	],
	quote: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	charged: {
		type: Boolean,
		required: true,
	},
	paid: {
		type: Boolean,
		required: true,
	},
});

const Invoice = model<Invoice>('Invoice', invoiceSchema);

export default Invoice;
