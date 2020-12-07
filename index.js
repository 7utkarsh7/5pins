const express= require("express");
const app=express();
const mongoose  = require("mongoose");
require("dotenv").config();

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err));


app.use(express.json());

app.use("/auth", require("./routes/user"));

const PORT =process.env.PORT || 3000;

app.listen(PORT,()=> console.log("server running on port 3000"));
