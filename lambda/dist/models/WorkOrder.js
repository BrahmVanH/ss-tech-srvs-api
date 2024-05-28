"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workOrderSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
    propertyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Property',
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completedBy: {
        type: String,
        required: true,
    },
    quote: {
        type: Number,
        required: false,
    },
    total: {
        type: Number,
        required: false,
    },
    charged: {
        type: Boolean,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
    },
    comments: {
        type: String,
        required: false,
    },
});
const WorkOrder = (0, mongoose_1.model)('WordOrder', workOrderSchema);
exports.default = WorkOrder;
//# sourceMappingURL=WorkOrder.js.map