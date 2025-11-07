let express = require('express')
let employeRouter = express.Router()
let {employeInsert,getEmployees,deleteEmploye,updateEmploye} = require('../controllers/employe')

employeRouter.get('/',getEmployees)
employeRouter.post('/api/insert',employeInsert)
employeRouter.delete('/api/delete/:id',deleteEmploye)
employeRouter.put('/api/update/:id',updateEmploye)

module.exports={employeRouter}