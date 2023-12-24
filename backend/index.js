const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

app.post('/api/uploadImage',(req,res)=>{
    console.log(req);
})

app.listen(3000,()=>{
    console.log('hey i am listening at port 3000');
})