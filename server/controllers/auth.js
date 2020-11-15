const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
// const User = mongoose.model("User");

const {JWT_SECRET} = require('../keys')

exports.signup = (req, res)=>{
  const {name, email, password} = req.body;

  if(!name || !email || !password){
     return res.json({error: "please add all the fields"});
  }

  

  User.findOne({email:email})
  .then(saveduser=>{
      if(saveduser){
          return res.status(400).json({error:"User with that email already exist"})
      }

      bcrypt.hash(password, 12)
      .then(hashedPassword=>{
          const user = new User({name, email, password:hashedPassword});

          user.save()
          .then(user=>{
              return res.status(200).json({message: "User saved successfully"})
          })
          .catch(err=>{
              return res.status(400).json({error: err})
          })
      })

  })
  .catch(err=>{
    return res.status(400).json({error: err})
  })

}

exports.signin = (req, res)=>{
    const {email, password} = req.body;
    console.log(email)
    console.log(password)
    User.findOne({email})
    .then(saveduser=>{
        if(!saveduser){
            console.log('user not found')
            return res.status(400).json({error: "user with that email doesn't exist"})
        }

        bcrypt.compare(password, saveduser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Signin success"})
                const token = jwt.sign({_id: saveduser._id}, JWT_SECRET);
                res.cookie('t', token, {expire: new Date()+9999})
                const {_id, name, email, followers, following} = saveduser;
                return res.status(200).json({token, user:{_id, name, email, followers, following}})
            }else{
                return res.status(422).json({ error: "Invalid email or password" });
            }
        })
    })
    .catch(err=>{
        return res.status(400).json({error:"password not matched"})
    })
}

exports.signout = (req, res) =>{
    res.clearCookie('t');
    res.json({message:"signout success"})
}

exports.requireSignin  =expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty:'auth'
});

