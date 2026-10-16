const mongooose = require('mongoose')


const userSchema = new mongooose.Schema({
    username : {
        type : String,
        required :[true,"Username already exists"],
        unique:true
    },
    email : {
        type :String,
        required : [true,"Email already taken"],
        unique :true
    },
    password :{
        type :String,
        required :true
    }
},{
    timestamps : true
})

const userModel = mongooose.model("users", userSchema)


module.exports = userModel 