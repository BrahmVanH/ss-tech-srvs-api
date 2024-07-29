import { User, Customer, Property, WorkOrder } from './models';
import { connectToDb } from './connection/db';
import { signToken } from './utils/auth';
import {
	MutationCreateUserArgs,
	Resolvers,
	User as IUser,
	MutationUpdateUserFirstNameArgs,
	MutationUpdateUserLastNameArgs,
	MutationUpdateUserUsernameArgs,
	MutationUpdateUserPasswordArgs,
	MutationUpdateUserPinArgs,
	MutationCreateCustomerArgs,
	MutationUpdateCustomerFirstNameArgs,
	MutationUpdateCustomerLastNameArgs,
	MutationUpdateCustomerBusinessNameArgs,
	MutationDeleteCustomerArgs,
	MutationCreatePropertyArgs,
	MutationUpdatePropertyDescriptionArgs,
	MutationUpdatePropertyAddressArgs,
	MutationUpdatePropertyAgentArgs,
	MutationUpdatePropertyS3FolderKeyArgs,
	MutationCreateWorkOrderArgs,
	MutationUpdateWorkOrderDateArgs,
	MutationUpdateWorkOrderCustomerIdArgs,
	MutationUpdateWorkOrderPropertyIdArgs,
	MutationUpdateWorkOrderTypeArgs,
	MutationUpdateWorkOrderDescriptionArgs,
	MutationUpdateWorkOrderCompletedByArgs,
	MutationUpdateWorkOrderQuoteArgs,
	MutationUpdateWorkOrderTotalArgs,
	MutationUpdateWorkOrderChargedArgs,
	MutationUpdateWorkOrderPaidArgs,
	MutationUpdateWorkOrderCommentsArgs,
	MutationCreateInvoiceArgs,
	MutationDeleteInvoiceArgs,
	MutationUpdateInvoicePaidArgs,
	MutationUpdateInvoiceTotalArgs,
	MutationUpdateInvoiceWorkOrdersArgs,
	MutationUpdateInvoiceCustomerIdArgs,
	MutationUpdateInvoiceDateArgs,
	MutationUpdateInvoiceQuoteArgs,
	MutationLoginUserArgs,
	MutationDeletePropertyArgs,
	MutationDeleteWorkOrderArgs,
	MutationUpdateCustomerPropertiesArgs,
	MutationUpdateWorkOrderCompletedArgs,
	MutationSendScheduleServiceMessageArgs,
} from './generated/graphql';
import { hash } from 'bcryptjs';
import { comparePassword, hashPassword } from './utils/helpers';
import Invoice from './models/Invoice';
import scrape from './lib/thumbtack_scraper';
import { Types } from 'mongoose';
import { sendScheduleServiceEmail } from './lib/nodemailer';

// TO_DO: create resolver to create s3 folder for property as soon as property is created
// TO_DO: create resolvers flow to create, update, delete user pin

