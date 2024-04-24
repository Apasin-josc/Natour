//requiring mongoose
const mongoose = require('mongoose');
//validator for email
const validator = require('validator');
const bcrypt = require('bcryptjs');

//creating a schema with email, name, photo, password, passwordConfirm
//a schema is the boyler template of the class
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name! 🤠'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            //to lower case the email
            lowercase: true,
            //creating validator package
            validate: [validator.isEmail, 'please provide a valid email']
        },
        photo: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            //encrypting password, to don't show it on any output, postman
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password!'],
            //validator, with the validation package to make the passwords match and send a message if they doesn't
            validate: {
                validator: function(el) {
                    return el === this.password; //this only works on CREATE AND SAVE
                },
                message: "Passwords are not the same!"
            },
        },
    },
    {
        toJSON: {virtuals:true},
        toObject: {virtuals:true}
    }
);

//middleware of mongoose, it's placed here because just here it's when the data is between the post and save into the database process
//storing users in a secure way to the database :)
userSchema.pre('save', async function(next){
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //bcrypt package to prevent the password brute fforce attack npm i bcryptjs
    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //deleting confirm password because we don't need it anymore
    this.passwordConfirm = undefined;
    next();
});

//creating instance method, instance method
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

//creating the model of the User schema
const User = mongoose.model('User', userSchema);

module.exports = User;