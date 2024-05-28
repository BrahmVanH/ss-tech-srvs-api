"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    workOrders: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
    },
});
const Customer = (0, mongoose_1.model)('Customer', customerSchema);
exports.default = Customer;
//# sourceMappingURL=Customer.js.map