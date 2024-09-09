import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import { IAnnualExpenseData, IAnnualIncomeData } from '../../types';

const csvHandler = {
	createIncomeDataCsv: async (incomeData: IAnnualIncomeData[], detailed: boolean = false) => {
		const header = [
					{ id: 'date', title: 'Date' },
					{ id: 'amount', title: 'Amount' },
					{ id: 'customer', title: 'Customer' },
					{ id: 'account', title: 'Account' },
			  ];
		const csvWriter = createObjectCsvWriter({
			path: 'csv/financialData.csv',
			header,
		});

		await csvWriter.writeRecords(incomeData);
	},
	createExpenseDataCsv: async (expenseData: IAnnualExpenseData[]) => {
		const header = [
			{ id: 'date', title: 'Date' },
			{ id: 'amount', title: 'Amount' },
			{ id: 'payee', title: 'Payee' },
			{ id: 'category', title: 'Category' },
			{ id: 'description', title: 'Description' },
		];
		const csvWriter = createObjectCsvWriter({
			path: 'csv/expenseData.csv',
			header,
		});

		await csvWriter.writeRecords(expenseData);
	},
};

export default csvHandler;
