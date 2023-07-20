import {
    validationResult
} from 'express-validator';
import {
    Contact
} from '../../model/Contact.js';
import {
    validationCreate,
    validationUpdate
} from '../validation/contactValidation.js';

export class ContactController {
    contact;
    validCreate;
    validUpdate;

    constructor() {
        this.contact = new Contact();
        this.validCreate = validationCreate;
        this.validUpdate = validationUpdate;
    }

    index = async (req, res) => {
        const contacts = await this.contact.getAll();

        res.render('contact/index', {
            title: 'Contact',
            msg: req.flash('msg'),
            contacts,
        });
    }

    create = (req, res) => {
        res.render('contact/create', {
            title: 'Create Contact',
        });
    }

    detail = async (req, res) => {

        res.render('contact/detail', {
            title: 'Contact',
            contact: await this.contact.findOne({
                name: req.params.name
            }),
        });
    }

    store = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('contact/create', {
                title: 'Create Contact',
                errors: errors.array(),
                old: req.body
            });
        } else {
            await this.contact.save(req.body);
            req.flash('msg', 'Data contact successfully added!');
            res.redirect('/contact');
        }
    }

    edit = async (req, res) => {
        res.render('contact/edit', {
            title: 'Edit Contact',
            contact: await this.contact.findOne({
                name: req.params.name
            }),
        });
    }

    update = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('contact/edit', {
                title: 'Edit Contact',
                errors: errors.array(),
                contact: req.body
            });
        } else {
            const filterName = req.body.oldName;

            delete req.body.oldName;
            delete req.body.oldPhone;

            const update = await this.contact.updateOne({
                name: filterName
            }, req.body);

            if (!update) {
                res.status(404).render('404', {
                    title: 'Page Not Found',
                    layout: false
                });
            }

            req.flash('msg', 'Data contact successfully updated!');
            res.redirect('/contact');
        }
    }

    delete = (req, res) => {

        const del = this.contact.deleteOne({
            name: req.body.name
        });

        if (del) {
            req.flash('msg', 'Data contact successfully deleted!');
            res.redirect('/contact');
        } else {
            res.status(404).render('404', {
                title: 'Page Not Found',
                layout: false
            });
        }

    }
}