import {
    body,
    check
} from 'express-validator';
import {
    Contact
} from '../../model/Contact.js';

const contacts = new Contact();

export const validationCreate = [
    body('name').custom(async (value) => {
        const contact = await contacts.findOne({
            name: value
        });

        if (value === '') {
            throw new Error('Name cannot be empty!');
        }

        if (contact) {
            throw new Error('Name already exist!');
        }
        return true;
    }),
    body('phone').custom(async (value) => {

        const contact = await contacts.findOne({
            phone: value
        });

        if (value === '') {
            throw new Error('Phone number cannot be empty!');
        }

        if (contact) {
            throw new Error('Phone already exist, please use another phone number!');
        }
        return true;
    }),
    check('phone', 'Phone number must be valid!').optional({
        checkFalsy: true,
        nullable: true
    }).isMobilePhone('id-ID'),
    check('email', 'Fill the valid email!').optional({
        checkFalsy: true,
        nullable: true
    }).isEmail()
];

export const validationUpdate = [
    body('name').custom(async (value, {
        req
    }) => {

        const contact = await contacts.findOne({
            name: value
        });

        if (value === '') {
            throw new Error('Name cannot be empty!');
        }

        if (value !== req.body.oldName && contact) {
            throw new Error('Name already exist!');
        }
        return true;

    }),
    body('phone').custom(async (value, {
        req
    }) => {

        const contact = await contacts.findOne({
            name: value
        });

        if (value === '') {
            throw new Error('Phone number cannot be empty!');
        }

        if (value !== req.body.oldPhone && contact) {
            throw new Error('Phone already exist, please use another phone number!');
        }
        return true;
    }),
    check('phone', 'Phone number must be valid!').optional({
        checkFalsy: true,
        nullable: true
    }).isMobilePhone('id-ID'),
    check('email', 'Fill the valid email!').optional({
        checkFalsy: true,
        nullable: true
    }).isEmail()
]