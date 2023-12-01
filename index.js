const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
dotEnv.config();

const bodyparser=require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    useNewUrlParser:true,
    useUnifiedTopology:true,
    extended:true
}));

mongoose.connect(process.env.DATABASE_URL,{

useNewUrlParser:true,
useUnifiedTopology:true

})
.then(()=> console.log("connected to db"))
.catch((err)=>console.log(err));


app.use("/users",require("./routes/userRoutes"));
app.use("/profile",require("./routes/userprofileRoutes"));
app.use("/posts",require("./routes/postRoutes"));
app.use("/comments",require("./routes/commentRoutes"));


app.listen(process.env.PORT,()=> console.log("Server up and running"));