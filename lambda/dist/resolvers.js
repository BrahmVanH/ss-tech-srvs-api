"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const db_1 = require("./connection/db");
const auth_1 = require("./utils/auth");
const helpers_1 = require("./utils/helpers");
// TO_DO: create resolver to create s3 folder for property as soon as property is created
// TO_DO: create resolvers flow to create, update, delete user pin
const resolvers = {
    Query: {
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const allUsers = yield models_1.User.find();
                if (!allUsers) {
                    throw new Error('Error fetching all users from database');
                }
                return allUsers;
            }
            catch (err) {
                console.error({ message: 'error in finding user', details: err });
                throw new Error('Error in finding users: ' + err.message);
            }
        }),
        queryCustomers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const customers = yield models_1.Customer.find();
                if (!customers) {
                    throw new Error('Error fetching all customers from database');
                }
                return customers;
            }
            catch (err) {
                console.error({ message: 'error in finding customers', details: err });
                throw new Error('Error in finding customers: ' + err.message);
            }
        }),
        queryCustomerById: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { customerId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!customerId) {
                    throw new Error('No customer ID was presented for querying customer');
                }
                const customer = yield models_1.Customer.findOne({ _id: customerId });
                if (!customer) {
                    throw new Error('Cannot find customer in database');
                }
                return customer;
            }
            catch (err) {
                console.error({ message: 'error in finding customer', details: err });
                throw new Error('Error in finding customer: ' + err.message);
            }
        }),
        queryProperties: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const properties = yield models_1.Property.find();
                if (!properties) {
                    throw new Error('Error fetching all properties from database');
                }
                return properties;
            }
            catch (err) {
                console.error({ message: 'error in finding properties', details: err });
                throw new Error('Error in finding properties: ' + err.message);
            }
        }),
        queryPropertyById: (_2, _b, __2) => __awaiter(void 0, [_2, _b, __2], void 0, function* (_, { propertyId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!propertyId) {
                    throw new Error('No property ID was presented for querying property');
                }
                const property = yield models_1.Property.findOne({ _id: propertyId });
                if (!property) {
                    throw new Error('Cannot find property in database');
                }
                return property;
            }
            catch (err) {
                console.error({ message: 'error in finding property', details: err });
                throw new Error('Error in finding property: ' + err.message);
            }
        }),
        queryWorkOrders: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const workOrders = yield models_1.WorkOrder.find();
                if (!workOrders) {
                    throw new Error('Error fetching all work orders from database');
                }
                return workOrders;
            }
            catch (err) {
                console.error({ message: 'error in finding work orders', details: err });
                throw new Error('Error in finding work orders: ' + err.message);
            }
        }),
        queryWorkOrdersByProperty: (_3, _c, __3) => __awaiter(void 0, [_3, _c, __3], void 0, function* (_, { propertyId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!propertyId) {
                    throw new Error('No property name was presented for querying work orders');
                }
                const workOrders = yield models_1.WorkOrder.find({ propertyId });
                if (!workOrders) {
                    throw new Error('Cannot find work orders in database');
                }
                return workOrders;
            }
            catch (err) {
                console.error({ message: 'error in finding work orders', details: err });
                throw new Error('Error in finding work orders: ' + err.message);
            }
        }),
        queryWorkOrdersByCustomer: (_4, _d, __4) => __awaiter(void 0, [_4, _d, __4], void 0, function* (_, { customerId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!customerId) {
                    throw new Error('No customer name was presented for querying work orders');
                }
                const workOrders = yield models_1.WorkOrder.find({ customerId });
                if (!workOrders) {
                    throw new Error('Cannot find work orders in database');
                }
                return workOrders;
            }
            catch (err) {
                console.error({ message: 'error in finding work orders', details: err });
                throw new Error('Error in finding work orders: ' + err.message);
            }
        }),
        queryWorkOrderById: (_5, _e, __5) => __awaiter(void 0, [_5, _e, __5], void 0, function* (_, { workOrderId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!workOrderId) {
                    throw new Error('No work order ID was presented for querying work order');
                }
                const workOrder = yield models_1.WorkOrder.findOne({ _id: workOrderId });
                if (!workOrder) {
                    throw new Error('Cannot find work order in database');
                }
                return workOrder;
            }
            catch (err) {
                console.error({ message: 'error in finding work order', details: err });
                throw new Error('Error in finding work order: ' + err.message);
            }
        }),
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
        createUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { firstName, lastName, username, userPassword, adminCode } = args.input;
            if (!firstName || !lastName || !username || !userPassword || !adminCode) {
                throw new Error('All fields must be filled to create a user.');
            }
            else if (adminCode !== process.env.ADMIN_CODE) {
                throw new Error('Incorrect admin code');
            }
            const hashedPassword = yield (0, helpers_1.hashPassword)(userPassword);
            try {
                yield (0, db_1.connectToDb)();
                const user = yield models_1.User.create({
                    firstName,
                    lastName,
                    username,
                    password: hashedPassword,
                });
                if (!user) {
                    throw new Error('There was an error creating user. Try again.');
                }
                const token = (0, auth_1.signToken)(user);
                return { token, user };
            }
            catch (err) {
                throw new Error('Error in creating user: ' + err.message);
            }
        }),
        updateUserFirstName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, firstName } = args.input;
            if (!userId || !firstName) {
                throw new Error('userId and firstName fields must be filled to update user first name');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedUser = yield models_1.User.findOneAndUpdate({ _id: userId }, { firstName }, { new: true });
                if (!updatedUser) {
                    throw new Error('Could not update user first name');
                }
                const token = (0, auth_1.signToken)(updatedUser);
                return { token, user: updatedUser };
            }
            catch (err) {
                throw new Error('Error in updating user first name: ' + err.message);
            }
        }),
        updateUserLastName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, lastName } = args.input;
            if (!userId || !lastName) {
                throw new Error('userId and lastName fields must be filled to update user last name');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedUser = yield models_1.User.findOneAndUpdate({ _id: userId }, { lastName }, { new: true });
                if (!updatedUser) {
                    throw new Error('Could not update user last name');
                }
                const token = (0, auth_1.signToken)(updatedUser);
                return { token, user: updatedUser };
            }
            catch (err) {
                throw new Error('Error in updating user last name: ' + err.message);
            }
        }),
        updateUserUsername: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, username } = args.input;
            if (!userId || !username) {
                throw new Error('userId and username fields must be filled to update user username');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedUser = yield models_1.User.findOneAndUpdate({ _id: userId }, { username }, { new: true });
                if (!updatedUser) {
                    throw new Error('Could not update user username');
                }
                const token = (0, auth_1.signToken)(updatedUser);
                return { token, user: updatedUser };
            }
            catch (err) {
                throw new Error('Error in updating user username: ' + err.message);
            }
        }),
        updateUserPassword: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, userPassword, newPassword } = args.input;
            if (!userId || !userPassword || !newPassword) {
                throw new Error('userId and userPassword fields must be filled to update user password');
            }
            try {
                yield (0, db_1.connectToDb)();
                const user = yield models_1.User.findOne({ _id: userId });
                if (!user) {
                    throw new Error('Could not find user');
                }
                const existingPasswordIsCorrect = yield (0, helpers_1.comparePassword)(userPassword, userPassword);
                if (!existingPasswordIsCorrect) {
                    throw new Error('Incorrect password');
                }
                const updatedUser = yield models_1.User.findOneAndUpdate({ _id: userId }, { password: userPassword }, { new: true });
                if (!updatedUser) {
                    throw new Error('Could not update user password');
                }
                const token = (0, auth_1.signToken)(updatedUser);
                return { token, user: updatedUser };
            }
            catch (err) {
                throw new Error('Error in updating user password: ' + err.message);
            }
        }),
        updateUserPin: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, pin, userPassword } = args.input;
            if (!userId || !pin || !userPassword) {
                throw new Error('userId, pin, and password fields must be filled to update user pin');
            }
            try {
                yield (0, db_1.connectToDb)();
                const user = yield models_1.User.findOne({ _id: userId });
                if (!user) {
                    throw new Error('Could not find user');
                }
                const existingPasswordIsCorrect = yield (0, helpers_1.comparePassword)(userPassword, userPassword);
                if (!existingPasswordIsCorrect) {
                    throw new Error('Incorrect password');
                }
                const updatedUser = yield models_1.User.findOneAndUpdate({ _id: userId }, { pin }, { new: true });
                if (!updatedUser) {
                    throw new Error('Could not update user pin');
                }
                const token = (0, auth_1.signToken)(updatedUser);
                return { token, user: updatedUser };
            }
            catch (err) {
                throw new Error('Error in updating user pin: ' + err.message);
            }
        }),
        loginUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, userPassword } = args.input;
            try {
                yield (0, db_1.connectToDb)();
                if (!username || !userPassword) {
                    throw new Error('username and password fields must be filled to log in');
                }
                const user = yield models_1.User.findOne({ username });
                if (!user) {
                    throw new Error('Could not find user');
                }
                const existingPasswordIsCorrect = yield (0, helpers_1.comparePassword)(userPassword, userPassword);
                if (!existingPasswordIsCorrect) {
                    throw new Error('Incorrect password');
                }
                const token = (0, auth_1.signToken)(user);
                return { token, user };
            }
            catch (err) {
                throw new Error('Error in logging in user: ' + err.message);
            }
        }),
        removeUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, userPassword } = args.input;
            try {
                yield (0, db_1.connectToDb)();
                if (!username) {
                    throw new Error('username  fields must be filled to remove');
                }
                const user = yield models_1.User.findOne({ username });
                if (!user) {
                    throw new Error('Could not find user');
                }
                const existingPasswordIsCorrect = yield (0, helpers_1.comparePassword)(userPassword, userPassword);
                if (!existingPasswordIsCorrect) {
                    throw new Error('Incorrect password');
                }
                const deletedUser = yield models_1.User.findOneAndDelete({ username });
                if (!deletedUser) {
                    throw new Error('Could not delete user');
                }
                const token = (0, auth_1.signToken)(deletedUser);
                return { token, user: deletedUser };
            }
            catch (err) {
                throw new Error('Error in removing in user: ' + err.message);
            }
        }),
        createCustomer: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { customer } = args.input;
            if (!customer) {
                throw new Error('No customer object was presented for creating customer');
            }
            try {
                yield (0, db_1.connectToDb)();
                const newCustomer = yield models_1.Customer.create(customer);
                if (!newCustomer) {
                    throw new Error('Could not create customer');
                }
                return newCustomer;
            }
            catch (err) {
                throw new Error('Error in creating customer: ' + err.message);
            }
        }),
        updateCustomerFirstName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { customerId, firstName } = args.input;
            if (!customerId || !firstName) {
                throw new Error('customerId and firstName fields must be filled to update customer first name');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedCustomer = yield models_1.Customer.findOneAndUpdate({ _id: customerId }, { firstName }, { new: true });
                if (!updatedCustomer) {
                    throw new Error('Could not update customer first name');
                }
                return updatedCustomer;
            }
            catch (err) {
                throw new Error('Error in updating customer first name: ' + err.message);
            }
        }),
        updateCustomerLastName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { customerId, lastName } = args.input;
            if (!customerId || !lastName) {
                throw new Error('customerId and lastName fields must be filled to update customer last name');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedCustomer = yield models_1.Customer.findOneAndUpdate({ _id: customerId }, { lastName }, { new: true });
                if (!updatedCustomer) {
                    throw new Error('Could not update customer last name');
                }
                return updatedCustomer;
            }
            catch (err) {
                throw new Error('Error in updating customer last name: ' + err.message);
            }
        }),
        updateCustomerBusinessName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { customerId, businessName } = args.input;
            if (!customerId || !businessName) {
                throw new Error('customerId and businessName fields must be filled to update customer business name');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedCustomer = yield models_1.Customer.findOneAndUpdate({ _id: customerId }, { businessName }, { new: true });
                if (!updatedCustomer) {
                    throw new Error('Could not update customer business name');
                }
                return updatedCustomer;
            }
            catch (err) {
                throw new Error('Error in updating customer business name: ' + err.message);
            }
        }),
        deleteCustomer: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { customerId } = args.input;
            if (!customerId) {
                throw new Error('No customer ID was presented for deleting customer');
            }
            try {
                yield (0, db_1.connectToDb)();
                const deletedCustomer = yield models_1.Customer.findOneAndDelete({ _id: customerId });
                if (!deletedCustomer) {
                    throw new Error('Could not delete customer');
                }
                return deletedCustomer;
            }
            catch (err) {
                throw new Error('Error in deleting customer: ' + err.message);
            }
        }),
        createProperty: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { property } = args.input;
            if (!property) {
                throw new Error('No property object was presented for creating property');
            }
            try {
                yield (0, db_1.connectToDb)();
                const newProperty = yield models_1.Property.create(property);
                if (!newProperty) {
                    throw new Error('Could not create property');
                }
                return newProperty;
            }
            catch (err) {
                throw new Error('Error in creating property: ' + err.message);
            }
        }),
        updatePropertyDescription: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { propertyId, propertyDescription } = args.input;
            if (!propertyId || !propertyDescription) {
                throw new Error('propertyId and propertyDescription fields must be filled to update property description');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedProperty = yield models_1.Property.findOneAndUpdate({ _id: propertyId }, { propertyDescription }, { new: true });
                if (!updatedProperty) {
                    throw new Error('Could not update property description');
                }
                return updatedProperty;
            }
            catch (err) {
                throw new Error('Error in updating property description: ' + err.message);
            }
        }),
        updatePropertyAddress: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { propertyId, propertyAddress } = args.input;
            if (!propertyId || !propertyAddress) {
                throw new Error('propertyId and propertyAddress fields must be filled to update property address');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedProperty = yield models_1.Property.findOneAndUpdate({ _id: propertyId }, { propertyAddress }, { new: true });
                if (!updatedProperty) {
                    throw new Error('Could not update property address');
                }
                return updatedProperty;
            }
            catch (err) {
                throw new Error('Error in updating property address: ' + err.message);
            }
        }),
        updatePropertyAgent: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { propertyId, agent } = args.input;
            if (!propertyId || !agent) {
                throw new Error('propertyId and agent fields must be filled to update property agent');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedProperty = yield models_1.Property.findOneAndUpdate({ _id: propertyId }, { agent }, { new: true });
                if (!updatedProperty) {
                    throw new Error('Could not update property agent');
                }
                return updatedProperty;
            }
            catch (err) {
                throw new Error('Error in updating property agent: ' + err.message);
            }
        }),
        updatePropertyS3FolderKey: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { propertyId, s3FolderKey } = args.input;
            if (!propertyId || !s3FolderKey) {
                throw new Error('propertyId and s3FolderKey fields must be filled to update property s3FolderKey');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedProperty = yield models_1.Property.findOneAndUpdate({ _id: propertyId }, { s3FolderKey }, { new: true });
                if (!updatedProperty) {
                    throw new Error('Could not update property s3FolderKey');
                }
                return updatedProperty;
            }
            catch (err) {
                throw new Error('Error in updating property s3FolderKey: ' + err.message);
            }
        }),
        createWorkOrder: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrder } = args.input;
            if (!workOrder) {
                throw new Error('No work order object was presented for creating work order');
            }
            try {
                yield (0, db_1.connectToDb)();
                const newWorkOrder = yield models_1.WorkOrder.create(workOrder);
                if (!newWorkOrder) {
                    throw new Error('Could not create work order');
                }
                return newWorkOrder;
            }
            catch (err) {
                throw new Error('Error in creating work order: ' + err.message);
            }
        }),
        updateWorkOrderDate: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, date } = args.input;
            if (!workOrderId || !date) {
                throw new Error('workOrderId and date fields must be filled to update work order date');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { date }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order date');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order date: ' + err.message);
            }
        }),
        updateWorkOrderCustomerId: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, customerId } = args.input;
            if (!workOrderId || !customerId) {
                throw new Error('workOrderId and customerId fields must be filled to update work order customer ID');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { customerId }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order customer ID');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order customer ID: ' + err.message);
            }
        }),
        updateWorkOrderPropertyId: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, propertyId } = args.input;
            if (!workOrderId || !propertyId) {
                throw new Error('workOrderId and propertyId fields must be filled to update work order property ID');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { propertyId }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order property ID');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order property ID: ' + err.message);
            }
        }),
        updateWorkOrderType: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, type } = args.input;
            if (!workOrderId || !type) {
                throw new Error('workOrderId and type fields must be filled to update work order type');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { type }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order type');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order type: ' + err.message);
            }
        }),
        updateWorkOrderDescription: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, description } = args.input;
            if (!workOrderId || !description) {
                throw new Error('workOrderId and description fields must be filled to update work order description');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { description }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order description');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order description: ' + err.message);
            }
        }),
        updateWorkOrderCompletedBy: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, completedBy } = args.input;
            if (!workOrderId || !completedBy) {
                throw new Error('workOrderId and completedBy fields must be filled to update work order completed by');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { completedBy }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order completed by');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order completed by: ' + err.message);
            }
        }),
        updateWorkOrderQuote: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, quote } = args.input;
            if (!workOrderId || !quote) {
                throw new Error('workOrderId and quote fields must be filled to update work order quote');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { quote }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order quote');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order quote: ' + err.message);
            }
        }),
        updateWorkOrderTotal: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, total } = args.input;
            if (!workOrderId || !total) {
                throw new Error('workOrderId and total fields must be filled to update work order total');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { total }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order total');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order total: ' + err.message);
            }
        }),
        updateWorkOrderCharged: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, charged } = args.input;
            if (!workOrderId || charged === undefined) {
                throw new Error('workOrderId and charged fields must be filled to update work order charged');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { charged }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order charged');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order charged: ' + err.message);
            }
        }),
        updateWorkOrderPaid: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, paid } = args.input;
            if (!workOrderId || paid === undefined) {
                throw new Error('workOrderId and paid fields must be filled to update work order paid');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { paid }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order paid');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order paid: ' + err.message);
            }
        }),
        updateWorkOrderComments: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId, comments } = args.input;
            if (!workOrderId || !comments) {
                throw new Error('workOrderId and comments fields must be filled to update work order comments');
            }
            try {
                yield (0, db_1.connectToDb)();
                const updatedWorkOrder = yield models_1.WorkOrder.findOneAndUpdate({ _id: workOrderId }, { comments }, { new: true });
                if (!updatedWorkOrder) {
                    throw new Error('Could not update work order comments');
                }
                return updatedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in updating work order comments: ' + err.message);
            }
        }),
        deleteWorkOrder: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { workOrderId } = args.input;
            if (!workOrderId) {
                throw new Error('No work order ID was presented for deleting work order');
            }
            try {
                yield (0, db_1.connectToDb)();
                const deletedWorkOrder = yield models_1.WorkOrder.findOneAndDelete({ _id: workOrderId });
                if (!deletedWorkOrder) {
                    throw new Error('Could not delete work order');
                }
                return deletedWorkOrder;
            }
            catch (err) {
                throw new Error('Error in deleting work order: ' + err.message);
            }
        }),
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
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map