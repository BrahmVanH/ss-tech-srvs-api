import PDFKit from 'pdfkit';
import { Invoice, LaborItem } from '../../generated/graphql';
import fs from 'fs';

const invoice: any = {
	date: new Date().toISOString(),
	invoiceNumber: '169',
	_id: '1235',
	customerId: {
		_id: '1235',
		firstName: 'Anna',
		lastName: 'Marosi',
		address: {
			_id: '1234',
			street: '1092 N Fourth Street',
			city: 'Marquette',
			unit: 'none',
			state: 'MI',
			country: 'US',
			zip: '49855',
		},
		email: 'akmarosi@gmail.com',
		phone: '7086012456',
		businessName: 'Anna Marosi',
		createdAt: new Date().toISOString(),
		invoices: [],
		properties: [],
		workOrders: [],
	},
	total: 7500,
	materialsCost: 0,
	materialsCostDescription: '',
	laborItems: [{ laborCost: 7500, laborCostDescription: 'Dishwasher Basic Service' }],
	comments: 'Troubleshooted dishwasher not draining. Drain hose, pump, and filter all had small clogs. Removed dishwasher, cleaned all components, and reinstalled. ',
	workOrders: [],
	charged: true,
	paid: false,
	quote: 7500,
};

export default async function createInvoicePdf(invoice: Invoice): Promise<Buffer> {
	let doc = new PDFKit({ margin: 50 });

	generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateInvoiceCommentsSection(doc, invoice);
	generateFooter(doc);

	try {
		const pdfBuffer: Promise<Buffer> = new Promise((resolve, reject) => {
			const chunks: Uint8Array[] = [];
			doc.on('data', (chunk) => {
				chunks.push(chunk);
			});
			doc.on('end', () => {
				resolve(Buffer.concat(chunks));
			});
			doc.on('error', (err) => {
				reject(err);
			});
			doc.end();
		});

		if (!pdfBuffer) {
			throw new Error('Could not create PDF Buffer');
		}


		return pdfBuffer;
	} catch (error) {
		console.error(error);
		throw new Error('Error creating PDF');
	}
}

function generateHeader(doc: PDFKit.PDFDocument) {
	doc
		.image('src/lib/pdfkit/logo.jpeg', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(24)
		.text('South Shore', 104, 48)
		.fontSize(24)
		.text('Mechanical Services', 104, 78)
		.fontSize(10)
		.text('(906) 236-2760', 200, 50, { align: 'right' })
		.text('908 Champion Street', 200, 65, { align: 'right' })
		.text('Marquette, MI', 200, 80, { align: 'right' })
		.text('USA, 49855', 200, 96, { align: 'right' })
		.moveDown();
}
function generateFooter(doc: PDFKit.PDFDocument) {
	doc
		.moveDown(3)
		.fontSize(10)
		.text('Please make all checks out to South Shore Mechanical Services. Payment is due within 15 days, Thank you for your business!', 48, 700, { align: 'left', width: 400 });
}

function generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: Invoice) {
	doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

	generateHr(doc, 185);

	const customerInformationTop = 200;

	const address = invoice.customerId.address;

	doc
		.fontSize(10)
		.text('Invoice Number:', 50, customerInformationTop)
		.font('Helvetica-Bold')
		.text(invoice.invoiceNumber, 150, customerInformationTop)
		.font('Helvetica')
		.text('Invoice Date:', 50, customerInformationTop + 15)
		.text(formatDate(new Date()), 150, customerInformationTop + 15)
		.text('Balance Due:', 50, customerInformationTop + 30)
		.text(formatCurrency(invoice.total), 150, customerInformationTop + 30)

		.font('Helvetica-Bold')
		.text(`${invoice.customerId.firstName} ${invoice.customerId.lastName}`, 300, customerInformationTop)
		.font('Helvetica')
		.text(`${address.street} ${address.unit === 'none' ? '' : address.unit}`, 300, customerInformationTop + 15)
		.text(address.city + ', ' + address.state + ', ' + address.country, 300, customerInformationTop + 30)
		.moveDown();

	generateHr(doc, 252);
}

function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: Invoice) {
	let i;
	const invoiceTableTop = 330;

	doc.font('Helvetica-Bold');
	generateTableRow(doc, invoiceTableTop, 'Item', 'Description', 'Unit Cost', 'Line Total');
	generateHr(doc, invoiceTableTop + 20);
	doc.font('Helvetica');

	const materialsCostItem = createMaterialsCostItem(invoice.materialsCost, invoice.materialsCostDescription);

	const laborCostItems = createLaborCostItem(invoice.laborItems as LaborItem[]);

	const items = [...laborCostItems, materialsCostItem];
	const totalCost = items.reduce((acc, item) => acc + item.cost, 0);

	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			if (items[i].cost === 0) {
				continue;
			}
			const position = invoiceTableTop + (i + 1) * 30;
			generateTableRow(doc, position, items[i].item, items[i].description, formatCurrency(items[i].cost), formatCurrency(items[i].cost));
			generateHr(doc, position + 20);
		}
	} else {
		i = 0;
	}

	// Temporary until i need to add this feature to invoice creation

	const paid: number = 0;

	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	generateTableRow(doc, subtotalPosition, '', '', 'Subtotal', formatCurrency(invoice.total));

	const paidToDatePosition = subtotalPosition + 20;
	generateTableRow(doc, paidToDatePosition, '', '', 'Paid To Date', formatCurrency(paid));

	const duePosition = paidToDatePosition + 25;
	doc.font('Helvetica-Bold');
	generateTableRow(doc, duePosition, '', '', 'Balance Due', formatCurrency(totalCost - paid));
	doc.font('Helvetica');
}

function createMaterialsCostItem(cost: number, description: string) {
	if (cost && description) {
		return {
			item: 'Materials',
			description,
			cost,
		};
	}
	return {
		item: '',
		description: '',
		cost: 0,
	};
}

function createLaborCostItem(laborItems: LaborItem[]) {
	return laborItems.map(({ laborCost, laborCostDescription }: { laborCost: number; laborCostDescription: string }) => {
		if (laborCost && laborCostDescription) {
			return {
				item: 'Labor',
				description: laborCostDescription,
				cost: laborCost,
			};
		}
		return {
			item: '',
			description: '',
			cost: 0,
		};
	});
}
function generateTableRow(doc: PDFKit.PDFDocument, y: number, item: string, description: string, unitCost: string, lineTotal: string) {
	if (unitCost === '$0.00') {
		doc.moveUp();
		return;
	}
	doc.fontSize(10).text(item, 50, y).text(description, 150, y).text(unitCost, 280, y, { width: 90, align: 'right' }).text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
	doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents: number) {
	return '$' + (cents / 100).toFixed(2);
}

function formatDate(date: Date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return year + '/' + month + '/' + day;
}

function generateInvoiceCommentsSection(doc: PDFKit.PDFDocument, invoice: Invoice) {
	doc.fontSize(12).text('Comments:', 50, 515);
	doc.fontSize(10).text(invoice.comments, 56, 541);
}

createInvoicePdf(invoice);
