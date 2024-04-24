const express = require('express');
const { create } = require('domain');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //express.json is just a middleware 🌓, it's called middleware because it's in the middle of the REQUEST AND THE RESPONSE
//using middlewares to render static files like the html overview
//http://localhost:8000/overview.html
app.use(express.static(`${__dirname}/public`));
//middleware 📍 convention by express "next" // this middleware is going to be applied for every request or response of the app (bc wew didn't specify the route)
app.use((req, res, next) => {
  //console.log('hello from the middleware 👋');
  next();
});

//middleware to request headers
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//2) route handlers
//defining a route that can handle a variable, for example the id of an specific tour 📍 the variable we define it with the semicolon (:)%words%
//if we just want an optional parameter we need to use the semicolon + variable name + question mark : (:) %variables%(?)
//3) routes
//creating a subApp by using the app.use => URL + subApp, tourRouter 🤖 ////// same for userTour
//creating routers

//this would be the middleware || tourRouter middleware and userRouter middleware
//el tourRouter que importamos trae ese endpoint para ese api :)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) start server

module.exports = app;
