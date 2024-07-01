const mongoose= require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "price":{type:String,required:true},
        "no":{type:String,required:true},
        "image":{type:String,required:true}
    })

    let foodmodel=mongoose.model("foods",schema);
    module.exports={foodmodel}