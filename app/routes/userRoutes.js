// define the differnt routes for the users
// all - retrieve all records in collection
// add - add a new user to the collection
// delete - remove a user from the collection
// update - update the content of a user


'use strict'

const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')

//get all the todo from the collection
router.route('/all').get(function(req, res, next){
    user.find(function(err, users){
        if(err) {
            return next(new Error(err))
        } else {
            res.json(users)
        }
    })
})

router.route('/add').post( async (req,res,next)=>{
    console.log(req.body);

    // check if the email already exists in db
    const emailExists = await user.findOne({email:req.body.email})
    // res.send(`add ${emailExists}`)
    if (emailExists) {
        res.status(400).send('User already Exists')
    } else {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const newuser = new user({
    
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
        })

        try{
            const saveUser = await newuser.save()
            res.status(200).send(`User created. ID: ${saveUser._id}`)
        } catch(err) {
            res.status(400).send('Could not create the usre')
        }
    }
})

router.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  
  user.findByIdAndRemove(id, function (err, user) {
    if (err) {
        res.status(404).send(`Unable to find user ID: ${id}`)
    //   return next(new Error('Todo was not found'))
    } else {
        console.log(`User ID:${id} removed`)
        res.status(200).json(`user ${id} removed`)
    }
  })
})

router.route('/update/:id').post(async (req, res, next)=>{
    var id= req.params.id

    // check if the email already exists in db
    const userExists = await user.findById(id)
    if (!userExists) {
        res.status(400).send('User does not exists')
    } else {
        
        // go thorugh user properties to check if modified
        if(req.body.firstname) {
            userExists.firstname = req.body.firstname
        }
        if (req.body.lastname) {
            userExists.lastname = req.body.lastname
        }
        if (req.body.email) {
            userExists.email = req.body.email
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
        }

        try {
                userExists.save()
                res.status(200).send(`User ID:${userExists._id} updated`)
            } catch(err) {
                res.status(400).send(`User ID:${updateUser._id} is not updated`)
            }
    
        }
    })

module.exports = router