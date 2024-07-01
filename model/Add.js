const mongoose= require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "price":{type:String,required:true},
        "no":{type:String,required:true},
        "image":{type:String,required:true}
    })

    let usermodel=mongoose.model("users",schema);
    module.exports={usermodel}