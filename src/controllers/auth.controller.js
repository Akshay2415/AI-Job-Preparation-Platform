const bycrypt = require('bcrypt')
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

module.exports = {registerUser}