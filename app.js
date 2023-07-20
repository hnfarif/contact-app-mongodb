import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
//flash session
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
//end flash session

import {
    ContactController
} from './utils/controllers/contactController.js';

const app = express();
const port = 3000;

// Setup EJS view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');
// end setup EJS view engine

//konfigurasi flash message
app.use(cookieParser('secret'));
app.use(session({
    cookie: {
        maxAge: 6000
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
// end konfigurasi flash message

// setup method override
app.use(methodOverride('_method'));

const contact = new ContactController();

app.use((req, res, next) => {
    // for nav active
    res.locals.currentRoute = req.path;
    next();
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
    });
});

app.get('/contact', contact.index);

app.post('/contact', contact.validCreate, contact.store);

app.delete('/contact', contact.delete);

app.put('/contact', contact.validUpdate, contact.update);

app.get('/contact/create', contact.create);

app.get('/contact/edit/:name', contact.edit)

app.get('/contact/:name', contact.detail);

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
    });
});

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        layout: false
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});