let {employedb} = require('../models/employe')

async function employeInsert(req,res){
    try{
        let {name,email,mobile} = req.body
        let emailExist = await employedb.findOne({email:email})
        console.log(emailExist)
        if(emailExist){
            return res.status(409).json({message:"email already exist"})
        }
        let insert =await employedb.create({name,email,mobile})
       if(insert){
        res.status(200).json({message:'Employe Created Successfully'})
       }
    }catch(e){
        console.error(e.message)
    }
}

async function getEmployees(req,res){
    try{
        let employees = await employedb.find({})
        res.json(employees)

    }catch(e){
        console.error(e.message)
    }
}

async function  deleteEmploye(req,res){
    try{
        let {id} =req.params
        console.log(id)
        let dele = await employedb.findByIdAndDelete(id)
        console.log(dele)
        if(dele){
            res.status(200).json({message:"Deleted Successfully"})
        }

    }catch(e){
        console.error(e.message)
    }
}
async function  updateEmploye(req,res){
    try{
        let {id} =req.params
        let {name,email,mobile} = req.body
        console.log(id)
        let update = await employedb.findByIdAndUpdate(id,{$set:{name,email,mobile}})
        console.log(update)
        if(update){
            res.status(200).json({message:"updated Successfully"})
        }

    }catch(e){
        console.error(e.message)
    }
}


module.exports={employeInsert,getEmployees,deleteEmploye,updateEmploye}