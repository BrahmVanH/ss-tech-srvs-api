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
	email: String!
	phone: String!
	businessName: String!
	workOrders: [WorkOrder]!
	invoices: [Invoice]!
	properties: [Property]!
}

input NewCustomerInput {
	firstName: String!
	lastName: String!
	email: String
	phone: String!
	businessName: String!
}

input CreateCustomerInput {
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

input UpdateCustomerEmailInput {
	customerId: ID!
	email: String!
}

input UpdateCustomerPhoneInput {
	customerId: ID!
	phone: String!
}

input UpdateCustomerInvoicesInput {
	customerId: ID!
	invoice: ID
}

input UpdateCustomerBusinessNameInput {
	customerId: ID!
	businessName: String!
}

input UpdateCustomerPropertiesInput {
	customerId: ID!
	property: ID
}

input RemoveCustomerInput {
	customerId: ID!
}

# Invoices & CRUD Types

type Invoice {
	_id: ID!
	invoiceNumber: String!
	date: String!
	customerId: Customer!
	workOrders: [WorkOrder]!
	quote: Float!
	total: Float!
	charged: Boolean!
	paid: Boolean!
}

input NewInvoiceInput {
	date: String!
	invoiceNumber: String!
	customerId: ID!
	workOrders: [ID]
	quote: Float
	total: Float
	charged: Boolean!
	paid: Boolean!
}

input CreateInvoiceInput {
	invoice: NewInvoiceInput!
}

input UpdateInvoiceDateInput {
	invoiceId: ID!
	date: String!
}

input UpdateInvoiceCustomerIdInput {
	invoiceId: ID!
	customerId: ID!
}

input UpdateInvoiceWorkOrdersInput {
	invoiceId: ID!
	workOrders: [ID!]!
}

input UpdateInvoiceTotalInput {
	invoiceId: ID!
	total: Float!
}

input UpdateInvoiceChargedInput {
	invoiceId: ID!
	charged: Boolean!
}

input UpdateInvoicePaidInput {
	invoiceId: ID!
	paid: Boolean!
}

input UpdateInvoiceQuoteInput {
	invoiceId: ID!
	quote: Float!
}

input RemoveInvoiceInput {
	invoiceId: ID!
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
	s3FolderKey: String
}

input CreatePropertyInput {
	property: NewPropertyInput!
}

input UpdatePropertyNameInput {
	propertyId: ID!
	propertyName: String!
}

input UpdatePropertyDescriptionInput {
	propertyId: ID!
	propertyDescription: String!
}

input UpdatePropertyAddressInput {
	propertyId: ID!
	propertyAddress: AddressInput!
}

input UpdatePropertyAgentInput {
	propertyId: ID!
	agent: ID!
}

input UpdatePropertyS3FolderKeyInput {
	propertyId: ID!
	s3FolderKey: String!
}

input RemovePropertyInput {
	propertyId: ID!
}


# Work Order & CRUD Types


type WorkOrder {
	_id: ID!
	date: String!
	lastUpdated: String!
	customerId: Customer!
	propertyId: Property!
	invoices: [Invoice]!
	type: String!
	description: String!
	completedBy: String!
	quote: Float!
	total: Float!
	charged: Boolean!
	paid: Boolean!
	comments: String!
	}


input NewWorkOrderInput {
	date: String!
	customerId: ID!
	propertyId: ID!
	type: String!
	description: String!
	completedBy: String
	quote: Float
	total: Float
	charged: Boolean!
	paid: Boolean!
	comments: String

}

input CreateWorkOrderInput {
	workOrder: NewWorkOrderInput!
}

input UpdateWorkOrderDateInput {
	workOrderId: ID!
	date: String!
}

input UpdateWorkOrderCustomerIdInput {
	workOrderId: ID!
	customerId: ID!
}

input UpdateWorkOrderPropertyIdInput {
	workOrderId: ID!
	propertyId: ID!
}

input UpdateWorkOrderInvoicesInput {
	workOrderId: ID!
	invoice: ID
}

input UpdateWorkOrderTypeInput {
	workOrderId: ID!
	type: String!
}

input UpdateWorkOrderDescriptionInput {
	workOrderId: ID!
	description: String!
}

input UpdateWorkOrderCompletedByInput {
	workOrderId: ID!
	completedBy: String!
}

input UpdateWorkOrderQuoteInput {
	workOrderId: ID!
	quote: Float!
}

input UpdateWorkOrderTotalInput {
	workOrderId: ID!
	total: Float!
}

input UpdateWorkOrderChargedInput {
	workOrderId: ID!
	charged: Boolean!
}

input UpdateWorkOrderPaidInput {
	workOrderId: ID!
	paid: Boolean!
}

input UpdateWorkOrderCommentsInput {
	workOrderId: ID!
	comments: String!
}



input RemoveWorkOrderInput {
	workOrderId: ID!
}

# Thumbtack Review Types 

type ThumbtackReviewAuthor {
	name: String!
}

type ThumbtackReviewRating {
	
	ratingValue: Int!
}

type ThumbtackReview {
	
	datePublished: String!
	description: String!
	author: ThumbtackReviewAuthor!
	reviewRating: ThumbtackReviewRating!
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

	# Invoice Queries
	queryInvoices: [Invoice!]
	queryInvoiceById(invoiceId: ID!): Invoice!
	queryInvoicesByCustomer(customerId: ID!): [Invoice!]
	queryInvoicesByWorkOrder(workOrderId: ID!): [Invoice!]


	# S3 Queries
	getPresignedS3Url(imgKey: String!, commandType: String!, altTag: String!): String!

	# Thumbtack Review Queries
	queryThumbtackReviews: [ThumbtackReview!]

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
	createCustomer(input: CreateCustomerInput!): Customer!
	updateCustomerFirstName(input: UpdateCustomerFirstNameInput!): Customer!
	updateCustomerLastName(input: UpdateCustomerLastNameInput!): Customer!
	updateCustomerEmail(input: UpdateCustomerEmailInput!): Customer!
	updateCustomerPhone(input: UpdateCustomerPhoneInput!): Customer!
	updateCustomerBusinessName(input: UpdateCustomerBusinessNameInput!): Customer!
	updateCustomerProperties(input: UpdateCustomerPropertiesInput!): Customer!
	deleteCustomer(input: RemoveCustomerInput!): Customer!


	# Property Mutations
	createProperty(input: CreatePropertyInput!): Property!
	updatePropertyName(input: UpdatePropertyNameInput!): Property!
	updatePropertyDescription(input: UpdatePropertyDescriptionInput!): Property!
	updatePropertyAddress(input: UpdatePropertyAddressInput!): Property!
	updatePropertyAgent(input: UpdatePropertyAgentInput!): Property!
	updatePropertyS3FolderKey(input: UpdatePropertyS3FolderKeyInput!): Property!
	deleteProperty(input: RemovePropertyInput!): Property!

	# WorkOrder Mutations
	createWorkOrder(input: CreateWorkOrderInput!): WorkOrder!
	updateWorkOrderDate(input: UpdateWorkOrderDateInput!): WorkOrder!
	updateWorkOrderCustomerId(input: UpdateWorkOrderCustomerIdInput!): WorkOrder!
	updateWorkOrderPropertyId(input: UpdateWorkOrderPropertyIdInput!): WorkOrder!
	updateWorkOrderType(input: UpdateWorkOrderTypeInput!): WorkOrder!
	updateWorkOrderDescription(input: UpdateWorkOrderDescriptionInput!): WorkOrder!
	updateWorkOrderCompletedBy(input: UpdateWorkOrderCompletedByInput!): WorkOrder!
	updateWorkOrderQuote(input: UpdateWorkOrderQuoteInput!): WorkOrder!
	updateWorkOrderTotal(input: UpdateWorkOrderTotalInput!): WorkOrder!
	updateWorkOrderCharged(input: UpdateWorkOrderChargedInput!): WorkOrder!
	updateWorkOrderPaid(input: UpdateWorkOrderPaidInput!): WorkOrder!
	updateWorkOrderComments(input: UpdateWorkOrderCommentsInput!): WorkOrder!
	deleteWorkOrder(input: RemoveWorkOrderInput!): WorkOrder!

	# Invoice Mutations
	createInvoice(input: CreateInvoiceInput!): Invoice!
	updateInvoiceDate(input: UpdateInvoiceDateInput!): Invoice!
	updateInvoiceCustomerId(input: UpdateInvoiceCustomerIdInput!): Invoice!
	updateInvoiceWorkOrders(input: UpdateInvoiceWorkOrdersInput!): Invoice!
	updateInvoiceQuote(input: UpdateInvoiceQuoteInput!): Invoice!
	updateInvoiceTotal(input: UpdateInvoiceTotalInput!): Invoice!
	updateInvoiceCharged(input: UpdateInvoiceChargedInput!): Invoice!
	updateInvoicePaid(input: UpdateInvoicePaidInput!): Invoice!
	deleteInvoice(input: RemoveInvoiceInput!): Invoice!
	

	# S3 Mutations

	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
}

`;

export default typeDefs;
