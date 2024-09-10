import fs from 'fs';
import { createObjectCsvWriter, createObjectCsvStringifier } from 'csv-writer';
import { IAnnualExpenseData, IAnnualIncomeData } from '../../types';

async function createCsvString(data: IAnnualExpenseData[] | IAnnualIncomeData[], headers: any[]) {
	const csvStringifier = createObjectCsvStringifier({ header: headers });

	const headerString = csvStringifier.getHeaderString();
	const recordsString = csvStringifier.stringifyRecords(data);

	return headerString + recordsString;
}

export async function exportIncomeToCsv(incomeData: IAnnualIncomeData[], detailed: boolean = false) {
	const header = [
		{ id: 'date', title: 'Date' },
		{ id: 'amount', title: 'Amount' },
		{ id: 'customer', title: 'Customer' },
		{ id: 'account', title: 'Account' },
	];
	try {
		const csvString = await createCsvString(incomeData, header);
    const base64String = Buffer.from(csvString).toString('base64');
		if (!base64String) {
			throw new Error('Error creating CSV base 64 string');
		}
		return base64String;
	} catch (error) {
		console.error(error);
		throw new Error('Error creating CSV');
	}
}

export async function exportExpensesToCsv(expenseData: IAnnualExpenseData[]) {
	const header = [
		{ id: 'date', title: 'Date' },
		{ id: 'amount', title: 'Amount' },
		{ id: 'payee', title: 'Payee' },
		{ id: 'category', title: 'Category' },
		{ id: 'description', title: 'Description' },
	];

	try {
		const csvString = await createCsvString(expenseData, header);
    const base64String = Buffer.from(csvString).toString('base64');
		if (!base64String) {
			throw new Error('Error creating CSV base 64 string');
		}
		return base64String;
	} catch (error) {
		console.error(error);
		throw new Error('Error creating CSV');
	}
}
