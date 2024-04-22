//USING A SCRIPT AND LEARNING HOW TO KILL THE APPLICATION AS ON CSHARP

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //COMMAND is going to read the variables from the file
const Tour = require('./../../models/tourModel')
dotenv.config({ path: './config.env' });

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

  //READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

  //IMPORT DATA INTO DB
  const importData = async () => {
    try{
        await Tour.create(tours);
        console.log(`Data successfully loaded!`)
    }catch(err){
        console.log(err);
    }
    process.exit();
  };

  //DELETE ALL DATA FROM COLLECTION
  const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log(`Data successfully deleted!`)
        //stoping app
    }catch(err){
        console.log(err);
    }
    process.exit();
  };

  if(process.argv[2] === '--import'){
    importData()
  }else if (process.argv[2] === '--delete'){
    deleteData();
  }

  //node .\dev-data\data\import-dev-data.js --import
  //node .\dev-data\data\import-dev-data.js --delete
  //console.log(process.argv);