"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql


# AWS S3 Types

type imageObject {
	imgKey: String!
	original: String!
	thumbnail: String!
	originalAlt: String!
	thumbnailAlt: String!
}

type DeleteS3ObjectResponse {
	status: Int!
	message: String!
}

input DeleteS3ObjectInput {
	imgKeys: [String!]!
}

# User & CRUD Types

 type User {
	_id: ID
	firstName: String!
	lastName: String!
	username: String!
	password: String
	pin: String!
}

type Auth {
	token: ID!
	user: User!
}

input CreateUserInput {
	firstName: String!
	lastName: String!
	username: String!
	userPassword: String!
	adminCode: String!
}

input UpdateUserFirstNameInput {
	userId: ID!
	firstName: String!
}

input UpdateUserLastNameInput {
	userId: ID!
	lastName: String!
}

input UpdateUserUsernameInput {
	userId: ID!
	username: String!
}

input UpdateUserPasswordInput {
	userId: ID!
	userPassword: String!
	newPassword: String!
}

input UpdateUserPinInput {
	userId: ID!
	userPassword: String!
	pin: String!
}

input LoginUserInput {
	username: String!
	userPassword: String!
}

input RemoveUserInput {
	username: String!
	userPassword: String!
}

# Customer & CRUD Types


type Customer {
	_id: ID!
	createdAt: String!
	firstName: String!
	lastName: String!
	businessName: String!
	workOrders: [WorkOrder]
}

input NewCustomerInput {
	firstName: String!
	lastName: String!
	businessName: String!
}

input createCustomerInput {
	customer: NewCustomerInput!
}


input UpdateCustomerFirstNameInput {
	customerId: ID!
	firstName: String!
}

input UpdateCustomerLastNameInput {
	customerId: ID!
	lastName: String!
}

input UpdateCustomerBusinessNameInput {
	customerId: ID!
	businessName: String!
}

input RemoveCustomerInput {
	customerId: ID!
}


# Address & CRUD Type

type Address {
	_id: ID!
	street: String!
	unit: String!
	city: String!
	state: String!
	zip: String!
	country: String!

}

input AddressInput {
	street: String!
	unit: String!
	city: String!
	state: String!
	zip: String!
	country: String!
}

# Property & CRUD Types

type Property {
	_id: ID!
	propertyName: String!
	propertyAddress: Address!
	propertyDescription: String!
	agent: Customer!
	s3FolderKey: String! 
}

input NewPropertyInput {
	propertyName: String!
	propertyAddress: AddressInput!
	propertyDescription: String!
	agent: ID!
}

input createPropertyInput {
	property: NewPropertyInput!
}

input updatePropertyNameInput {
	propertyId: ID!
	propertyName: String!
}

input updatePropertyDescriptionInput {
	propertyId: ID!
	propertyDescription: String!
}

input updatePropertyAddressInput {
	propertyId: ID!
	propertyAddress: AddressInput!
}

input updatePropertyAgentInput {
	propertyId: ID!
	agent: ID!
}

input updatePropertyS3FolderKeyInput {
	propertyId: ID!
	s3FolderKey: String!
}

input RemovePropertyInput {
	propertyId: ID!
}


# Workorder & CRUD Types


type WorkOrder {
	_id: ID!
	date: String!
	customerId: Customer!
	propertyId: Property! 
	type: String!
	description: String!
	completedBy: String!
	quote: Float
	total: Float
	charged: Boolean!
	paid: Boolean!
	comments: String
	}


input NewWorkOrderInput {
	date: String!
	customerId: ID!
	propertyId: ID!
	type: String!
	description: String!
	completedBy: String!
	quote: Float
	total: Float
	charged: Boolean!
	paid: Boolean!
	comments: String

}

input createWorkOrderInput {
	workOrder: NewWorkOrderInput!
}

input UpdateWorkOrderInput {
	date: String
	customerId: ID 
	propertyId: ID 
	type: String 
	description: String 
	completedBy: String 
	quote: Float
	total: Float
	charged: Boolean 
	paid: Boolean 
	comments: String
}

input updateWorkOrderDateInput {
	workOrderId: ID!
	date: String!
}

input updateWorkOrderCustomerIdInput {
	workOrderId: ID!
	customerId: ID!
}

input updateWorkOrderPropertyIdInput {
	workOrderId: ID!
	propertyId: ID!
}

input updateWorkOrderTypeInput {
	workOrderId: ID!
	type: String!
}

