import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Buffer: { input: any; output: any; }
  Date: { input: any; output: any; }
  email_String_NotNull_maxLength_255_format_email: { input: any; output: any; }
  familyName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  givenName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  location_String_NotNull_minLength_1_maxLength_10: { input: any; output: any; }
  message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_: { input: any; output: any; }
  service_String_NotNull_minLength_1_maxLength_40: { input: any; output: any; }
  tel_String_NotNull_minLength_1_maxLength_12: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  _id: Scalars['ID']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  zip: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  unit: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user: User;
};

export type CreateCustomerInput = {
  address: AddressInput;
  businessName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  payee: Scalars['String']['input'];
};

export type CreateInvoiceInput = {
  charged: Scalars['Boolean']['input'];
  comments: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  laborItems: Array<LaborItemInput>;
  materialsCost: Scalars['Float']['input'];
  materialsCostDescription: Scalars['String']['input'];
  paid: Scalars['Boolean']['input'];
  quote?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  workOrders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateInvoicePdfInput = {
  invoiceId: Scalars['ID']['input'];
};

export type CreatePropertyInput = {
  agent: Scalars['ID']['input'];
  propertyAddress: AddressInput;
  propertyDescription: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
  s3FolderKey?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWorkOrderInput = {
  charged: Scalars['Boolean']['input'];
  comments?: InputMaybe<Scalars['String']['input']>;
  completedBy?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  laborItems?: InputMaybe<Array<InputMaybe<LaborItemInput>>>;
  paid: Scalars['Boolean']['input'];
  propertyId: Scalars['ID']['input'];
  quote?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  _id: Scalars['ID']['output'];
  address: Address;
  businessName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  invoices: Array<Maybe<Invoice>>;
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  properties: Array<Maybe<Property>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workOrders: Array<Maybe<WorkOrder>>;
};

export type DeleteExpenseInput = {
  expenseId: Scalars['ID']['input'];
};

export type DeleteS3ObjectInput = {
  imgKeys: Array<Scalars['String']['input']>;
};

export type DeleteS3ObjectResponse = {
  __typename?: 'DeleteS3ObjectResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  payee: Scalars['String']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  _id: Scalars['ID']['output'];
  charged: Scalars['Boolean']['output'];
  comments: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  customerId: Customer;
  date: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  laborItems: Array<Maybe<LaborItem>>;
  materialsCost: Scalars['Float']['output'];
  materialsCostDescription: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  quote: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  workOrders: Array<Maybe<WorkOrder>>;
};

export type LaborItem = {
  __typename?: 'LaborItem';
  laborCost: Scalars['Float']['output'];
  laborCostDescription: Scalars['String']['output'];
};

export type LaborItemInput = {
  laborCost: Scalars['Float']['input'];
  laborCostDescription: Scalars['String']['input'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Customer;
  createExpense: Expense;
  createInvoice: Invoice;
  createInvoicePdf: Scalars['Buffer']['output'];
  createProperty: Property;
  createUser: Auth;
  createWorkOrder: WorkOrder;
  deleteCustomer: Customer;
  deleteExpense: Expense;
  deleteInvoice: Invoice;
  deleteProperty: Property;
  deleteS3Objects: DeleteS3ObjectResponse;
  deleteWorkOrder: WorkOrder;
  loginUser: Auth;
  removeUser: Auth;
  sendInvoiceEmail: Scalars['Buffer']['output'];
  sendScheduleServiceMessage: Scalars['String']['output'];
  updateCustomerAddress: Customer;
  updateCustomerBusinessName: Customer;
  updateCustomerEmail: Customer;
  updateCustomerFirstName: Customer;
  updateCustomerLastName: Customer;
  updateCustomerPhone: Customer;
  updateCustomerProperties: Customer;
  updateExpenseAmount: Expense;
  updateExpenseCategory: Expense;
  updateExpenseDate: Expense;
  updateExpenseDescription: Expense;
  updateExpensePayee: Expense;
  updateInvoiceCharged: Invoice;
  updateInvoiceComments: Invoice;
  updateInvoiceCustomerId: Invoice;
  updateInvoiceDate: Invoice;
  updateInvoiceLaborCost: Invoice;
  updateInvoiceLaborCostDescription: Invoice;
  updateInvoiceMaterialsCost: Invoice;
  updateInvoiceMaterialsCostDescription: Invoice;
  updateInvoicePaid: Invoice;
  updateInvoiceQuote: Invoice;
  updateInvoiceTotal: Invoice;
  updateInvoiceWorkOrders: Invoice;
  updatePropertyAddress: Property;
  updatePropertyAgent: Property;
  updatePropertyDescription: Property;
  updatePropertyName: Property;
  updatePropertyS3FolderKey: Property;
  updateUserFirstName: Auth;
  updateUserLastName: Auth;
  updateUserPassword: Auth;
  updateUserPin: Auth;
  updateUserUsername: Auth;
  updateWorkOrderCharged: WorkOrder;
  updateWorkOrderComments: WorkOrder;
  updateWorkOrderCompleted: WorkOrder;
  updateWorkOrderCompletedBy: WorkOrder;
  updateWorkOrderCustomerId: WorkOrder;
  updateWorkOrderDate: WorkOrder;
  updateWorkOrderDescription: WorkOrder;
  updateWorkOrderLaborItems: WorkOrder;
  updateWorkOrderPaid: WorkOrder;
  updateWorkOrderPropertyId: WorkOrder;
  updateWorkOrderQuote: WorkOrder;
  updateWorkOrderTotal: WorkOrder;
  updateWorkOrderType: WorkOrder;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateExpenseArgs = {
  input: CreateExpenseInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateInvoicePdfArgs = {
  input: CreateInvoicePdfInput;
};


export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkOrderArgs = {
  input: CreateWorkOrderInput;
};


export type MutationDeleteCustomerArgs = {
  input: RemoveCustomerInput;
};


export type MutationDeleteExpenseArgs = {
  input: DeleteExpenseInput;
};


export type MutationDeleteInvoiceArgs = {
  input: RemoveInvoiceInput;
};


export type MutationDeletePropertyArgs = {
  input: RemovePropertyInput;
};


export type MutationDeleteS3ObjectsArgs = {
  input: DeleteS3ObjectInput;
};


export type MutationDeleteWorkOrderArgs = {
  input: RemoveWorkOrderInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput;
};


export type MutationSendInvoiceEmailArgs = {
  input: CreateInvoicePdfInput;
};


export type MutationSendScheduleServiceMessageArgs = {
  input: ScheduleServiceMessageInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateCustomerAddressInput;
};


export type MutationUpdateCustomerBusinessNameArgs = {
  input: UpdateCustomerBusinessNameInput;
};


export type MutationUpdateCustomerEmailArgs = {
  input: UpdateCustomerEmailInput;
};


export type MutationUpdateCustomerFirstNameArgs = {
  input: UpdateCustomerFirstNameInput;
};


export type MutationUpdateCustomerLastNameArgs = {
  input: UpdateCustomerLastNameInput;
};


export type MutationUpdateCustomerPhoneArgs = {
  input: UpdateCustomerPhoneInput;
};


export type MutationUpdateCustomerPropertiesArgs = {
  input: UpdateCustomerPropertiesInput;
};


export type MutationUpdateExpenseAmountArgs = {
  input: UpdateExpenseAmountInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  input: UpdateExpenseCategoryInput;
};


export type MutationUpdateExpenseDateArgs = {
  input: UpdateExpenseDateInput;
};


export type MutationUpdateExpenseDescriptionArgs = {
  input: UpdateExpenseDescriptionInput;
};


export type MutationUpdateExpensePayeeArgs = {
  input: UpdateExpensePayeeInput;
};


export type MutationUpdateInvoiceChargedArgs = {
  input: UpdateInvoiceChargedInput;
};


export type MutationUpdateInvoiceCommentsArgs = {
  input: UpdateInvoiceCommentsInput;
};


export type MutationUpdateInvoiceCustomerIdArgs = {
  input: UpdateInvoiceCustomerIdInput;
};


export type MutationUpdateInvoiceDateArgs = {
  input: UpdateInvoiceDateInput;
};


export type MutationUpdateInvoiceLaborCostArgs = {
  input: UpdateInvoiceLaborCostInput;
};


export type MutationUpdateInvoiceLaborCostDescriptionArgs = {
  input: UpdateInvoiceLaborCostDescriptionInput;
};


export type MutationUpdateInvoiceMaterialsCostArgs = {
  input: UpdateInvoiceMaterialsCostInput;
};


export type MutationUpdateInvoiceMaterialsCostDescriptionArgs = {
  input: UpdateInvoiceMaterialsCostDescriptionInput;
};


export type MutationUpdateInvoicePaidArgs = {
  input: UpdateInvoicePaidInput;
};


export type MutationUpdateInvoiceQuoteArgs = {
  input: UpdateInvoiceQuoteInput;
};


export type MutationUpdateInvoiceTotalArgs = {
  input: UpdateInvoiceTotalInput;
};


export type MutationUpdateInvoiceWorkOrdersArgs = {
  input: UpdateInvoiceWorkOrdersInput;
};


export type MutationUpdatePropertyAddressArgs = {
  input: UpdatePropertyAddressInput;
};


export type MutationUpdatePropertyAgentArgs = {
  input: UpdatePropertyAgentInput;
};


export type MutationUpdatePropertyDescriptionArgs = {
  input: UpdatePropertyDescriptionInput;
};


export type MutationUpdatePropertyNameArgs = {
  input: UpdatePropertyNameInput;
};


export type MutationUpdatePropertyS3FolderKeyArgs = {
  input: UpdatePropertyS3FolderKeyInput;
};


export type MutationUpdateUserFirstNameArgs = {
  input: UpdateUserFirstNameInput;
};


export type MutationUpdateUserLastNameArgs = {
  input: UpdateUserLastNameInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationUpdateUserPinArgs = {
  input: UpdateUserPinInput;
};


export type MutationUpdateUserUsernameArgs = {
  input: UpdateUserUsernameInput;
};


export type MutationUpdateWorkOrderChargedArgs = {
  input: UpdateWorkOrderChargedInput;
};


export type MutationUpdateWorkOrderCommentsArgs = {
  input: UpdateWorkOrderCommentsInput;
};


export type MutationUpdateWorkOrderCompletedArgs = {
  input: UpdateWorkOrderCompletedInput;
};


export type MutationUpdateWorkOrderCompletedByArgs = {
  input: UpdateWorkOrderCompletedByInput;
};


export type MutationUpdateWorkOrderCustomerIdArgs = {
  input: UpdateWorkOrderCustomerIdInput;
};


export type MutationUpdateWorkOrderDateArgs = {
  input: UpdateWorkOrderDateInput;
};


export type MutationUpdateWorkOrderDescriptionArgs = {
  input: UpdateWorkOrderDescriptionInput;
};


export type MutationUpdateWorkOrderLaborItemsArgs = {
  input: UpdateWorkOrderLaborItemsInput;
};


export type MutationUpdateWorkOrderPaidArgs = {
  input: UpdateWorkOrderPaidInput;
};


export type MutationUpdateWorkOrderPropertyIdArgs = {
  input: UpdateWorkOrderPropertyIdInput;
};


export type MutationUpdateWorkOrderQuoteArgs = {
  input: UpdateWorkOrderQuoteInput;
};


export type MutationUpdateWorkOrderTotalArgs = {
  input: UpdateWorkOrderTotalInput;
};


export type MutationUpdateWorkOrderTypeArgs = {
  input: UpdateWorkOrderTypeInput;
};

export type Property = {
  __typename?: 'Property';
  _id: Scalars['ID']['output'];
  agent: Customer;
  createdAt?: Maybe<Scalars['String']['output']>;
  propertyAddress: Address;
  propertyDescription: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
  s3FolderKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  GetAnnualExpenseCsv: Scalars['String']['output'];
  GetAnnualIncomeCsv: Scalars['String']['output'];
  getAllUsers?: Maybe<Array<User>>;
  getPresignedS3Url: Scalars['String']['output'];
  queryCustomerById: Customer;
  queryCustomers?: Maybe<Array<Customer>>;
  queryExpenseById: Expense;
  queryExpenses?: Maybe<Array<Expense>>;
  queryInvoiceById: Invoice;
  queryInvoices?: Maybe<Array<Invoice>>;
  queryInvoicesByCustomer?: Maybe<Array<Invoice>>;
  queryInvoicesByWorkOrder?: Maybe<Array<Invoice>>;
  queryProperties?: Maybe<Array<Property>>;
  queryPropertyById: Property;
  queryThumbtackReviews?: Maybe<Array<ThumbtackReview>>;
  queryWorkOrderById: WorkOrder;
  queryWorkOrders?: Maybe<Array<WorkOrder>>;
  queryWorkOrdersByCustomer?: Maybe<Array<WorkOrder>>;
  queryWorkOrdersByProperty?: Maybe<Array<WorkOrder>>;
};


export type QueryGetPresignedS3UrlArgs = {
  altTag: Scalars['String']['input'];
  commandType: Scalars['String']['input'];
  imgKey: Scalars['String']['input'];
};


export type QueryQueryCustomerByIdArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryExpenseByIdArgs = {
  expenseId: Scalars['ID']['input'];
};


export type QueryQueryInvoiceByIdArgs = {
  invoiceId: Scalars['ID']['input'];
};


export type QueryQueryInvoicesByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryInvoicesByWorkOrderArgs = {
  workOrderId: Scalars['ID']['input'];
};


export type QueryQueryPropertyByIdArgs = {
  propertyId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrderByIdArgs = {
  workOrderId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrdersByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrdersByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveCustomerInput = {
  customerId: Scalars['ID']['input'];
};

export type RemoveInvoiceInput = {
  invoiceId: Scalars['ID']['input'];
};

export type RemovePropertyInput = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RemoveWorkOrderInput = {
  workOrderId: Scalars['ID']['input'];
};

export type ScheduleServiceMessage = {
  __typename?: 'ScheduleServiceMessage';
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  message: Scalars['String']['output'];
  service: Scalars['String']['output'];
  tel: Scalars['String']['output'];
};

export type ScheduleServiceMessageInput = {
  email: Scalars['email_String_NotNull_maxLength_255_format_email']['input'];
  familyName: Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['input'];
  givenName: Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['input'];
  location: Scalars['location_String_NotNull_minLength_1_maxLength_10']['input'];
  message: Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_']['input'];
  service: Scalars['service_String_NotNull_minLength_1_maxLength_40']['input'];
  tel: Scalars['tel_String_NotNull_minLength_1_maxLength_12']['input'];
};

export type ThumbtackReview = {
  __typename?: 'ThumbtackReview';
  author: ThumbtackReviewAuthor;
  datePublished: Scalars['String']['output'];
  description: Scalars['String']['output'];
  reviewRating: ThumbtackReviewRating;
};

export type ThumbtackReviewAuthor = {
  __typename?: 'ThumbtackReviewAuthor';
  name: Scalars['String']['output'];
};

export type ThumbtackReviewRating = {
  __typename?: 'ThumbtackReviewRating';
  ratingValue: Scalars['Int']['output'];
};

export type UpdateCustomerAddressInput = {
  address: AddressInput;
  customerId: Scalars['ID']['input'];
};

export type UpdateCustomerBusinessNameInput = {
  businessName: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
};

export type UpdateCustomerEmailInput = {
  customerId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
};

export type UpdateCustomerFirstNameInput = {
  customerId: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
};

export type UpdateCustomerInvoicesInput = {
  customerId: Scalars['ID']['input'];
  invoice?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCustomerLastNameInput = {
  customerId: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
};

export type UpdateCustomerPhoneInput = {
  customerId: Scalars['ID']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateCustomerPropertiesInput = {
  customerId: Scalars['ID']['input'];
  property?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateExpenseAmountInput = {
  amount: Scalars['Float']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseCategoryInput = {
  category: Scalars['String']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseDateInput = {
  date: Scalars['Date']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseDescriptionInput = {
  description: Scalars['String']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpensePayeeInput = {
  expenseId: Scalars['ID']['input'];
  payee: Scalars['String']['input'];
};

export type UpdateInvoiceChargedInput = {
  charged: Scalars['Boolean']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceCommentsInput = {
  comments: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceCustomerIdInput = {
  customerId: Scalars['ID']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceDateInput = {
  date: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceLaborCostDescriptionInput = {
  description: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceLaborCostInput = {
  invoiceId: Scalars['ID']['input'];
  updatedCost: Scalars['Float']['input'];
};

export type UpdateInvoiceMaterialsCostDescriptionInput = {
  description: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceMaterialsCostInput = {
  invoiceId: Scalars['ID']['input'];
  updatedCost: Scalars['Float']['input'];
};

export type UpdateInvoicePaidInput = {
  invoiceId: Scalars['ID']['input'];
  paid: Scalars['Boolean']['input'];
};

export type UpdateInvoiceQuoteInput = {
  invoiceId: Scalars['ID']['input'];
  quote: Scalars['Float']['input'];
};

export type UpdateInvoiceTotalInput = {
  invoiceId: Scalars['ID']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateInvoiceWorkOrdersInput = {
  invoiceId: Scalars['ID']['input'];
  workOrders: Array<Scalars['ID']['input']>;
};

export type UpdatePropertyAddressInput = {
  propertyAddress: AddressInput;
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyAgentInput = {
  agent: Scalars['ID']['input'];
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyDescriptionInput = {
  propertyDescription: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyNameInput = {
  propertyId: Scalars['ID']['input'];
  propertyName: Scalars['String']['input'];
};

export type UpdatePropertyS3FolderKeyInput = {
  propertyId: Scalars['ID']['input'];
  s3FolderKey: Scalars['String']['input'];
};

export type UpdateUserFirstNameInput = {
  firstName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateUserLastNameInput = {
  lastName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateUserPasswordInput = {
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  userPassword: Scalars['String']['input'];
};

export type UpdateUserPinInput = {
  pin: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  userPassword: Scalars['String']['input'];
};

export type UpdateUserUsernameInput = {
  userId: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type UpdateWorkOrderChargedInput = {
  charged: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCommentsInput = {
  comments: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCompletedByInput = {
  completedBy: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCompletedInput = {
  completed: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCustomerIdInput = {
  customerId: Scalars['ID']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderDateInput = {
  date: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderDescriptionInput = {
  description: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderInvoicesInput = {
  invoice?: InputMaybe<Scalars['ID']['input']>;
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderLaborItemsInput = {
  laborItems: Array<LaborItemInput>;
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderPaidInput = {
  paid: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderPropertyIdInput = {
  propertyId: Scalars['ID']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderQuoteInput = {
  quote: Scalars['Float']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderTotalInput = {
  total: Scalars['Float']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderTypeInput = {
  type: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  pin: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type WorkOrder = {
  __typename?: 'WorkOrder';
  _id: Scalars['ID']['output'];
  charged: Scalars['Boolean']['output'];
  comments: Scalars['String']['output'];
  completed: Scalars['Boolean']['output'];
  completedBy: Scalars['String']['output'];
  customerId: Customer;
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  invoices: Array<Maybe<Invoice>>;
  laborItems?: Maybe<Array<Maybe<LaborItem>>>;
  lastUpdated: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  propertyId: Property;
  quote: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Buffer: ResolverTypeWrapper<Scalars['Buffer']['output']>;
  CreateCustomerInput: CreateCustomerInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoicePdfInput: CreateInvoicePdfInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  CreateWorkOrderInput: CreateWorkOrderInput;
  Customer: ResolverTypeWrapper<Customer>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteExpenseInput: DeleteExpenseInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: ResolverTypeWrapper<DeleteS3ObjectResponse>;
  Expense: ResolverTypeWrapper<Expense>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  LaborItem: ResolverTypeWrapper<LaborItem>;
  LaborItemInput: LaborItemInput;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  RemoveCustomerInput: RemoveCustomerInput;
  RemoveInvoiceInput: RemoveInvoiceInput;
  RemovePropertyInput: RemovePropertyInput;
  RemoveUserInput: RemoveUserInput;
  RemoveWorkOrderInput: RemoveWorkOrderInput;
  ScheduleServiceMessage: ResolverTypeWrapper<ScheduleServiceMessage>;
  ScheduleServiceMessageInput: ScheduleServiceMessageInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ThumbtackReview: ResolverTypeWrapper<ThumbtackReview>;
  ThumbtackReviewAuthor: ResolverTypeWrapper<ThumbtackReviewAuthor>;
  ThumbtackReviewRating: ResolverTypeWrapper<ThumbtackReviewRating>;
  UpdateCustomerAddressInput: UpdateCustomerAddressInput;
  UpdateCustomerBusinessNameInput: UpdateCustomerBusinessNameInput;
  UpdateCustomerEmailInput: UpdateCustomerEmailInput;
  UpdateCustomerFirstNameInput: UpdateCustomerFirstNameInput;
  UpdateCustomerInvoicesInput: UpdateCustomerInvoicesInput;
  UpdateCustomerLastNameInput: UpdateCustomerLastNameInput;
  UpdateCustomerPhoneInput: UpdateCustomerPhoneInput;
  UpdateCustomerPropertiesInput: UpdateCustomerPropertiesInput;
  UpdateExpenseAmountInput: UpdateExpenseAmountInput;
  UpdateExpenseCategoryInput: UpdateExpenseCategoryInput;
  UpdateExpenseDateInput: UpdateExpenseDateInput;
  UpdateExpenseDescriptionInput: UpdateExpenseDescriptionInput;
  UpdateExpensePayeeInput: UpdateExpensePayeeInput;
  UpdateInvoiceChargedInput: UpdateInvoiceChargedInput;
  UpdateInvoiceCommentsInput: UpdateInvoiceCommentsInput;
  UpdateInvoiceCustomerIdInput: UpdateInvoiceCustomerIdInput;
  UpdateInvoiceDateInput: UpdateInvoiceDateInput;
  UpdateInvoiceLaborCostDescriptionInput: UpdateInvoiceLaborCostDescriptionInput;
  UpdateInvoiceLaborCostInput: UpdateInvoiceLaborCostInput;
  UpdateInvoiceMaterialsCostDescriptionInput: UpdateInvoiceMaterialsCostDescriptionInput;
  UpdateInvoiceMaterialsCostInput: UpdateInvoiceMaterialsCostInput;
  UpdateInvoicePaidInput: UpdateInvoicePaidInput;
  UpdateInvoiceQuoteInput: UpdateInvoiceQuoteInput;
  UpdateInvoiceTotalInput: UpdateInvoiceTotalInput;
  UpdateInvoiceWorkOrdersInput: UpdateInvoiceWorkOrdersInput;
  UpdatePropertyAddressInput: UpdatePropertyAddressInput;
  UpdatePropertyAgentInput: UpdatePropertyAgentInput;
  UpdatePropertyDescriptionInput: UpdatePropertyDescriptionInput;
  UpdatePropertyNameInput: UpdatePropertyNameInput;
  UpdatePropertyS3FolderKeyInput: UpdatePropertyS3FolderKeyInput;
  UpdateUserFirstNameInput: UpdateUserFirstNameInput;
  UpdateUserLastNameInput: UpdateUserLastNameInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPinInput: UpdateUserPinInput;
  UpdateUserUsernameInput: UpdateUserUsernameInput;
  UpdateWorkOrderChargedInput: UpdateWorkOrderChargedInput;
  UpdateWorkOrderCommentsInput: UpdateWorkOrderCommentsInput;
  UpdateWorkOrderCompletedByInput: UpdateWorkOrderCompletedByInput;
  UpdateWorkOrderCompletedInput: UpdateWorkOrderCompletedInput;
  UpdateWorkOrderCustomerIdInput: UpdateWorkOrderCustomerIdInput;
  UpdateWorkOrderDateInput: UpdateWorkOrderDateInput;
  UpdateWorkOrderDescriptionInput: UpdateWorkOrderDescriptionInput;
  UpdateWorkOrderInvoicesInput: UpdateWorkOrderInvoicesInput;
  UpdateWorkOrderLaborItemsInput: UpdateWorkOrderLaborItemsInput;
  UpdateWorkOrderPaidInput: UpdateWorkOrderPaidInput;
  UpdateWorkOrderPropertyIdInput: UpdateWorkOrderPropertyIdInput;
  UpdateWorkOrderQuoteInput: UpdateWorkOrderQuoteInput;
  UpdateWorkOrderTotalInput: UpdateWorkOrderTotalInput;
  UpdateWorkOrderTypeInput: UpdateWorkOrderTypeInput;
  User: ResolverTypeWrapper<User>;
  WorkOrder: ResolverTypeWrapper<WorkOrder>;
  email_String_NotNull_maxLength_255_format_email: ResolverTypeWrapper<Scalars['email_String_NotNull_maxLength_255_format_email']['output']>;
  familyName_String_NotNull_minLength_1_maxLength_20: ResolverTypeWrapper<Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['output']>;
  givenName_String_NotNull_minLength_1_maxLength_20: ResolverTypeWrapper<Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['output']>;
  imageObject: ResolverTypeWrapper<ImageObject>;
  location_String_NotNull_minLength_1_maxLength_10: ResolverTypeWrapper<Scalars['location_String_NotNull_minLength_1_maxLength_10']['output']>;
  message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_: ResolverTypeWrapper<Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_']['output']>;
  service_String_NotNull_minLength_1_maxLength_40: ResolverTypeWrapper<Scalars['service_String_NotNull_minLength_1_maxLength_40']['output']>;
  tel_String_NotNull_minLength_1_maxLength_12: ResolverTypeWrapper<Scalars['tel_String_NotNull_minLength_1_maxLength_12']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressInput: AddressInput;
  Auth: Auth;
  Boolean: Scalars['Boolean']['output'];
  Buffer: Scalars['Buffer']['output'];
  CreateCustomerInput: CreateCustomerInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoicePdfInput: CreateInvoicePdfInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  CreateWorkOrderInput: CreateWorkOrderInput;
  Customer: Customer;
  Date: Scalars['Date']['output'];
  DeleteExpenseInput: DeleteExpenseInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: DeleteS3ObjectResponse;
  Expense: Expense;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invoice: Invoice;
  LaborItem: LaborItem;
  LaborItemInput: LaborItemInput;
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Property: Property;
  Query: {};
  RemoveCustomerInput: RemoveCustomerInput;
  RemoveInvoiceInput: RemoveInvoiceInput;
  RemovePropertyInput: RemovePropertyInput;
  RemoveUserInput: RemoveUserInput;
  RemoveWorkOrderInput: RemoveWorkOrderInput;
  ScheduleServiceMessage: ScheduleServiceMessage;
  ScheduleServiceMessageInput: ScheduleServiceMessageInput;
  String: Scalars['String']['output'];
  ThumbtackReview: ThumbtackReview;
  ThumbtackReviewAuthor: ThumbtackReviewAuthor;
  ThumbtackReviewRating: ThumbtackReviewRating;
  UpdateCustomerAddressInput: UpdateCustomerAddressInput;
  UpdateCustomerBusinessNameInput: UpdateCustomerBusinessNameInput;
  UpdateCustomerEmailInput: UpdateCustomerEmailInput;
  UpdateCustomerFirstNameInput: UpdateCustomerFirstNameInput;
  UpdateCustomerInvoicesInput: UpdateCustomerInvoicesInput;
  UpdateCustomerLastNameInput: UpdateCustomerLastNameInput;
  UpdateCustomerPhoneInput: UpdateCustomerPhoneInput;
  UpdateCustomerPropertiesInput: UpdateCustomerPropertiesInput;
  UpdateExpenseAmountInput: UpdateExpenseAmountInput;
  UpdateExpenseCategoryInput: UpdateExpenseCategoryInput;
  UpdateExpenseDateInput: UpdateExpenseDateInput;
  UpdateExpenseDescriptionInput: UpdateExpenseDescriptionInput;
  UpdateExpensePayeeInput: UpdateExpensePayeeInput;
  UpdateInvoiceChargedInput: UpdateInvoiceChargedInput;
  UpdateInvoiceCommentsInput: UpdateInvoiceCommentsInput;
  UpdateInvoiceCustomerIdInput: UpdateInvoiceCustomerIdInput;
  UpdateInvoiceDateInput: UpdateInvoiceDateInput;
  UpdateInvoiceLaborCostDescriptionInput: UpdateInvoiceLaborCostDescriptionInput;
  UpdateInvoiceLaborCostInput: UpdateInvoiceLaborCostInput;
  UpdateInvoiceMaterialsCostDescriptionInput: UpdateInvoiceMaterialsCostDescriptionInput;
  UpdateInvoiceMaterialsCostInput: UpdateInvoiceMaterialsCostInput;
  UpdateInvoicePaidInput: UpdateInvoicePaidInput;
  UpdateInvoiceQuoteInput: UpdateInvoiceQuoteInput;
  UpdateInvoiceTotalInput: UpdateInvoiceTotalInput;
  UpdateInvoiceWorkOrdersInput: UpdateInvoiceWorkOrdersInput;
  UpdatePropertyAddressInput: UpdatePropertyAddressInput;
  UpdatePropertyAgentInput: UpdatePropertyAgentInput;
  UpdatePropertyDescriptionInput: UpdatePropertyDescriptionInput;
  UpdatePropertyNameInput: UpdatePropertyNameInput;
  UpdatePropertyS3FolderKeyInput: UpdatePropertyS3FolderKeyInput;
  UpdateUserFirstNameInput: UpdateUserFirstNameInput;
  UpdateUserLastNameInput: UpdateUserLastNameInput;
  UpdateUserPasswordInput: UpdateUserPasswordInput;
  UpdateUserPinInput: UpdateUserPinInput;
  UpdateUserUsernameInput: UpdateUserUsernameInput;
  UpdateWorkOrderChargedInput: UpdateWorkOrderChargedInput;
  UpdateWorkOrderCommentsInput: UpdateWorkOrderCommentsInput;
  UpdateWorkOrderCompletedByInput: UpdateWorkOrderCompletedByInput;
  UpdateWorkOrderCompletedInput: UpdateWorkOrderCompletedInput;
  UpdateWorkOrderCustomerIdInput: UpdateWorkOrderCustomerIdInput;
  UpdateWorkOrderDateInput: UpdateWorkOrderDateInput;
  UpdateWorkOrderDescriptionInput: UpdateWorkOrderDescriptionInput;
  UpdateWorkOrderInvoicesInput: UpdateWorkOrderInvoicesInput;
  UpdateWorkOrderLaborItemsInput: UpdateWorkOrderLaborItemsInput;
  UpdateWorkOrderPaidInput: UpdateWorkOrderPaidInput;
  UpdateWorkOrderPropertyIdInput: UpdateWorkOrderPropertyIdInput;
  UpdateWorkOrderQuoteInput: UpdateWorkOrderQuoteInput;
  UpdateWorkOrderTotalInput: UpdateWorkOrderTotalInput;
  UpdateWorkOrderTypeInput: UpdateWorkOrderTypeInput;
  User: User;
  WorkOrder: WorkOrder;
  email_String_NotNull_maxLength_255_format_email: Scalars['email_String_NotNull_maxLength_255_format_email']['output'];
  familyName_String_NotNull_minLength_1_maxLength_20: Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['output'];
  givenName_String_NotNull_minLength_1_maxLength_20: Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['output'];
  imageObject: ImageObject;
  location_String_NotNull_minLength_1_maxLength_10: Scalars['location_String_NotNull_minLength_1_maxLength_10']['output'];
  message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_: Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_']['output'];
  service_String_NotNull_minLength_1_maxLength_40: Scalars['service_String_NotNull_minLength_1_maxLength_40']['output'];
  tel_String_NotNull_minLength_1_maxLength_12: Scalars['tel_String_NotNull_minLength_1_maxLength_12']['output'];
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']['input']>;
  endsWith?: Maybe<Scalars['String']['input']>;
  exclusiveMax?: Maybe<Scalars['Float']['input']>;
  exclusiveMin?: Maybe<Scalars['Float']['input']>;
  format?: Maybe<Scalars['String']['input']>;
  max?: Maybe<Scalars['Float']['input']>;
  maxItems?: Maybe<Scalars['Int']['input']>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  min?: Maybe<Scalars['Float']['input']>;
  minItems?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  multipleOf?: Maybe<Scalars['Float']['input']>;
  notContains?: Maybe<Scalars['String']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
  startsWith?: Maybe<Scalars['String']['input']>;
  uniqueTypeName?: Maybe<Scalars['String']['input']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BufferScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Buffer'], any> {
  name: 'Buffer';
}

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  businessName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoices?: Resolver<Array<Maybe<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<Maybe<ResolversTypes['Property']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workOrders?: Resolver<Array<Maybe<ResolversTypes['WorkOrder']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteS3ObjectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteS3ObjectResponse'] = ResolversParentTypes['DeleteS3ObjectResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpenseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Expense'] = ResolversParentTypes['Expense']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payee?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  charged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  laborItems?: Resolver<Array<Maybe<ResolversTypes['LaborItem']>>, ParentType, ContextType>;
  materialsCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  materialsCostDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workOrders?: Resolver<Array<Maybe<ResolversTypes['WorkOrder']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LaborItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['LaborItem'] = ResolversParentTypes['LaborItem']> = {
  laborCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  laborCostDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  createExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'input'>>;
  createInvoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'input'>>;
  createInvoicePdf?: Resolver<ResolversTypes['Buffer'], ParentType, ContextType, RequireFields<MutationCreateInvoicePdfArgs, 'input'>>;
  createProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationCreatePropertyArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWorkOrder?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationCreateWorkOrderArgs, 'input'>>;
  deleteCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'input'>>;
  deleteExpense?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationDeleteExpenseArgs, 'input'>>;
  deleteInvoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationDeleteInvoiceArgs, 'input'>>;
  deleteProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationDeletePropertyArgs, 'input'>>;
  deleteS3Objects?: Resolver<ResolversTypes['DeleteS3ObjectResponse'], ParentType, ContextType, RequireFields<MutationDeleteS3ObjectsArgs, 'input'>>;
  deleteWorkOrder?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationDeleteWorkOrderArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  removeUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'input'>>;
  sendInvoiceEmail?: Resolver<ResolversTypes['Buffer'], ParentType, ContextType, RequireFields<MutationSendInvoiceEmailArgs, 'input'>>;
  sendScheduleServiceMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSendScheduleServiceMessageArgs, 'input'>>;
  updateCustomerAddress?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerAddressArgs, 'input'>>;
  updateCustomerBusinessName?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerBusinessNameArgs, 'input'>>;
  updateCustomerEmail?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerEmailArgs, 'input'>>;
  updateCustomerFirstName?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerFirstNameArgs, 'input'>>;
  updateCustomerLastName?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerLastNameArgs, 'input'>>;
  updateCustomerPhone?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerPhoneArgs, 'input'>>;
  updateCustomerProperties?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerPropertiesArgs, 'input'>>;
  updateExpenseAmount?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpenseAmountArgs, 'input'>>;
  updateExpenseCategory?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpenseCategoryArgs, 'input'>>;
  updateExpenseDate?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpenseDateArgs, 'input'>>;
  updateExpenseDescription?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpenseDescriptionArgs, 'input'>>;
  updateExpensePayee?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<MutationUpdateExpensePayeeArgs, 'input'>>;
  updateInvoiceCharged?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceChargedArgs, 'input'>>;
  updateInvoiceComments?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceCommentsArgs, 'input'>>;
  updateInvoiceCustomerId?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceCustomerIdArgs, 'input'>>;
  updateInvoiceDate?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceDateArgs, 'input'>>;
  updateInvoiceLaborCost?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceLaborCostArgs, 'input'>>;
  updateInvoiceLaborCostDescription?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceLaborCostDescriptionArgs, 'input'>>;
  updateInvoiceMaterialsCost?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceMaterialsCostArgs, 'input'>>;
  updateInvoiceMaterialsCostDescription?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceMaterialsCostDescriptionArgs, 'input'>>;
  updateInvoicePaid?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoicePaidArgs, 'input'>>;
  updateInvoiceQuote?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceQuoteArgs, 'input'>>;
  updateInvoiceTotal?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceTotalArgs, 'input'>>;
  updateInvoiceWorkOrders?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceWorkOrdersArgs, 'input'>>;
  updatePropertyAddress?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyAddressArgs, 'input'>>;
  updatePropertyAgent?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyAgentArgs, 'input'>>;
  updatePropertyDescription?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyDescriptionArgs, 'input'>>;
  updatePropertyName?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyNameArgs, 'input'>>;
  updatePropertyS3FolderKey?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyS3FolderKeyArgs, 'input'>>;
  updateUserFirstName?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateUserFirstNameArgs, 'input'>>;
  updateUserLastName?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateUserLastNameArgs, 'input'>>;
  updateUserPassword?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, 'input'>>;
  updateUserPin?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateUserPinArgs, 'input'>>;
  updateUserUsername?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationUpdateUserUsernameArgs, 'input'>>;
  updateWorkOrderCharged?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderChargedArgs, 'input'>>;
  updateWorkOrderComments?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderCommentsArgs, 'input'>>;
  updateWorkOrderCompleted?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderCompletedArgs, 'input'>>;
  updateWorkOrderCompletedBy?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderCompletedByArgs, 'input'>>;
  updateWorkOrderCustomerId?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderCustomerIdArgs, 'input'>>;
  updateWorkOrderDate?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderDateArgs, 'input'>>;
  updateWorkOrderDescription?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderDescriptionArgs, 'input'>>;
  updateWorkOrderLaborItems?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderLaborItemsArgs, 'input'>>;
  updateWorkOrderPaid?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderPaidArgs, 'input'>>;
  updateWorkOrderPropertyId?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderPropertyIdArgs, 'input'>>;
  updateWorkOrderQuote?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderQuoteArgs, 'input'>>;
  updateWorkOrderTotal?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderTotalArgs, 'input'>>;
  updateWorkOrderType?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<MutationUpdateWorkOrderTypeArgs, 'input'>>;
};

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  agent?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  propertyAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  propertyDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3FolderKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  GetAnnualExpenseCsv?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  GetAnnualIncomeCsv?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  getPresignedS3Url?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGetPresignedS3UrlArgs, 'altTag' | 'commandType' | 'imgKey'>>;
  queryCustomerById?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QueryQueryCustomerByIdArgs, 'customerId'>>;
  queryCustomers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
  queryExpenseById?: Resolver<ResolversTypes['Expense'], ParentType, ContextType, RequireFields<QueryQueryExpenseByIdArgs, 'expenseId'>>;
  queryExpenses?: Resolver<Maybe<Array<ResolversTypes['Expense']>>, ParentType, ContextType>;
  queryInvoiceById?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<QueryQueryInvoiceByIdArgs, 'invoiceId'>>;
  queryInvoices?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  queryInvoicesByCustomer?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType, RequireFields<QueryQueryInvoicesByCustomerArgs, 'customerId'>>;
  queryInvoicesByWorkOrder?: Resolver<Maybe<Array<ResolversTypes['Invoice']>>, ParentType, ContextType, RequireFields<QueryQueryInvoicesByWorkOrderArgs, 'workOrderId'>>;
  queryProperties?: Resolver<Maybe<Array<ResolversTypes['Property']>>, ParentType, ContextType>;
  queryPropertyById?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<QueryQueryPropertyByIdArgs, 'propertyId'>>;
  queryThumbtackReviews?: Resolver<Maybe<Array<ResolversTypes['ThumbtackReview']>>, ParentType, ContextType>;
  queryWorkOrderById?: Resolver<ResolversTypes['WorkOrder'], ParentType, ContextType, RequireFields<QueryQueryWorkOrderByIdArgs, 'workOrderId'>>;
  queryWorkOrders?: Resolver<Maybe<Array<ResolversTypes['WorkOrder']>>, ParentType, ContextType>;
  queryWorkOrdersByCustomer?: Resolver<Maybe<Array<ResolversTypes['WorkOrder']>>, ParentType, ContextType, RequireFields<QueryQueryWorkOrdersByCustomerArgs, 'customerId'>>;
  queryWorkOrdersByProperty?: Resolver<Maybe<Array<ResolversTypes['WorkOrder']>>, ParentType, ContextType, RequireFields<QueryQueryWorkOrdersByPropertyArgs, 'propertyId'>>;
};

export type ScheduleServiceMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleServiceMessage'] = ResolversParentTypes['ScheduleServiceMessage']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  service?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReview'] = ResolversParentTypes['ThumbtackReview']> = {
  author?: Resolver<ResolversTypes['ThumbtackReviewAuthor'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviewRating?: Resolver<ResolversTypes['ThumbtackReviewRating'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewAuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReviewAuthor'] = ResolversParentTypes['ThumbtackReviewAuthor']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbtackReviewRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThumbtackReviewRating'] = ResolversParentTypes['ThumbtackReviewRating']> = {
  ratingValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkOrder'] = ResolversParentTypes['WorkOrder']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  charged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoices?: Resolver<Array<Maybe<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  laborItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['LaborItem']>>>, ParentType, ContextType>;
  lastUpdated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  propertyId?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Email_String_NotNull_MaxLength_255_Format_EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['email_String_NotNull_maxLength_255_format_email'], any> {
  name: 'email_String_NotNull_maxLength_255_format_email';
}

export interface FamilyName_String_NotNull_MinLength_1_MaxLength_20ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['familyName_String_NotNull_minLength_1_maxLength_20'], any> {
  name: 'familyName_String_NotNull_minLength_1_maxLength_20';
}

export interface GivenName_String_NotNull_MinLength_1_MaxLength_20ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['givenName_String_NotNull_minLength_1_maxLength_20'], any> {
  name: 'givenName_String_NotNull_minLength_1_maxLength_20';
}

export type ImageObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['imageObject'] = ResolversParentTypes['imageObject']> = {
  imgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Location_String_NotNull_MinLength_1_MaxLength_10ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['location_String_NotNull_minLength_1_maxLength_10'], any> {
  name: 'location_String_NotNull_minLength_1_maxLength_10';
}

export interface Message_String_NotNull_MinLength_10_MaxLength_255_Pattern_AZaz09_ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_'], any> {
  name: 'message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_';
}

export interface Service_String_NotNull_MinLength_1_MaxLength_40ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['service_String_NotNull_minLength_1_maxLength_40'], any> {
  name: 'service_String_NotNull_minLength_1_maxLength_40';
}

export interface Tel_String_NotNull_MinLength_1_MaxLength_12ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['tel_String_NotNull_minLength_1_maxLength_12'], any> {
  name: 'tel_String_NotNull_minLength_1_maxLength_12';
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  Buffer?: GraphQLScalarType;
  Customer?: CustomerResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteS3ObjectResponse?: DeleteS3ObjectResponseResolvers<ContextType>;
  Expense?: ExpenseResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  LaborItem?: LaborItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduleServiceMessage?: ScheduleServiceMessageResolvers<ContextType>;
  ThumbtackReview?: ThumbtackReviewResolvers<ContextType>;
  ThumbtackReviewAuthor?: ThumbtackReviewAuthorResolvers<ContextType>;
  ThumbtackReviewRating?: ThumbtackReviewRatingResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WorkOrder?: WorkOrderResolvers<ContextType>;
  email_String_NotNull_maxLength_255_format_email?: GraphQLScalarType;
  familyName_String_NotNull_minLength_1_maxLength_20?: GraphQLScalarType;
  givenName_String_NotNull_minLength_1_maxLength_20?: GraphQLScalarType;
  imageObject?: ImageObjectResolvers<ContextType>;
  location_String_NotNull_minLength_1_maxLength_10?: GraphQLScalarType;
  message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_?: GraphQLScalarType;
  service_String_NotNull_minLength_1_maxLength_40?: GraphQLScalarType;
  tel_String_NotNull_minLength_1_maxLength_12?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
