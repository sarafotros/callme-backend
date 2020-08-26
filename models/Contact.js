const mongoose = require('mongoose');
const { nextTick } = require('async');
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

module.exports.updateContact = async (id, updateBody) => {
    console.log('id', id);
    const contactExists = await Contact.exists({ _id: id})
    console.log('update',updateBody );
    if (!contactExists) {
      return new Promise (resolve => {
          resolve(null)
      })
    } else {
      return Contact.findByIdAndUpdate({ _id: id}, { $set: updateBody }, { new: true }, function (err,contact) {
          if(err) return next(err);
        return contact;
      });
    };
}