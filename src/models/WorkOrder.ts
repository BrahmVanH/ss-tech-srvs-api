import { model, Schema } from 'mongoose';
import { WorkOrder } from '../generated/graphql';

const workOrderSchema: Schema<WorkOrder> = new Schema<WorkOrder>(
	{
		date: {
			type: String,
			required: true,
		},
		lastUpdated: {
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
		completed: {
			type: Boolean,
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
		invoices: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Invoice',
			},
		],
		laborItems: [
			{
				laborCost: {
					type: Number,
					required: true,
				},
				laborCostDescription: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const WorkOrder = model<WorkOrder>('WorkOrder', workOrderSchema);

export default WorkOrder;
