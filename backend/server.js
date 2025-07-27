const express = require("express");
const cors=require("cors")
const app = express();
app.use(cors())
app.use(express.json());

const router = require("./routes");
app.use("/api",router);

const connectDB = require("./connectDb");

app.get("/hello",(req,res)=>{
    res.status(200).json({msg:"Hello World"})
});

const port = 5000;

const startServer = async() =>{
    try {
        await connectDB();
        app.listen(port, () => {
          console.log(`Server is listening on port ${port}`);
        });
      } catch (error) {
        console.error("Error starting the server", error);
      }
};

startServer();