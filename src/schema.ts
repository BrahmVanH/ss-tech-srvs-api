const typeDefs = `#graphql


scalar Buffer

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
	createdAt: String
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

# Expense & CRUD Types

type Expense {
	_id: ID!
	date: String!
	amount: Float!
	payee: String!
	category: String!
	description: String!

}

input CreateExpenseInput {
	amount: Float!
	payee: String!
	category: String!
	description: String!
}

input UpdateExpenseDateInput {
	expenseId: ID!
	date: String!
}

input UpdateExpenseAmountInput {
	expenseId: ID!
	amount: Float!
}

input UpdateExpenseDescriptionInput {
	expenseId: ID!
	description: String!
}

input UpdateExpensePayeeInput {
	expenseId: ID!
	payee: String!
}

input UpdateExpenseCategoryInput {
	expenseId: ID!
	category: String!
}

input DeleteExpenseInput {
	expenseId: ID!
}

# Customer & CRUD Types


type Customer {
	_id: ID!
	createdAt: String
	updatedAt: String
	firstName: String!
	lastName: String!
	address: Address!
	email: String!
	phone: String!
	businessName: String!
	workOrders: [WorkOrder]!
	invoices: [Invoice]!
	properties: [Property]!
}



input CreateCustomerInput {
	firstName: String!
	lastName: String!
	email: String
	phone: String!
	businessName: String!
	address: AddressInput!
}


input UpdateCustomerFirstNameInput {
	customerId: ID!
	firstName: String!
}

input UpdateCustomerLastNameInput {
	customerId: ID!
	lastName: String!
}

input UpdateCustomerAddressInput {
	customerId: ID!
	address: AddressInput!
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
	createdAt: String
	updatedAt: String
	date: String!
	customerId: Customer!
	workOrders: [WorkOrder]!
	quote: Float!
	total: Float!
	charged: Boolean!
	paid: Boolean!
	materialsCost: Float!
	materialsCostDescription: String!
	comments: String!
	laborItems: [LaborItem]!
	

}

type LaborItem {
	laborCost: Float!
	laborCostDescription: String!
}





input CreateInvoiceInput {
	date: String!
	invoiceNumber: String
	customerId: ID!
	workOrders: [ID]
	quote: Float
	total: Float
	charged: Boolean!
	paid: Boolean!
	materialsCost: Float!
	materialsCostDescription: String!
	comments: String!
	laborItems: [LaborItemInput!]!
}

input LaborItemInput {
	laborCost: Float!
	laborCostDescription: String!
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

input UpdateInvoiceMaterialsCostInput {
	invoiceId: ID!
	updatedCost: Float! 
}

input UpdateInvoiceMaterialsCostDescriptionInput {
	invoiceId: ID!
	description: String!
}

input UpdateInvoiceCommentsInput {
	invoiceId: ID!
	comments: String!
}

input UpdateInvoiceLaborCostInput {
	invoiceId: ID!
	updatedCost: Float!
}

input UpdateInvoiceLaborCostDescriptionInput {
	invoiceId: ID!
	description: String!
}

input CreateInvoicePdfInput {
	invoiceId: ID!
}

input RemoveInvoiceInput {
	invoiceId: ID!
}




# Address & CRUD Type

type Address {
	_id: ID!
	createdAt: String
	updatedAt: String
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
	createdAt: String
	updatedAt: String
	propertyName: String!
	propertyAddress: Address!
	propertyDescription: String!
	agent: Customer!
	s3FolderKey: String! 
}



input CreatePropertyInput {
	propertyName: String!
	propertyAddress: AddressInput!
	propertyDescription: String!
	agent: ID!
	s3FolderKey: String
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
	completed: Boolean!
	completedBy: String!
	quote: Float!
	total: Float!
	charged: Boolean!
	paid: Boolean!
	comments: String!
	updatedAt: String
	laborItems: [LaborItem]
	}




input CreateWorkOrderInput {
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
	laborItems: [LaborItemInput]
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

input UpdateWorkOrderCompletedInput {
	workOrderId: ID!
	completed: Boolean!
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

input UpdateWorkOrderLaborItemsInput {
	workOrderId: ID!
	laborItems: [LaborItemInput!]!
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

# Schedule Services & CRUD Types

type ScheduleServiceMessage {
	givenName: String!
	familyName: String!
	tel: String!
	email: String!
	location: String!
	service: String!
	message: String!
}

input ScheduleServiceMessageInput {
	givenName: String! @constraint(minLength: 1, maxLength: 20)
	familyName: String! @constraint(minLength: 1, maxLength: 20)
	tel: String! @constraint(minLength: 1, maxLength: 12)
	email: String! @constraint(format: "email", maxLength: 255)
	location: String! @constraint(minLength: 1, maxLength: 10)
	service: String! @constraint(minLength: 1, maxLength: 40)
	message: String! @constraint(pattern: "[A-Za-z0-9 _.,!'/$]*", minLength: 10, maxLength: 255)
}

# Queries

type Query {

	# User Queries
	getAllUsers: [User!]

	# Expense Queries
	queryExpenses: [Expense!]
	queryExpenseById(expenseId: ID!): Expense!

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

	# Annual Book Keeping Queries
	GetAnnualExpenseCsv: Buffer!
	GetAnnualIncomeCsv: Buffer!

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

	# Expense Mutations
	createExpense(input: CreateExpenseInput!): Expense!
	updateExpenseAmount(input: UpdateExpenseAmountInput!): Expense!
	updateExpenseDescription(input: UpdateExpenseDescriptionInput!): Expense!
	updateExpenseDate(input: UpdateExpenseDateInput!): Expense!
	updateExpensePayee(input: UpdateExpensePayeeInput!): Expense!
	updateExpenseCategory(input: UpdateExpenseCategoryInput!): Expense!
	
	deleteExpense(input: DeleteExpenseInput!): Expense!

	# Customer Mutations
	createCustomer(input: CreateCustomerInput!): Customer!
	updateCustomerFirstName(input: UpdateCustomerFirstNameInput!): Customer!
	updateCustomerLastName(input: UpdateCustomerLastNameInput!): Customer!
	updateCustomerAddress(input: UpdateCustomerAddressInput!): Customer!
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
	updateWorkOrderCompleted(input: UpdateWorkOrderCompletedInput!): WorkOrder!
	updateWorkOrderCompletedBy(input: UpdateWorkOrderCompletedByInput!): WorkOrder!
	updateWorkOrderQuote(input: UpdateWorkOrderQuoteInput!): WorkOrder!
	updateWorkOrderTotal(input: UpdateWorkOrderTotalInput!): WorkOrder!
	updateWorkOrderCharged(input: UpdateWorkOrderChargedInput!): WorkOrder!
	updateWorkOrderPaid(input: UpdateWorkOrderPaidInput!): WorkOrder!
	updateWorkOrderComments(input: UpdateWorkOrderCommentsInput!): WorkOrder!
	updateWorkOrderLaborItems(input: UpdateWorkOrderLaborItemsInput!): WorkOrder!
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
	updateInvoiceMaterialsCost(input: UpdateInvoiceMaterialsCostInput!): Invoice!
	updateInvoiceMaterialsCostDescription(input: UpdateInvoiceMaterialsCostDescriptionInput!): Invoice!
	updateInvoiceLaborCost(input: UpdateInvoiceLaborCostInput!): Invoice!
	updateInvoiceLaborCostDescription(input: UpdateInvoiceLaborCostDescriptionInput!): Invoice!
	updateInvoiceComments(input: UpdateInvoiceCommentsInput!): Invoice!
	createInvoicePdf(input: CreateInvoicePdfInput!): Buffer!
	sendInvoiceEmail(input: CreateInvoicePdfInput!): Buffer!
	deleteInvoice(input: RemoveInvoiceInput!): Invoice!

	# Schedule Service Mutations
	sendScheduleServiceMessage(input: ScheduleServiceMessageInput!): String!


	# S3 Mutations

	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
}

`;

export default typeDefs;
