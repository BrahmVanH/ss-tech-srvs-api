import {  User, Customer, Property, WorkOrder } from './models';
import { connectToDb } from './connection/db';
import { signToken } from './utils/auth';

// TO_DO: create resolver to create s3 folder for property as soon as property is created
// TO_DO: create resolvers flow to create, update, delete user pin

const resolvers = {
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

				const customers = await Customer.find();

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

				const customer = await Customer.findOne({ _id: customerId });

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

				const properties = await Property.find();

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

				const property = await Property.findOne({ _id: propertyId });

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

				const workOrders = await WorkOrder.find();

				if (!workOrders) {
					throw new Error('Error fetching all work orders from database');
				}

				return workOrders;
			} catch (err: any) {
				console.error({ message: 'error in finding work orders', details: err });
				throw new Error('Error in finding work orders: ' + err.message);
			}
		},
		queryWorkOrderByProperty: async (_: {}, { propertyId }: { propertyId: string }, __: any) => {
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
		queryWorkOrderByCustomer: async (_: {}, { customerId }: { customerId: string }, __: any) => {
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
		getPresignedS3Url: async (_: {}, { imgKey, commandType, altTag }: { imgKey: string; commandType: string; altTag: string }, __: any) => {
			try {
				const preSignedUrl = await getPresignedUrl(imgKey, commandType, altTag);
				if (!preSignedUrl) {
					console.error('Error in getting presigned URL');
					throw new Error('Error in getting presigned URL');
				}
				return preSignedUrl;
			} catch (err: any) {
				throw new Error('Error in getting upload url for s3: ' + err.message);
			}
		},

	Mutation: {
		createUser: async (_: {}, args: any, __: any) => {
			const { firstName, lastName, username, userPassword, adminCode } = args.input;

			if (!firstName || !lastName || !username || !userPassword || !adminCode) {
				throw new Error('All fields must be filled to create a user.');
			} else if (adminCode !== process.env.ADMIN_CODE) {
				throw new Error('Incorrect admin code');
			}

			try {
				await connectToDb();

				const user = await User.create({
					firstName,
					lastName,
					username,
					password: userPassword,
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
		loginUser: async (_: {}, args: any, __: any) => {
			try {
				const { username, userPassword } = args.input;
				await connectToDb();
				if (!username || !userPassword) {
					throw new Error('username and password fields must be filled to log in');
				}

				const user = await User.findOne({ username });
				if (!user?.comparePassword) {
					throw new Error("Can't find user with that username");
				}

				const isPasswordValid = await user.comparePassword(userPassword);

				if (!isPasswordValid) {
					throw new Error('Incorrect Password!');
				}

				const token = signToken(user);
				return { token, user };
			} catch (err: any) {
				throw new Error('Error in logging in user: ' + err.message);
			}
		},
		deleteUser: async (_: {}, args: any, __: any) => {
			try {
				const { username, userPassword } = args.input;
				await connectToDb();
				if (!username) {
					throw new Error('username  fields must be filled to remove');
				}

				const user = await User.findOne({ username });

				if (!user?.comparePassword) {
					throw new Error("Can't find user with that username");
				}

				const isPasswordValid = await user.comparePassword(userPassword);
				if (!isPasswordValid) {
					throw new Error('Incorrect Password!');
				}
				const deletedUser = await User.findOneAndDelete({ username });
				if (!deletedUser) {
					throw new Error('Could not delete user');
				}
				return { token: '', user: deletedUser };
			} catch (err: any) {
				throw new Error('Error in removing in user: ' + err.message);
			}
		},
		createCustomer: async (_: {}, args: any, __: any) => {
			const { customer } = args.input;
			if (!customer) {
				throw new Error('No customer object was presented for creating customer');
			}

			try {
				await connectToDb();

				const newCustomer = await Customer.create(customer);

				if (!newCustomer) {
					throw new Error('Could not create customer');
				}

				return newCustomer;
			} catch (err: any) {
				throw new Error('Error in creating customer: ' + err.message);
			}
		},
		updateCustomer: async (_: {}, args: any, __: any) => {
			const { customerId, customer } = args.input;
			if (!customerId || !customer) {
				throw new Error('No customer object was presented for updating customer');
			}

			try {
				await connectToDb();

				const updatedCustomer = await Customer.findOneAndUpdate({ _id: customerId }, customer, { new: true });

				if (!updatedCustomer) {
					throw new Error('Could not update customer');
				}

				return updatedCustomer;
			} catch (err: any) {
				throw new Error('Error in updating customer: ' + err.message);
			}
		},
		deleteCustomer: async (_: {}, args: any, __: any) => {
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
		createProperty: async (_: {}, args: any, __: any) => {
			const { property } = args.input;
			if (!property) {
				throw new Error('No property object was presented for creating property');
			}

			try {
				await connectToDb();

				const newProperty = await Property.create(property);

				if (!newProperty) {
					throw new Error('Could not create property');
				}

				return newProperty;
			} catch (err: any) {
				throw new Error('Error in creating property: ' + err.message);
			}
		},
		updateProperty: async (_: {}, args: any, __: any) => {
			const { propertyId, property } = args.input;
			if (!propertyId || !property) {
				throw new Error('No property object was presented for updating property');
			}

			try {
				await connectToDb();

				const updatedProperty = await Property.findOneAndUpdate({ _id: propertyId }, property
	
		deleteS3Objects: async (_: {}, args: any, __: any) => {
			const { imgKeys } = args?.input;
			if (!imgKeys || imgKeys.length === 0) {
				throw new Error('No key was presented for deleting object');
			}
			try {
				await connectToDb();

				const response = await deleteS3Objects(imgKeys);

				if (!response) {
					throw new Error('Could not delete object from s3');
				}
				return response;
			} catch (err: any) {
				throw new Error('Error in deleting object from s3: ' + err.message);
			}
		},
	},
};

export default resolvers;
