"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
});
const propertySchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
        required: true,
    },
    propertyAddress: {
        type: AddressSchema,
        required: true,
    },
    propertyDescription: {
        type: String,
        required: true,
    },
    agent: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
});
const Property = (0, mongoose_1.model)('Property', propertySchema);
exports.default = Property;
//# sourceMappingURL=Property.js.map