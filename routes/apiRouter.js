const apiRouter = require('express').Router();
const {addContact} = require('../controllers/Contact')


apiRouter.route('/contacts')
    .post(addContacts)
    .get(index);

module.exports = apiRouter;