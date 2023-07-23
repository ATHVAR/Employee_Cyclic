const mongoose = require('mongoose');

require("dotenv").config();                                                   
const ConnectionString = process.env.Connection_String;

mongoose.connect(ConnectionString)
.then(()=>{
    console.log(`Connection to MongoDB Atlas`);
})
.catch((error)=>{
    console.log(`Error in connecting MongoDB ${error.message}`)
})