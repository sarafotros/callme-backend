const {updateContact} = require('../models/Contact')
const Contact = require('../models/Contact');

exports.addContact = function (req, res, next) {
    const { username, email, phone } = req.body;
    Contact.findOne({username}, (err, contact) => {
        if(err) return next(err);
        if(contact) 
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});   
        else {
             // If username doesn't exist, then create a new user, passing in the username and password as arguments
            const newContact = new Contact({username, email, phone});
            // save to database
            newContact.save(err => {
                if(err) return next(err)
                else{
                //console log the password just to check whether the hashing and salting process has worked, delete afterwards
                console.log(newContact.username)
                //return happy status 201 with a json object containing a success message to be sent to client
                res.status(201).json({message: {msgBody: "Account successfully created",
                 msgError: false}});
                }
            })
        }
    });
}

exports.index = function (req, res, next) {
    Contact.get(function (err, contacts) {
      if (err) return next(err);
      res.json({
        status: "success",
        message: "Contact retrieved successfully",
        data: contacts
      });
    });
};

exports.sendContact = function (req, res, next) {
    getContact(req.params.username)
        .then(contact => {
            if (contact === null) {
                res.status(400).send({msg: 'Invalid username'})
            } else {
                res.status(200).send({contact});
            }
        })
        .catch(next)
}

exports.removeContact = async (req, res, next) => {
    const contactExists = await Contact.exists({ username: req.params.username})
    if (!contactExists) {
      res.status(400).send({msg: 'Contact does not exist'})
    } else {
    Contact.findOneAndRemove({username: req.params.username}, function (err) {
      if (err) return res.status(400).send({msg: 'Invalid username'});
      res.json({
          status: "success",
          message: "Contact successfully deleted"
          });
      });
    }
}


exports.updateContactInputs = function (req, res, next) {
    const userId = req.params.id;
    updateContact(userId, req.body, res)
        .then((contact) => {
          if (contact === null) {
            res.status(400).send({ msg: "Invalid ID" });
          } else {
            res.status(200).send({ contact });
          }
        })
        .catch(next);
  };

