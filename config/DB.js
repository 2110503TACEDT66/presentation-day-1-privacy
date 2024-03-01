const mongoose = require('mongoose')

const ConnectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log("mongodb connecting on",conn.connection.host);
        }else{
            throw err;
        }
    }catch(err){
        console.log("fail connectDB",err);
    }
}

module.exports = ConnectDB;