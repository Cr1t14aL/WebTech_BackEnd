const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String,unique: true,required: true, trim: true},
    password: { type: String, required: true, trim: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    status: { type: Number, required: true },    
    types: { type: Number, required: true },
    usertotalCal : [{
        todayCal: Number,
        date : Number
    }],    
    createdAt: { type: Number, default: new Date().getTime() },
    updatedAt: { type: Number, default: new Date().getTime() }
})

userSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

userSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
//bug
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)