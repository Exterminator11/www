const express=require("express")

const router=express.Router()

const User=require("../models/user")

router.get("/add_user",(req,res)=>{
    res.render("add_user")
})


router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/update_user",(req,res)=>{
    res.render("update_user")
})

router.get("/delete_user",(req,res)=>{
    res.render("delete_user")
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.username });
        if (!user) {
            return res.status(400).send("Cannot find user");
        }

        if (req.body.password !== user.password) {
            return res.status(400).send("Invalid password");
        }

        res.redirect('/users');
    } catch {
        res.status(500).send("Error! Please try again later");
    }
});


router.get("/",async (req,res)=>{
    try{
        const users=await User.find()
        // res.json(users)
        console.log(users)
        res.render('users', { users: users });
    }
    catch(err){
        res.send("Error! Please try agina later")
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.json(user)
    }
    catch(err){
        res.send("Error! Please try agina later")
    }
})

router.post("/",async (req,res)=>{
    const user=new User(
        {
            name:req.body.name,
            password:req.body.password
        }
    )
    try{
        const a1=await user.save()
        res.send(`User added successfully ${a1.name}`)
    }
    catch(err){
        res.send("Error! Please try agina later")
    }
})

router.post("/update",async (req,res)=>{
    try{
        const user=await User.findOne({name:req.body.username})
        if(!user) return res.status(404).send("User not found")
        user.password=req.body.password
        const a1=await user.save()
        res.send(`Updated user successfully ${a1.name}`)
    }
    catch(err){
        res.send("Error! Please try again later")
    }
})

router.post("/delete",async (req,res)=>{
    try{
        const user=await User.deleteOne({name:req.body.username})
        // res.json(user)
        console.log(user)
        if(!user) return res.status(404).send("User not found")
        res.send("Deleted user successfully")
    }
    catch(err){
        res.send(err)
    }
})

module.exports=router