const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "name":{type:String,required:true},
        "admno":{type:String,required:true},
        "email":{type:String,required:true},
        "course":{type:String,required:true},
        "phone":{type:String,require:true},
        "dob":{type:String,required:true},
        "password":{type:String,required:true}
        }
)

let usermodel = mongoose.model("users",schema);
module.exports={usermodel}
