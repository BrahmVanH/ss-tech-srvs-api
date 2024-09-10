import { model, Schema } from 'mongoose';
import { Expense } from '../generated/graphql';

const expenseSchema: Schema<Expense> = new Schema<Expense>(
	{
		date: {
      type: String,
      required: true,
    },
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		payee: {
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
