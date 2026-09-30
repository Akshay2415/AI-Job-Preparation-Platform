const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/users.model');

const registerUser = async (req, res)=>{
    
    try{
        const {username , email, password} = req.body;

        const isExist = await userModel.findOne({
            email : email
        })
        if(isExist){
            return res.status(400).json({
                message : "User already exists"
            })
        }

        //Hashing Password
        const hashedPass = await bycrypt.hash(password,10)

        //Create User
        const user = await userModel.create({
            username,
            email,
            password :hashedPass
        })

        return res.status(200).json({
            id :user._id,
            username :user.username,
            email : user.email
        })
    }catch(error){
        console.error(error)

        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}


const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        //find user by email
        const user = await userModel.findOne({
            email:email
        })
        if(!user){
            return res.status(401).json({
                message :"Invalid email or password"
            })
        }

        //compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                message :"Invalid password"
            })
        }

        //Create token after successful authentication
        const token = jwt.sign(
            {
            id: user._id,
            email: user.email
            },
            process.env.JWT_SECRET,
            {
            expiresIn: "7d"
            }
        )

        return res.status(200).json({
                message: "Login successful",
                token
        });
    }catch(error){
        console.error(error)

        return res.status(500).json({
            message:"Something went wrong"
        })
    }
    
}

module.exports = {registerUser,
    loginUser
}