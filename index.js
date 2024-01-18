const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")

const app=express()

const url="mongodb://localhost/mydb"

// const username="rachit1031"
// const mongo_pass="w0rZ7ob7fFGSpHKm"

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
const userRouter=require("./routers/users")

app.set("view engine","ejs")

con.on("open",()=>{
    console.log("connected")
})

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())

app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.render("home")
})

app.listen(9000,()=>{
    console.log("server started")
})