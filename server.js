//create variable
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');

//config dotenv
dotenv.config({path:'./config/config.env'});

//connect MONGOOSE
connectDB();


//comment
const app = express(); 
app.use(cookieParser());
app.use(express.json());

 
 



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log('Server running in ',process.env.PORT,' mode on port ',PORT));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});