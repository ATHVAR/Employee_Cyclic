const express = require('express');                                           
const app = express();  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cors = require('cors');
app.use(cors());

require("dotenv").config();      

const morgan = require('morgan');
app.use(morgan('dev'));

const PORT = 3000; 

const db = require('./db/index');

const api=require('./routers/router');
app.use('/api',api);

const path = require('path');
app.use(express.static('./Backend/employee-mean'));

app.use(express.static(path.join(__dirname,'employee-mean')))

app.get('*', async(req, res)=> {
        res.sendFile(path.join(__dirname ,'employee-mean','index.html'))});

app.listen(PORT,()=>{                                                         
console.log(`Server is running on ${PORT}`);                             
})