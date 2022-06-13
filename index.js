let express = require("express");
let connection = require("./storage/db");
let authRouter = require("./auth");
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/news",authRouter)
app.get("/",(req,res)=>{
  res.send("App Working")
})
let PORT = process.env.PORT || 8080;
app.listen(PORT, async () => { 
    await connection;
    console.log("db connected");
  console.log("server started successfully!");
});
 