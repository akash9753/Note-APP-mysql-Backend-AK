const express = require('express')
const cryptoJs = require('crypto-js')
const db = require('../db')
const utils = require('../utils')
const mailer = require('../mailer')
const jwt = require('jsonwebtoken')

const router = express.Router()

// /user/register
router.post('/register',(request, response)=>{
    //console.log(request.body)
    
       const{firstName, lastName, email, password, mobile} = request.body
      // console.log(`${firstName}`)
       
       const encryptedPassword = cryptoJs.MD5(password)
       const statement = `insert into user(firstname, lastname,email,password,mobile)
       values('${firstName}','${lastName}','${email}','${encryptedPassword}','${mobile}')`
       
       db.query(statement,(error,dbResult)=>{
           const result = {}
           if(error){
               //error occured
               response.send(utils.sendError(error))
           }else{
            
            const subject = `Welcome to Motion Soft Pvt Ltd`
            const body = `
            <h1>Welcome to Motion Soft Pvt Ltd</h1>
            <h2>Registration Successful </h2>
            <h2>Pls Login</h2>`
            mailer.sendEmail(email,subject,body, (emailError,info) =>{
                response.send(utils.sendSuccess(dbResult))
            })

            
           }
           
       })
       
})

router.post('/login',(request,response)=>{
    const {email, password} = request.body
     const encryptedPassword = cryptoJs.MD5(password)
     const statement = `select * from user where email = '${email}' and password = '${encryptedPassword}'`
    db.query(statement, (error, users)=>{
        if(error){
            response.send(error)
        }else{
         if(users.length == 0){
            response.send({status: 'error', error:error} )
         }else{
             const user = users[0]
             const data = {id:user['id']}
             const token = jwt.sign(data,'123456789cvbnmh')
            response.send({status: 'success', data:token} )
         }
        }
        
    })
})
// /user
router.get('/',(request,response)=>{
    const statement = `select * from user`
    db.query(statement, (error, users)=>{
        response.send(utils.sendResult(error, users)) 
    })
})

// /user/profile/<id>
router.get('/profile',(request,response)=>{
    //const {id}  = request.params
    const statement = `select id, firstname, lastname, email, mobile from user where id = ${request.userId}`
    db.query(statement, (error, users)=>{
        if(users.length>0){
            const user = users[0]
            response.send(utils.sendResult(error, user)) 
        }else{
            
            response.send(utils.sendError('there is no user with that id')) 
        }
    }) 
})

router.put('/profile',(request,response)=>{
    //const {id}  = request.params
    const {firstname,lastname,email,mobile} = request.body
    const statement = `update user set 
    firstname='${firstname}',
    lastname = '${lastname}',
    email = '${email}',
    mobile = '${mobile}'
    where id = ${request.userId}`
    
    db.query(statement, (error, result)=>{
        response.send(utils.sendResult(error, result)) 
        
    }) 
})

router.delete('/profile',(request,response)=>{
    //const {id}  = request.params
    //console.log(`id = ${id}`)
    const statement = `delete from user where id = ${request.userId}`
    db.query(statement, (error, result)=>{
        response.send(utils.sendResult(error, result)) 
    }) 
})
module.exports = router