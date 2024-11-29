const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute=require("./routes/userRoutes");

const app=express();
const PORT=3000;

const mongoose = require("mongoose");


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/sanyuj", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


app.use("/",userRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

