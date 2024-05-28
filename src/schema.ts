const typeDefs = `#graphql

	# User Types

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

input CreateUserInput {
	firstName: String!
	lastName: String!
	username: String!
	userPassword: String!
	adminCode: String!
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
	agentFirstName: String!
	agentLastName: String!
	businessName: String!
	workOrders: [WorkOrder]
}

input NewCustomerInput {
	agentFirstName: String!
	agentLastName: String!
	businessName: String!
}

input createCustomerInput {
	customer: NewCustomerInput!
}


input UpdateCustomerInput {
	agentFirstName: String
	agentLastName: String
	businessName: String
}

input RemoveCustomerInput {
	customerId: ID!
}


# Property & CRUD Types

type Address {
	street: String!
	unit: String!
	city: String!
	state: String!
	zip: String!
	country: String!

}


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
	propertyAddress: Address!
	propertyDescription: String!
	agent: ID!
}

input createPropertyInput {
	property: NewPropertyInput!
}

input UpdatePropertyInput {
	propertyName: String
	propertyDescription: String
	propertyAddress: Address
	agent: ID
	s3FolderKey: String
}


input RemovePropertyInput {
	propertyId: ID!
}


# Workorder & CRUD Types


type WorkOrder {
	_id: ID!
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


input RemoveWorkOrderInput {
	workOrderIds: [ID!]!
}





type Query {
	getAllUsers: [User!]
	queryCustomers: [Customer!]
	queryCustomerById(customerId: ID!): Customer!
	queryProperties: [Property!]
	queryPropertyById(propertyId: ID!): Property!
	queryWorkOrders: [WorkOrder!]
	queryWorkOrderById(workOrderId: ID!): WorkOrder!
	queryWorkOrdersByCustomer(customerId: ID!): [WorkOrder!]
	queryWorkOrdersByProperty(propertyId: ID!): [WorkOrder!]
	queryBookingsByProperty(propertyId: ID!): [Booking!]
	getPresignedS3Url(imgKey: String!, commandType: String!, altTag: String!): String!

}
type Mutation {
	createUser(input: CreateUserInput!): Auth!
	loginUser(input: LoginUserInput!): Auth!
	removeUser(input: RemoveUserInput!): Auth!
	createCustomer(input: createCustomerInput!): Customer!
	updateCustomer(input: UpdateCustomerInput!): Customer!
	deleteCustomer(input: RemoveCustomerInput!): Customer!
	createProperty(input: createPropertyInput!): Property!
	updateProperty(input: UpdatePropertyInput!): Property!
	deleteProperty(input: RemovePropertyInput!): Property!
	createWorkOrder(input: createWorkOrderInput!): WorkOrder!
	updateWorkOrder(input: UpdateWorkOrderInput!): WorkOrder!
	deleteWorkOrder(input: RemoveWorkOrderInput!): RemoveWorkOrderResponse!
	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
}

`;

export default typeDefs;
