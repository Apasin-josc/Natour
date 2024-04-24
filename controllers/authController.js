const jwt = require('jsonwebtoken');
//first thing is to import the user
const User = require('./../models/userModel');
//importing the catchAsync to don't repeate all the try catch code and just wrap our signup with the function
const catchAsync = require ('./../utils/catchAsync');
//importing error to handle if it doesn't exist the email/  password/ username on login function
const AppError = require('./../utils/appError');

//creating function to signToken to don't repeat code
const signToken = id =>{
    return jwt.sign({ id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

//async function because we're going to work with the database
exports.signup = catchAsync(async (req, res, next) => {
    //await because it's a async function
    //const newUser = await User.create(req.body);  ⚠⚠⚠⚠⚠ if we leave the code as this, anyone could make themselves and admin role, to fix it:
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });
    //creating token :)
    //the first argument of the paramether is a payload, a payload is a object with all the data that we want to store on the token
    //in mongoDB the ID is named _id, so we use newuser._id //the second paramether is a secret of 32 characters long estabished on the convig.env file
    const token = signToken(newUser._id)
    /*jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });*/

    //SO WE JUST CREATED THE TOKEN NOW WE NEED IT TO PASS IT INTO THE CLIENT :)
    
    //status 201 for created
    res.status(201).json({
        status: 'success',
        //passing the token into the client
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async(req, res, next) => {
    //first we set the email
    const {email, password} = req.body;

    //1) check if email and password exist
    if(!email || !password){
        //status code of error 400
        return next(new AppError('Please provide email and password!', 400));
    }

    //2) check if the user exist && password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    //using bcrypt package to compare the password of the user with the encrypted password of the users password

    //3) if everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});