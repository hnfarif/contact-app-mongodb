import {
    dbmongoosee
} from "../db.js";

const Schema = dbmongoosee.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

export const contact = dbmongoosee.model("Contact", contactSchema);