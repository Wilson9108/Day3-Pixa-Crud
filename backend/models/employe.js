let mongoose = require('mongoose')


let employeSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true},
    mobile:{type:String}
})


let employedb = mongoose.model('employee' , employeSchema)

module.exports={employedb}