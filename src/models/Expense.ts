import { model, Schema } from 'mongoose';
import { Expense } from '../generated/graphql';

const expenseSchema: Schema<Expense> = new Schema<Expense>(
	{
		date: new Date(),
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Expense = model<Expense>('Expense', expenseSchema);

export default Expense;
