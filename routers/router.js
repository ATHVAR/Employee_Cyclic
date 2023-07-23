const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const employeeDetails=require("../model/model")

router.use(express.json());
router.use(express.urlencoded({extended:true}));



function verifytoken(req, res, next) {
    try {
      if (!req.headers.authorization) throw 'Unauthorized';
      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw 'Unauthorized';
      const payload = jwt.verify(token, 'secretKey');
      if (!payload) throw 'Unauthorized';
      next();
    } catch (error) {
      res.status(401).send('Error');
    }
  }
  

router.post("/addemployee",verifytoken,async (req,res)=>{                              
    try{
        console.log(req.body);
        const item = req.body;                                               
        const newdata = await employeeDetails(item);                               
        newdata.save();                                
        res.status(200).json("POST Successful");                                                                             
    }catch(error){
        res.status(400).json("Error");                            
        console.log(` POST Error`);                                      
    }
})

router.put("/editemployee/:id",verifytoken,async (req,res)=>{                               
    try{
        let id = req.params.id;
        let updateData = {$set: req.body};
        const updated = await employeeDetails.findByIdAndUpdate(id,updateData);  
        res.set('Cache-Control', 'no-store');                            
        res.status(200).json("UPDATED");                                                                          
    }catch(error){
        res.status(400).json("Error in UPDATE ");                            
        console.log(`Error in Update`);                               
    }
})

router.get("/fetchdata",verifytoken,async (req,res)=>{
    try {
        res.set('Cache-Control', 'no-store');
        let data = await employeeDetails.find({});
        console.log(data)
        res.json({data:data,status:200}).status(201);
    } catch (error) {
         res.status(400).json({ message: "Error in GET request" });       
    }
    
})

router.get("/userform/:id",verifytoken,async (req,res)=>{
    try {
        let id = req.params.id;
        console.log(id)
        let data = await employeeDetails.findById(id);
        res.json({data:data,status:200}).status(201);
    } catch (error) {
        res.status(400).json({ message: "Error in Get request" });       
    }
})

router.delete("/deleteform/:id",verifytoken,async (req,res)=>{
    try {
        let id = req.params.id;
        console.log(id);
        let data = await employeeDetails.findByIdAndRemove(id);
        res.json({data:data,status:200}).status(201);
    } catch (error) {
        res.status(400).json({ message: "Error in Delete Request" });       
    }
})

router.post('/authlogin', (req,res)=>{
    try {
     
        var email = req.body.email;
        var pwd = req.body.password;
        let payload = {email:email,password:pwd}
        console.log(payload )
        let token = jwt.sign(payload,'secretKey');
        if(email==='admin2023@am.in' && pwd==='Admin2023'){
            res.status(200).send({message:'Admin log in Successful',token:token,api:'/home',role:'admin'})
        }
        else if(email==='ath2023@am.in' && pwd=='Athi2023'){
            res.status(200).send({message:'User log in Successful',token:token,api:'/user',role:'user'})
        }
    } 
    catch (error) {
        res.status(404).send({message:"Error"})        
    }
})

module.exports = router