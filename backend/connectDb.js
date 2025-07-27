const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async ()=>{
    try{
        const connectDb=await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log(`Database Connected: ${connectDb.connection.name}` );
    } catch(error){
        console.error("Database connection failed")
    }
};

module.exports=connectDb;