const resolvers: Resolvers = {
	Query: {
		getAllUsers: async () => {
			try {
				await connectToDb();

				const allUsers = await User.find();

				if (!allUsers) {
					throw new Error('Error fetching all users from database');
				}

				return allUsers;
			} catch (err: any) {
				console.error({ message: 'error in finding user', details: err });
				throw new Error('Error in finding users: ' + err.message);
			}
		},
		queryCustomers: async () => {
			try {
				await connectToDb();

				const customers = await Customer.find().populate('workOrders').populate('invoices').populate('properties');
				console.log('customers', customers);
				if (!customers) {
					throw new Error('Error fetching all customers from database');
				}

				return customers;
			} catch (err: any) {
				console.error({ message: 'error in finding customers', details: err });
				throw new Error('Error in finding customers: ' + err.message);
			}
		},
		queryCustomerById: async (_: {}, { customerId }: { customerId: string }, __: any) => {
			try {
				await connectToDb();

				if (!customerId) {
					throw new Error('No customer ID was presented for querying customer');
				}

				const customer = await Customer.findOne({ _id: customerId }).populate('workOrders').populate('invoices');

				if (!customer) {
					throw new Error('Cannot find customer in database');
				}

				return customer;
			} catch (err: any) {
				console.error({ message: 'error in finding customer', details: err });
				throw new Error('Error in finding customer: ' + err.message);
			}
		},
		queryProperties: async () => {
			try {
				await connectToDb();

				const properties = await Property.find().populate('agent');

				if (!properties) {
					throw new Error('Error fetching all properties from database');
				}

				return properties;
			} catch (err: any) {
				console.error({ message: 'error in finding properties', details: err });
				throw new Error('Error in finding properties: ' + err.message);
			}
		},
		queryPropertyById: async (_: {}, { propertyId }: { propertyId: string }, __: any) => {
			try {
				await connectToDb();

				if (!propertyId) {
					throw new Error('No property ID was presented for querying property');
				}

				const property = await Property.findOne({ _id: propertyId }).populate('agent');

				if (!property) {
					throw new Error('Cannot find property in database');
				}

				return property;
			} catch (err: any) {
				console.error({ message: 'error in finding property', details: err });
				throw new Error('Error in finding property: ' + err.message);
			}
		},
		queryWorkOrders: async () => {
			try {
				await connectToDb();

				const workOrders = await WorkOrder.find().populate('invoices').populate('customerId').populate('propertyId');

				if (!workOrders) {
					throw new Error('Error fetching all work orders from database');
				}

				return workOrders;
			} catch (err: any) {
				console.error({ message: 'error in finding work orders', details: err });
				throw new Error('Error in finding work orders: ' + err.message);
			}
		},
		queryWorkOrdersByProperty: async (_: {}, { propertyId }: { propertyId: string }, __: any) => {
			try {
				await connectToDb();

				if (!propertyId) {
					throw new Error('No property name was presented for querying work orders');
				}

				const workOrders = await WorkOrder.find({ propertyId });

				if (!workOrders) {
					throw new Error('Cannot find work orders in database');
				}

				return workOrders;
			} catch (err: any) {
				console.error({ message: 'error in finding work orders', details: err });
				throw new Error('Error in finding work orders: ' + err.message);
			}
		},
		queryWorkOrdersByCustomer: async (_: {}, { customerId }: { customerId: string }, __: any) => {
			try {
				await connectToDb();

				if (!customerId) {
					throw new Error('No customer name was presented for querying work orders');
				}

				const workOrders = await WorkOrder.find({ customerId });

				if (!workOrders) {
					throw new Error('Cannot find work orders in database');
				}

				return workOrders;
			} catch (err: any) {
				console.error({ message: 'error in finding work orders', details: err });
				throw new Error('Error in finding work orders: ' + err.message);
			}
		},
		queryWorkOrderById: async (_: {}, { workOrderId }: { workOrderId: string }, __: any) => {
			try {
				await connectToDb();

				if (!workOrderId) {
					throw new Error('No work order ID was presented for querying work order');
				}

				const workOrder = await WorkOrder.findOne({ _id: workOrderId }).populate('invoices');

				if (!workOrder) {
					throw new Error('Cannot find work order in database');
				}

				return workOrder;
			} catch (err: any) {
				console.error({ message: 'error in finding work order', details: err });
				throw new Error('Error in finding work order: ' + err.message);
			}
		},
		queryInvoices: async () => {
			try {
				await connectToDb();

				const invoices = await Invoice.find().populate('workOrders').populate('customerId');

				if (!invoices) {
					throw new Error('Error fetching all invoices from database');
				}

				return invoices;
			} catch (err: any) {
				console.error({ message: 'error in finding invoices', details: err });
				throw new Error('Error in finding invoices: ' + err.message);
			}
		},
		queryInvoiceById: async (_: {}, { invoiceId }: { invoiceId: string }, __: any) => {
			try {
				await connectToDb();

				if (!invoiceId) {
					throw new Error('No invoice ID was presented for querying invoice');
				}

				const invoice = await Invoice.findOne({ _id: invoiceId }).populate('workOrders').populate('customerId');

				if (!invoice) {
					throw new Error('Cannot find invoice in database');
				}

				return invoice;
			} catch (err: any) {
				console.error({ message: 'error in finding invoice', details: err });
				throw new Error('Error in finding invoice: ' + err.message);
			}
		},
		queryInvoicesByCustomer: async (_: {}, { customerId }: { customerId: string }, __: any) => {
			try {
				await connectToDb();

				if (!customerId) {
					throw new Error('No customer name was presented for querying invoices');
				}

				const invoices = await Invoice.find({ customerId });

				if (!invoices) {
					throw new Error('Cannot find invoices in database');
				}

				return invoices;
			} catch (err: any) {
				console.error({ message: 'error in finding invoices', details: err });
				throw new Error('Error in finding invoices: ' + err.message);
			}
		},
		queryInvoicesByWorkOrder: async (_: {}, { workOrderId }: { workOrderId: string }, __: any) => {
			try {
				await connectToDb();

				if (!workOrderId) {
					throw new Error('No work order name was presented for querying invoices');
				}

				const invoices = await Invoice.find({ workOrders: { _id: workOrderId } });

				if (!invoices) {
					throw new Error('Cannot find invoices in database');
				}

				return invoices;
			} catch (err: any) {
				console.error({ message: 'error in finding invoices', details: err });
				throw new Error('Error in finding invoices: ' + err.message);
			}
		},
		queryThumbtackReviews: async () => {
			try {
				const reviews = scrape();
				if (reviews && reviews.length < 1) {
					throw new Error('Error fetching reviews from Thumbtack');
				}
				return reviews;
			} catch (err: any) {
				console.error({ message: 'error in finding reviews', details: err });
				throw new Error('Error in finding reviews: ' + err.message);
			}
		},

		// getPresignedS3Url: async (_: {}, { imgKey, commandType, altTag }: { imgKey: string; commandType: string; altTag: string }, __: any) => {
		// 	try {
		// 		const preSignedUrl = await getPresignedUrl(imgKey, commandType, altTag);
		// 		if (!preSignedUrl) {
		// 			console.error('Error in getting presigned URL');
		// 			throw new Error('Error in getting presigned URL');
		// 		}
		// 		return preSignedUrl;
		// 	} catch (err: any) {
		// 		throw new Error('Error in getting upload url for s3: ' + err.message);
		// 	}
		// },
	},
	Mutation: {
		createUser: async (_: {}, args: MutationCreateUserArgs, __: any) => {
			const { firstName, lastName, username, userPassword, adminCode } = args.input;

			if (!firstName || !lastName || !username || !userPassword || !adminCode) {
				throw new Error('All fields must be filled to create a user.');
			} else if (adminCode !== process.env.ADMIN_CODE) {
				throw new Error('Incorrect admin code');
			}

			const hashedPassword = await hashPassword(userPassword);

			try {
				await connectToDb();

				const user = await User.create({
					firstName,
					lastName,
					username,
					password: hashedPassword,
				});

				if (!user) {
					throw new Error('There was an error creating user. Try again.');
				}

				const token = signToken(user);

				return { token, user };
			} catch (err: any) {
				throw new Error('Error in creating user: ' + err.message);
			}
		},
		updateUserFirstName: async (_: {}, args: MutationUpdateUserFirstNameArgs, __: any) => {
			const { userId, firstName } = args.input;
			if (!userId || !firstName) {
				throw new Error('userId and firstName fields must be filled to update user first name');
			}

			try {
				await connectToDb();

				const updatedUser = await User.findOneAndUpdate({ _id: userId }, { firstName }, { new: true });

				if (!updatedUser) {
					throw new Error('Could not update user first name');
				}

				const token = signToken(updatedUser);
				return { token, user: updatedUser };
			} catch (err: any) {
				throw new Error('Error in updating user first name: ' + err.message);
			}
		},
		updateUserLastName: async (_: {}, args: MutationUpdateUserLastNameArgs, __: any) => {
			const { userId, lastName } = args.input;
			if (!userId || !lastName) {
				throw new Error('userId and lastName fields must be filled to update user last name');
			}

			try {
				await connectToDb();

				const updatedUser = await User.findOneAndUpdate({ _id: userId }, { lastName }, { new: true });

				if (!updatedUser) {
					throw new Error('Could not update user last name');
				}

				const token = signToken(updatedUser);

				return { token, user: updatedUser };
			} catch (err: any) {
				throw new Error('Error in updating user last name: ' + err.message);
			}
		},
		updateUserUsername: async (_: {}, args: MutationUpdateUserUsernameArgs, __: any) => {
			const { userId, username } = args.input;
			if (!userId || !username) {
				throw new Error('userId and username fields must be filled to update user username');
			}

			try {
				await connectToDb();

				const updatedUser = await User.findOneAndUpdate({ _id: userId }, { username }, { new: true });

				if (!updatedUser) {
					throw new Error('Could not update user username');
				}

				const token = signToken(updatedUser);

				return { token, user: updatedUser };
			} catch (err: any) {
				throw new Error('Error in updating user username: ' + err.message);
			}
		},
		updateUserPassword: async (_: {}, args: MutationUpdateUserPasswordArgs, __: any) => {
			const { userId, userPassword, newPassword } = args.input;
			if (!userId || !userPassword || !newPassword) {
				throw new Error('userId and userPassword fields must be filled to update user password');
			}

			try {
				await connectToDb();

				const user = await User.findOne({ _id: userId });

				if (!user) {
					throw new Error('Could not find user');
				}

				const existingPasswordIsCorrect = await comparePassword(userPassword, userPassword);

				if (!existingPasswordIsCorrect) {
					throw new Error('Incorrect password');
				}

				const updatedUser = await User.findOneAndUpdate({ _id: userId }, { password: userPassword }, { new: true });

				if (!updatedUser) {
					throw new Error('Could not update user password');
				}

				const token = signToken(updatedUser);

				return { token, user: updatedUser };
			} catch (err: any) {
				throw new Error('Error in updating user password: ' + err.message);
			}
		},
		updateUserPin: async (_: {}, args: MutationUpdateUserPinArgs, __: any) => {
			const { userId, pin, userPassword } = args.input;
			if (!userId || !pin || !userPassword) {
				throw new Error('userId, pin, and password fields must be filled to update user pin');
			}

			try {
				await connectToDb();

				const user = await User.findOne({ _id: userId });

				if (!user) {
					throw new Error('Could not find user');
				}

				const existingPasswordIsCorrect = await comparePassword(userPassword, userPassword);

				if (!existingPasswordIsCorrect) {
					throw new Error('Incorrect password');
				}

				const updatedUser = await User.findOneAndUpdate({ _id: userId }, { pin }, { new: true });

				if (!updatedUser) {
					throw new Error('Could not update user pin');
				}
				const token = signToken(updatedUser);

				return { token, user: updatedUser };
			} catch (err: any) {
				throw new Error('Error in updating user pin: ' + err.message);
			}
		},
		loginUser: async (_: {}, args: MutationLoginUserArgs, __: any) => {
			console.log('args', args);

			const { username, userPassword: enteredPassword } = args.input;

			try {
				await connectToDb();

				if (!username || !enteredPassword) {
					throw new Error('username and password fields must be filled to log in');
				}

				const user: IUser | null = await User.findOne({ username });

				if (!user) {
					throw new Error('Could not find user');
				}

				console.log('user', user);

				const existingPasswordIsCorrect = await comparePassword(enteredPassword, user.password as string);

				if (!existingPasswordIsCorrect) {
					throw new Error('Incorrect password');
				}

				const token = signToken(user);
				console.log('token', token);
				console.log('user', user);
				return { token, user };
			} catch (err: any) {
				throw new Error('Error in logging in user: ' + err.message);
			}
		},
		removeUser: async (_: {}, args: any, __: any) => {
			const { username, userPassword } = args.input;

			try {
				await connectToDb();
				if (!username) {
					throw new Error('username  fields must be filled to remove');
				}

				const user = await User.findOne({ username });

				if (!user) {
					throw new Error('Could not find user');
				}

				const existingPasswordIsCorrect = await comparePassword(userPassword, userPassword);

				if (!existingPasswordIsCorrect) {
					throw new Error('Incorrect password');
				}

				const deletedUser = await User.findOneAndDelete({ username });
				if (!deletedUser) {
					throw new Error('Could not delete user');
				}

				const token = signToken(deletedUser);

				return { token, user: deletedUser };
			} catch (err: any) {
				throw new Error('Error in removing in user: ' + err.message);
			}
		},
		createCustomer: async (_: {}, args: MutationCreateCustomerArgs, __: any) => {
			const customer = args.input;
			if (!customer) {
				throw new Error('No customer object was presented for creating customer');
			}

			try {
				await connectToDb();

				const newCustomer = await Customer.create({ ...customer, email: customer.email ?? '', workOrders: [], invoices: [] });

				if (!newCustomer) {
					throw new Error('Could not create customer');
				}

				return newCustomer;
			} catch (err: any) {
				throw new Error('Error in creating customer: ' + err.message);
			}
		},
		updateCustomerFirstName: async (_: {}, args: MutationUpdateCustomerFirstNameArgs, __: any) => {
			const { customerId, firstName } = args.input;
			if (!customerId || !firstName) {
				throw new Error('customerId and firstName fields must be filled to update customer first name');
			}

			try {
				await connectToDb();

				const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, { firstName }, { new: true });

				if (!updatedCustomer) {
					throw new Error('Could not update customer first name');
				}

				return updatedCustomer;
			} catch (err: any) {
				throw new Error('Error in updating customer first name: ' + err.message);
			}
		},
		updateCustomerLastName: async (_: {}, args: MutationUpdateCustomerLastNameArgs, __: any) => {
			const { customerId, lastName } = args.input;
			if (!customerId || !lastName) {
				throw new Error('customerId and lastName fields must be filled to update customer last name');
			}

			try {
				await connectToDb();

				const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, { lastName }, { new: true });

				if (!updatedCustomer) {
					throw new Error('Could not update customer last name');
				}

				return updatedCustomer;
			} catch (err: any) {
				throw new Error('Error in updating customer last name: ' + err.message);
			}
		},
		updateCustomerBusinessName: async (_: {}, args: MutationUpdateCustomerBusinessNameArgs, __: any) => {
			const { customerId, businessName } = args.input;
			if (!customerId || !businessName) {
				throw new Error('customerId and businessName fields must be filled to update customer business name');
			}

			try {
				await connectToDb();

				const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, { businessName }, { new: true });

				if (!updatedCustomer) {
					throw new Error('Could not update customer business name');
				}

				return updatedCustomer;
			} catch (err: any) {
				throw new Error('Error in updating customer business name: ' + err.message);
			}
		},
		updateCustomerProperties: async (_: {}, args: MutationUpdateCustomerPropertiesArgs, __: any) => {
			const { customerId, property } = args.input;
			if (!customerId || !property) {
				throw new Error('customerId and properties fields must be filled to update customer properties');
			}

			try {
				await connectToDb();

				if (!property) {
					throw new Error('Could not find property');
				}

				const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, { $push: { properties: new Types.ObjectId(property) } }, { new: true });

				if (!updatedCustomer) {
					throw new Error('Could not update customer properties');
				}

				return updatedCustomer;
			} catch (err: any) {
				throw new Error('Error in updating customer properties: ' + err.message);
			}
		},
		deleteCustomer: async (_: {}, args: MutationDeleteCustomerArgs, __: any) => {
			const { customerId } = args.input;
			if (!customerId) {
				throw new Error('No customer ID was presented for deleting customer');
			}

			try {
				await connectToDb();

				const deletedCustomer = await Customer.findOneAndDelete({ _id: customerId });

				if (!deletedCustomer) {
					throw new Error('Could not delete customer');
				}

				return deletedCustomer;
			} catch (err: any) {
				throw new Error('Error in deleting customer: ' + err.message);
			}
		},
		createProperty: async (_: {}, args: MutationCreatePropertyArgs, __: any) => {
			const property = args.input;
			if (!property) {
				throw new Error('No property object was presented for creating property');
			}

			try {
				await connectToDb();

				const newProperty = await Property.create({ ...property, s3FolderKey: property.s3FolderKey ?? '' });

				if (!newProperty) {
					throw new Error('Could not create property');
				}

				const customer = await Customer.findOneAndUpdate({ _id: property.agent }, { $push: { properties: new Types.ObjectId(newProperty._id) } });

				if (!customer) {
					throw new Error('Could not update customer with new property');
				}

				return newProperty;
			} catch (err: any) {
				throw new Error('Error in creating property: ' + err.message);
			}
		},
		updatePropertyDescription: async (_: {}, args: MutationUpdatePropertyDescriptionArgs, __: any) => {
			const { propertyId, propertyDescription } = args.input;
			if (!propertyId || !propertyDescription) {
				throw new Error('propertyId and propertyDescription fields must be filled to update property description');
			}

			try {
				await connectToDb();

				const updatedProperty = await Property.findOneAndUpdate({ _id: propertyId }, { propertyDescription }, { new: true });

				if (!updatedProperty) {
					throw new Error('Could not update property description');
				}

				return updatedProperty;
			} catch (err: any) {
				throw new Error('Error in updating property description: ' + err.message);
			}
		},
		updatePropertyAddress: async (_: {}, args: MutationUpdatePropertyAddressArgs, __: any) => {
			const { propertyId, propertyAddress } = args.input;
			if (!propertyId || !propertyAddress) {
				throw new Error('propertyId and propertyAddress fields must be filled to update property address');
			}

			try {
				await connectToDb();

				const updatedProperty = await Property.findOneAndUpdate({ _id: propertyId }, { propertyAddress }, { new: true });

				if (!updatedProperty) {
					throw new Error('Could not update property address');
				}

				return updatedProperty;
			} catch (err: any) {
				throw new Error('Error in updating property address: ' + err.message);
			}
		},
		updatePropertyAgent: async (_: {}, args: MutationUpdatePropertyAgentArgs, __: any) => {
			const { propertyId, agent } = args.input;
			if (!propertyId || !agent) {
				throw new Error('propertyId and agent fields must be filled to update property agent');
			}

			try {
				await connectToDb();

				const updatedProperty = await Property.findOneAndUpdate({ _id: propertyId }, { agent }, { new: true });

				if (!updatedProperty) {
					throw new Error('Could not update property agent');
				}

				return updatedProperty;
			} catch (err: any) {
				throw new Error('Error in updating property agent: ' + err.message);
			}
		},
		updatePropertyS3FolderKey: async (_: {}, args: MutationUpdatePropertyS3FolderKeyArgs, __: any) => {
			const { propertyId, s3FolderKey } = args.input;
			if (!propertyId || !s3FolderKey) {
				throw new Error('propertyId and s3FolderKey fields must be filled to update property s3FolderKey');
			}

			try {
				await connectToDb();

				const updatedProperty = await Property.findOneAndUpdate({ _id: propertyId }, { s3FolderKey }, { new: true });

				if (!updatedProperty) {
					throw new Error('Could not update property s3FolderKey');
				}

				return updatedProperty;
			} catch (err: any) {
				throw new Error('Error in updating property s3FolderKey: ' + err.message);
			}
		},
		deleteProperty: async (_: {}, args: MutationDeletePropertyArgs, __: any) => {
			const { propertyId } = args.input;
			if (!propertyId) {
				throw new Error('No property ID was presented for deleting property');
			}

			try {
				await connectToDb();

				const deletedProperty = await Property.findOneAndDelete({ _id: propertyId });

				if (!deletedProperty) {
					throw new Error('Could not delete property');
				}

				return deletedProperty;
			} catch (err: any) {
				throw new Error('Error in deleting property: ' + err.message);
			}
		},
		createWorkOrder: async (_: {}, args: MutationCreateWorkOrderArgs, __: any) => {
			const workOrder = args.input;
			if (!workOrder) {
				throw new Error('No work order object was presented for creating work order');
			}

			try {
				await connectToDb();

				const newWorkOrder = await WorkOrder.create({
					...workOrder,
					lastUpdated: new Date(),
					completed: false,
					completedBy: workOrder.completedBy ?? '',
					quote: workOrder.quote ?? 0,
					total: workOrder.total ?? 0,
					comments: workOrder.comments ?? '',
					invoices: [],
				});

				if (!newWorkOrder) {
					throw new Error('Could not create work order');
				}

				const customer = await Customer.findOneAndUpdate({ _id: workOrder.customerId }, { $push: { workOrders: new Types.ObjectId(newWorkOrder._id) } });

				if (!customer) {
					throw new Error('Could not update customer with new work order');
				}

				return newWorkOrder;
			} catch (err: any) {
				throw new Error('Error in creating work order: ' + err.message);
			}
		},
		updateWorkOrderDate: async (_: {}, args: MutationUpdateWorkOrderDateArgs, __: any) => {
			const { workOrderId, date } = args.input;
			if (!workOrderId || !date) {
				throw new Error('workOrderId and date fields must be filled to update work order date');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { date, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order date');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order date: ' + err.message);
			}
		},
		updateWorkOrderCustomerId: async (_: {}, args: MutationUpdateWorkOrderCustomerIdArgs, __: any) => {
			const { workOrderId, customerId } = args.input;
			if (!workOrderId || !customerId) {
				throw new Error('workOrderId and customerId fields must be filled to update work order customer ID');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { customerId, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order customer ID');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order customer ID: ' + err.message);
			}
		},
		updateWorkOrderPropertyId: async (_: {}, args: MutationUpdateWorkOrderPropertyIdArgs, __: any) => {
			const { workOrderId, propertyId } = args.input;
			if (!workOrderId || !propertyId) {
				throw new Error('workOrderId and propertyId fields must be filled to update work order property ID');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { propertyId, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order property ID');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order property ID: ' + err.message);
			}
		},
		updateWorkOrderType: async (_: {}, args: MutationUpdateWorkOrderTypeArgs, __: any) => {
			const { workOrderId, type } = args.input;
			if (!workOrderId || !type) {
				throw new Error('workOrderId and type fields must be filled to update work order type');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { type, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order type');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order type: ' + err.message);
			}
		},
		updateWorkOrderDescription: async (_: {}, args: MutationUpdateWorkOrderDescriptionArgs, __: any) => {
			const { workOrderId, description } = args.input;
			if (!workOrderId || !description) {
				throw new Error('workOrderId and description fields must be filled to update work order description');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { description, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order description');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order description: ' + err.message);
			}
		},
		updateWorkOrderCompleted: async (_: {}, args: MutationUpdateWorkOrderCompletedArgs, __: any) => {
			const { workOrderId, completed } = args.input;
			if (!workOrderId || completed === undefined) {
				throw new Error('workOrderId and completed fields must be filled to update work order completed');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { completed, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order completed');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order completed: ' + err.message);
			}
		},
		updateWorkOrderCompletedBy: async (_: {}, args: MutationUpdateWorkOrderCompletedByArgs, __: any) => {
			const { workOrderId, completedBy } = args.input;
			if (!workOrderId || !completedBy) {
				throw new Error('workOrderId and completedBy fields must be filled to update work order completed by');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { completedBy, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order completed by');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order completed by: ' + err.message);
			}
		},
		updateWorkOrderQuote: async (_: {}, args: MutationUpdateWorkOrderQuoteArgs, __: any) => {
			const { workOrderId, quote } = args.input;
			if (!workOrderId || !quote) {
				throw new Error('workOrderId and quote fields must be filled to update work order quote');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { quote, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order quote');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order quote: ' + err.message);
			}
		},
		updateWorkOrderTotal: async (_: {}, args: MutationUpdateWorkOrderTotalArgs, __: any) => {
			const { workOrderId, total } = args.input;
			if (!workOrderId || !total) {
				throw new Error('workOrderId and total fields must be filled to update work order total');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { total, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order total');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order total: ' + err.message);
			}
		},
		updateWorkOrderCharged: async (_: {}, args: MutationUpdateWorkOrderChargedArgs, __: any) => {
			const { workOrderId, charged } = args.input;
			if (!workOrderId || charged === undefined) {
				throw new Error('workOrderId and charged fields must be filled to update work order charged');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { charged, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order charged');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order charged: ' + err.message);
			}
		},
		updateWorkOrderPaid: async (_: {}, args: MutationUpdateWorkOrderPaidArgs, __: any) => {
			const { workOrderId, paid } = args.input;
			if (!workOrderId || paid === undefined) {
				throw new Error('workOrderId and paid fields must be filled to update work order paid');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { paid, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order paid');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order paid: ' + err.message);
			}
		},
		updateWorkOrderComments: async (_: {}, args: MutationUpdateWorkOrderCommentsArgs, __: any) => {
			const { workOrderId, comments } = args.input;
			if (!workOrderId || !comments) {
				throw new Error('workOrderId and comments fields must be filled to update work order comments');
			}

			try {
				await connectToDb();

				const updatedWorkOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { comments, lastUpdated: new Date() }, { new: true });

				if (!updatedWorkOrder) {
					throw new Error('Could not update work order comments');
				}

				return updatedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in updating work order comments: ' + err.message);
			}
		},
		deleteWorkOrder: async (_: {}, args: MutationDeleteWorkOrderArgs, __: any) => {
			const { workOrderId } = args.input;
			if (!workOrderId) {
				throw new Error('No work order ID was presented for deleting work order');
			}

			try {
				await connectToDb();

				const deletedWorkOrder = await WorkOrder.findOneAndDelete({ _id: workOrderId });

				if (!deletedWorkOrder) {
					throw new Error('Could not delete work order');
				}

				return deletedWorkOrder;
			} catch (err: any) {
				throw new Error('Error in deleting work order: ' + err.message);
			}
		},
		createInvoice: async (_: {}, args: MutationCreateInvoiceArgs, __: any) => {
			const invoice = args.input;
			if (!invoice) {
				throw new Error('No invoice object was presented for creating invoice');
			}

			try {
				await connectToDb();

				const newInvoice = await Invoice.create({ ...invoice, workOrders: invoice.workOrders ?? [], quote: invoice.quote ?? 0, total: invoice.total ?? 0 });

				if (!newInvoice) {
					throw new Error('Could not create invoice');
				}

				invoice.workOrders?.forEach(async (workOrderId) => {
					try {
						const workOrder = await WorkOrder.findOneAndUpdate({ _id: workOrderId }, { $push: { invoices: new Types.ObjectId(newInvoice._id) } });
						if (!workOrder) {
							throw new Error('Could not update work order with new invoice');
						}
					} catch (err: any) {
						throw new Error('Error in updating work order with new invoice: ' + err.message);
					}
				});

				const customer = await Customer.findOneAndUpdate({ _id: invoice.customerId }, { $push: { invoices: new Types.ObjectId(newInvoice._id) } });

				if (!customer) {
					throw new Error('Could not update customer with new invoice');
				}
				return newInvoice;
			} catch (err: any) {
				throw new Error('Error in creating invoice: ' + err.message);
			}
		},
		updateInvoiceDate: async (_: {}, args: MutationUpdateInvoiceDateArgs, __: any) => {
			const { invoiceId, date } = args.input;
			if (!invoiceId || !date) {
				throw new Error('invoiceId and date fields must be filled to update invoice date');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { date }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice date');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice date: ' + err.message);
			}
		},
		updateInvoiceCustomerId: async (_: {}, args: MutationUpdateInvoiceCustomerIdArgs, __: any) => {
			const { invoiceId, customerId } = args.input;
			if (!invoiceId || !customerId) {
				throw new Error('invoiceId and customerId fields must be filled to update invoice customer ID');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { customerId }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice customer ID');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice customer ID: ' + err.message);
			}
		},
		updateInvoiceWorkOrders: async (_: {}, args: MutationUpdateInvoiceWorkOrdersArgs, __: any) => {
			const { invoiceId, workOrders } = args.input;
			if (!invoiceId || !workOrders) {
				throw new Error('invoiceId and workOrders fields must be filled to update invoice work orders');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { workOrders }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice work orders');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice work orders: ' + err.message);
			}
		},
		updateInvoiceQuote: async (_: {}, args: MutationUpdateInvoiceQuoteArgs, __: any) => {
			const { invoiceId, quote } = args.input;
			if (!invoiceId || !quote) {
				throw new Error('invoiceId and quote fields must be filled to update invoice quote');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { quote }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice quote');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice quote: ' + err.message);
			}
		},
		updateInvoiceTotal: async (_: {}, args: MutationUpdateInvoiceTotalArgs, __: any) => {
			const { invoiceId, total } = args.input;
			if (!invoiceId || !total) {
				throw new Error('invoiceId and total fields must be filled to update invoice total');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { total }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice total');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice total: ' + err.message);
			}
		},
		updateInvoicePaid: async (_: {}, args: MutationUpdateInvoicePaidArgs, __: any) => {
			const { invoiceId, paid } = args.input;
			if (!invoiceId || paid === undefined) {
				throw new Error('invoiceId and paid fields must be filled to update invoice paid');
			}

			try {
				await connectToDb();

				const updatedInvoice = await Invoice.findOneAndUpdate({ _id: invoiceId }, { paid }, { new: true });

				if (!updatedInvoice) {
					throw new Error('Could not update invoice paid');
				}

				return updatedInvoice;
			} catch (err: any) {
				throw new Error('Error in updating invoice paid: ' + err.message);
			}
		},
		deleteInvoice: async (_: {}, args: MutationDeleteInvoiceArgs, __: any) => {
			const { invoiceId } = args.input;
			if (!invoiceId) {
				throw new Error('No invoice ID was presented for deleting invoice');
			}

			try {
				await connectToDb();

				const deletedInvoice = await Invoice.findOneAndDelete({ _id: invoiceId });

				if (!deletedInvoice) {
					throw new Error('Could not delete invoice');
				}

				return deletedInvoice;
			} catch (err: any) {
				throw new Error('Error in deleting invoice: ' + err.message);
			}
		},
		sendScheduleServiceMessage: async (_: {}, args: MutationSendScheduleServiceMessageArgs, __: any) => {
			// const { givenName, familyName, tel, email, location, service, message } = args.input;
			const messageContent = args.input;
			console.log('sending email');
			if (!messageContent.givenName || !messageContent.familyName || !messageContent.tel || !messageContent.email || !messageContent.location || !messageContent.service || !messageContent.message) {
				throw new Error('All fields must be filled to send message');
			}

			try {
				console.log('messageContent', messageContent);
				// send email with nodemailer
				const sentMessage = await sendScheduleServiceEmail(messageContent);

				if (!sentMessage) {
					return '500 error';
					throw new Error('Could not send message');
				}

				console.log('sentMessage', sentMessage);

				// if success
				// return '200 ok'
				// else
				// return '500 error'

				return '200 ok';
			} catch (err: any) {
				throw new Error('Error in sending message: ' + err.message);
			}
		},

		// deleteS3Objects: async (_: {}, args: any, __: any) => {
		// 	const { imgKeys } = args?.input;
		// 	if (!imgKeys || imgKeys.length === 0) {
		// 		throw new Error('No key was presented for deleting object');
		// 	}
		// 	try {
		// 		await connectToDb();

		// 		const response = await deleteS3Objects(imgKeys);

		// 		if (!response) {
		// 			throw new Error('Could not delete object from s3');
		// 		}
		// 		return response;
		// 	} catch (err: any) {
		// 		throw new Error('Error in deleting object from s3: ' + err.message);
		// 	}
		// },
	},
};

export default resolvers;
