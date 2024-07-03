const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "cardnum":{type:String,required:true},
        "cvv":{type:String,required:true},
        "dob":{type:String,required:true},
        "name":{type:String,required:true}
        }
)

let paymodel = mongoose.model("payments",schema);
module.exports={paymodel}
