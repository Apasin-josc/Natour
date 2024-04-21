const mongoose = require('mongoose');
const dotenv = require('dotenv'); //COMMAND is going to read the variables from the file
dotenv.config({ path: './config.env' });
const app = require('./app');

/**
 * Connecting to the mongoDB with mongoose
 */

const DATABASE_URI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DATABASE_URI)
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error:', err));



//creating a testTour document, which is an instance of the tour model that we created
//first data uploaded from the backend into a database 
// const testTour = new Tour({
//   name: 'The park Camper',
//   price: 53
// });

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log(`Error 😵: ${err}`);
// })

//environment variables are global variables that are used to define the environment// express sets this env to development by default
//console.log(app.get('env'));
//console.log(process.env);
//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
