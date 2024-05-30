const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://nch0123ca:6vRwCS5T9ZpLR2ab@coachnpayroll.1zfwp8k.mongodb.net/users")

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/getUser/:id',(req, res) =>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}
)

app.put('/updateUser/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        name: req.body.name, 
        location: req.body.location, 
        email: req.body.email,    
        phone: req.body.phone,
        hour: req.body.hour,
        hourlyWage: req.body.hourlyWage,
        totalSalary: req.body.totalSalary,
        gender: req.body.gender
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post("/createUser",(req,res) => {
    UserModel.create(req.body)
    .then(user => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log("Server is Running")
})