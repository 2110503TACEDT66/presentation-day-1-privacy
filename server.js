//create variable
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');

//config dotenv
dotenv.config({path:'./config/config.env'});

//connect MONGOOSE
connectDB();

//Route files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

//Body parser
const app = express(); 
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use('/api/v1/dentists', dentists);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT,console.log('Server running in ',process.env.PORT,' mode on port ',PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});