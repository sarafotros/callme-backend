const apiRouter = require('express').Router();
const {addContact, index, removeContact, updateContactInputs} = require('../controllers/Contact')


apiRouter.route('/contacts')
    .post(addContact)
    .get(index);

apiRouter.route('/contacts/:username')
    .delete(removeContact)
   

apiRouter.route('/contacts/:id')
  .patch(updateContactInputs)

  
module.exports = apiRouter;