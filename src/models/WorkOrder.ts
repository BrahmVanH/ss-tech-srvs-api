import { model, Schema } from 'mongoose';
import { WorkOrder } from '../generated/graphql';

const workOrderSchema: Schema<WorkOrder> = new Schema<WorkOrder>({
	date: {
		type: String,
		required: true,
	},
	customerId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Customer',
	},
	propertyId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Property',
	},
	type: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completedBy: {
		type: String,
		required: true,
	},
	quote: {
		type: Number,
		required: false,
	},
	total: {
		type: Number,
		required: false,
	},
	charged: {
		type: Boolean,
		required: true,
	},
	paid: {
		type: Boolean,
		required: true,
	},
	comments: {
		type: String,
		required: false,
	},
});

const WorkOrder = model<WorkOrder>('WordOrder', workOrderSchema);

export default WorkOrder;
