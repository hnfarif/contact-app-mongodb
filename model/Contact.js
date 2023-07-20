import {
    contact
} from "../utils/schema/contactSchema.js";


export class Contact {

    getAll() {
        return contact.find();
    }

    findOne(data) {
        return contact.findOne(data);
    }

    save(data) {
        return contact.insertMany(data);
    }

    async deleteOne(data) {
        return await contact.deleteOne(data);
    }

    async updateOne(filter, doc) {
        return await contact.updateOne(filter, doc);
    }

}