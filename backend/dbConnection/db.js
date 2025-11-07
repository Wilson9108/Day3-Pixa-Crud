let mongoose = require('mongoose')

async function dbConnect(url){
    try{
     let connect = await mongoose.connect(url)
     console.log("database connected successfully")
    }catch(e){
        console.log("error : " , e.message)
    }
}


module.exports={dbConnect}