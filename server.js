const express = require('express')
const bodyParser = require('body-parser')


//list of routers
const routerUser = require('./routes/user')
const routerNote = require('./routes/note')

const app = express()

app.use(bodyParser.json())

//add the routers
app.use('/user',routerUser)
app.use('/user',routerNote)

app.listen(4000, '0.0.0.0', ()=>{
    console.log('server strated on port 4000')
})