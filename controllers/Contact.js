const { getContact } = require('../models/Contact');
const Contact = require('../models/Contact');

exports.addContact = function (req, res, next) {
    // get the username and password from the request body
    const { username, email, phone } = req.body;
    // Search the database to see if username already exists
    Contact.findOne({username}, (err, contact) => {
        if(err) return next(err);
        // If user exists, return status 400 and a message saying that the username already exists
        if(contact) 
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});   
        else {
             // If username doesn't exist, then create a new user, passing in the username and password as arguments
            const newContact = new Contact({username, email, phone});
            // save to database
            newContact.save(err => {
                if(err) return next(err)
                else
                //console log the password just to check whether the hashing and salting process has worked, delete afterwards
                console.log(newContact.username)
                //return happy status 201 with a json object containing a success message to be sent to client
                res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
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