input updateWorkOrderDescriptionInput {
	workOrderId: ID!
	description: String!
}

input updateWorkOrderCompletedByInput {
	workOrderId: ID!
	completedBy: String!
}

input updateWorkOrderQuoteInput {
	workOrderId: ID!
	quote: Float!
}

input updateWorkOrderTotalInput {
	workOrderId: ID!
	total: Float!
}

input updateWorkOrderChargedInput {
	workOrderId: ID!
	charged: Boolean!
}

input updateWorkOrderPaidInput {
	workOrderId: ID!
	paid: Boolean!
}

input updateWorkOrderCommentsInput {
	workOrderId: ID!
	comments: String!
}



input RemoveWorkOrderInput {
	workOrderIds: [ID!]!
}



# Queries

type Query {

	# User Queries
	getAllUsers: [User!]

	# Customer Queries
	queryCustomers: [Customer!]
	queryCustomerById(customerId: ID!): Customer!

	# Property Queries
	queryProperties: [Property!]
	queryPropertyById(propertyId: ID!): Property!

	# WorkOrder Queries
	queryWorkOrders: [WorkOrder!]
	queryWorkOrderById(workOrderId: ID!): WorkOrder!
	queryWorkOrdersByCustomer(customerId: ID!): [WorkOrder!]
	queryWorkOrdersByProperty(propertyId: ID!): [WorkOrder!]

	# S3 Queries
	getPresignedS3Url(imgKey: String!, commandType: String!, altTag: String!): String!

}

# Mutations


type Mutation {
	# User Mutations
	createUser(input: CreateUserInput!): Auth!
	updateUserFirstName(input: UpdateUserFirstNameInput!): Auth!
	updateUserLastName(input: UpdateUserLastNameInput!): Auth!
	updateUserUsername(input: UpdateUserUsernameInput!): Auth!
	updateUserPassword(input: UpdateUserPasswordInput!): Auth!
	updateUserPin(input: UpdateUserPinInput!): Auth!
	loginUser(input: LoginUserInput!): Auth!
	removeUser(input: RemoveUserInput!): Auth!

	# Customer Mutations
	createCustomer(input: createCustomerInput!): Customer!
	updateCustomerFirstName(input: UpdateCustomerFirstNameInput!): Customer!
	updateCustomerLastName(input: UpdateCustomerLastNameInput!): Customer!
	updateCustomerBusinessName(input: UpdateCustomerBusinessNameInput!): Customer!
	deleteCustomer(input: RemoveCustomerInput!): Customer!


	# Property Mutations
	createProperty(input: createPropertyInput!): Property!
	updatePropertyName(input: updatePropertyNameInput!): Property!
	updatePropertyDescription(input: updatePropertyDescriptionInput!): Property!
	updatePropertyAddress(input: updatePropertyAddressInput!): Property!
	updatePropertyAgent(input: updatePropertyAgentInput!): Property!
	updatePropertyS3FolderKey(input: updatePropertyS3FolderKeyInput!): Property!
	deleteProperty(input: RemovePropertyInput!): Property!

	# WorkOrder Mutations
	createWorkOrder(input: createWorkOrderInput!): WorkOrder!
	updateWorkOrderDate(input: updateWorkOrderDateInput!): WorkOrder!
	updateWorkOrderCustomerId(input: updateWorkOrderCustomerIdInput!): WorkOrder!
	updateWorkOrderPropertyId(input: updateWorkOrderPropertyIdInput!): WorkOrder!
	updateWorkOrderType(input: updateWorkOrderTypeInput!): WorkOrder!
	updateWorkOrderDescription(input: updateWorkOrderDescriptionInput!): WorkOrder!
	updateWorkOrderCompletedBy(input: updateWorkOrderCompletedByInput!): WorkOrder!
	updateWorkOrderQuote(input: updateWorkOrderQuoteInput!): WorkOrder!
	updateWorkOrderTotal(input: updateWorkOrderTotalInput!): WorkOrder!
	updateWorkOrderCharged(input: updateWorkOrderChargedInput!): WorkOrder!
	updateWorkOrderPaid(input: updateWorkOrderPaidInput!): WorkOrder!
	updateWorkOrderComments(input: updateWorkOrderCommentsInput!): WorkOrder!
	deleteWorkOrder(input: RemoveWorkOrderInput!): WorkOrder!

	# S3 Mutations

	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
}

`;
exports.default = typeDefs;
//# sourceMappingURL=schema.js.map