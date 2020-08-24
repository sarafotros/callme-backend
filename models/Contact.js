const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    username: {
        type: String, 
        required: true,
        min: 4,
        max: 15, 
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"]
    },
    phone:{
        type: String,
        required: true, 
        min: 4,
        max: 10
    }
});

const Contact = (module.exports = mongoose.model('Contact', contactSchema));

module.exports.get = function(callback, limit)  {
   return Contact.find(callback).limit(limit);
};

module.exports.getContact = function (username)  { 
    return Contact.findOne({ username })
    .then((contact) => { 
        return contact; 
    }); 
};