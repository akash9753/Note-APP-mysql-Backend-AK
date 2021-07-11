const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

//list of routers
const routerUser = require('./routes/user')
const routerNote = require('./routes/note')
const { response } = require('express')

const app = express()

app.use(bodyParser.json())


app.use((request,response,next)=>{
    if (request.url == '/user/login' || request.url == '/user/register'){
        //do not check for token
        next()
    }else{
         try{
         const token = request.headers['x-auth-token']
         const data = jwt.verify(token, '123456789cvbnmh')
         console.log(data['id'])
         
         request.userId = data['id']
         console.log([request.userId])
         //if everythings looks okay, go to the real handler
         next()
        }catch(ex){
            response.status = 401
            response.send('u r not authorized to access this API')
        }
    }
      
})

//add the routers
app.use('/user',routerUser)
app.use('/note',routerNote)

app.listen(4000, '0.0.0.0', ()=>{
    console.log('server strated on port 4000')
})