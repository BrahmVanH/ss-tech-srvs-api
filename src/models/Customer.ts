import { model, Schema } from 'mongoose';

const customerSchema: Schema = new Schema({
	agentFirstName: {
    type: String,
    required: true,
  },
	agentLastName: {
		type: String,
		required: true,
	},
  businessName: {
    type: String,
    required: true,
  },
  workOrders: {
    type: Schema.Types.ObjectId,
    required: false,
  }
});

const Customer = model('Customer', customerSchema);

export default Customer;

