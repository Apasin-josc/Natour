const dotenv = require('dotenv'); //COMMAND is going to read the variables from the file
dotenv.config({ path: './config.env' });

const app = require('./app');

//environment variables are global variables that are used to define the environment// express sets this env to development by default
//console.log(app.get('env'));
//console.log(process.env);
//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
