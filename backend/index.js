let {dbConnect} =require('./dbConnection/db')
dbConnect('mongodb+srv://wilsonpulivelugula_db_user:Rk2ob9z7JPuBfod9@pixa.kcddu4d.mongodb.net/pixacrud')
let express = require("express")
let {employe} = require('./models/employe')
let {employeRouter} = require('./routers/employe')
let app = express()
let cors = require("cors")
app.use(cors())
app.use(express.json())

app.use('/employe',employeRouter)

app.listen(2025,()=>console.log('your port is running on 2025'))