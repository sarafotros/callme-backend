const apiRouter = require('express').Router();
const {addContact, index} = require('../controllers/Contact')


apiRouter.route('/contacts')
    .post(addContact)
    .get(index);

module.exports = apiRouter;