const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Pantry = mongoose.model('pantries');

module.exports = app => {
    app.get('/api/pantry', requireLogin, (req, res) => {
        console.log(req.body);
    });

    app.get('/api/pantry/:id', requireLogin, (req, res) => {
        console.log(req.body);
    });

    app.post('/api/pantry', requireLogin, (req, res) => {
        // const pantry = new Pantry(req.body);
        console.log(req.body);
    });

    app.post('/api/pantry/:id/item/:id', requireLogin, (req, res) => {
        console.log(req.body);
    });

    app.delete('/api/pantry/:id', requireLogin, (req, res) => {
        console.log(req.body);
    });

    app.delete('/api/pantry/:id/item/:id', requireLogin, (req, res) => {
        console.log(req.body);
    });
}