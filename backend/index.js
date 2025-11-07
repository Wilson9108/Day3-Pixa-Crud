let {dbConnect} =require('./dbConnection/db')
require('dotenv').config()
dbConnect('mongodb+srv://wilsonpulivelugula_db_user:Rk2ob9z7JPuBfod9@pixa.kcddu4d.mongodb.net/pixacrud')
let express = require("express")
let {employe} = require('./models/employe')
let {employeRouter} = require('./routers/employe')
let app = express()
let cors = require("cors")
let {port} = process.env
console.log(port)
app.use(cors())
app.use(express.json())

app.use('/employe',employeRouter)
app.get('/',(req,res)=>{
    res.end("this is get methods")
})
app.post('/api/insert',(req,res)=>{
    res.end("this is the insesrt meethod")
})

app.listen(port,()=>console.log(`your port is running on ${port}`))