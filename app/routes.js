// define the differnt routes for the TODO app
// all - retrieve all records in collection
// add - add a new todo to the collection
// delete - remove a todo from the collection
// update - update the content of a todo


'use strict'

const express = require('express')
const router = express.Router()
const todo = require('./todo')

//get all the todo from the collection
router.route('/all').get(function(req, res, next){
    todo.find(function(err, todos){
        if(err) {
            return next(new Error(err))
        } else {
            res.json(todos)
        }
    })
})


router.route('/add').post(function(req, res, next){
    console.log(`Add a new todo %{req.body.name}`)
    todo.create(
        {
            name: req.body.name,
            done: false
        },
        function (err, todo){
            if(err) {
                res.status(400).send('Unable to create ToDo item')
            }
            res.status(201).json(todo)
        }
    )
})

router.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  
  todo.findByIdAndRemove(id, function (err, todo) {
    if (err) {
        res.status(404).send(`Unable to find ToDo itemID: ${id}`)
    //   return next(new Error('Todo was not found'))
    } else {
        console.log(`Todo ID:${id} removed`)
        res.status(200).json(`todo ${id} removed`)
    }
  })
})

router.route('/update/:id').post(function(req, res, next){
    var id= req.params.id

    // res.send(`${id}  ${req.body.name} ${req.body.done}`)

    todo.findById(id, function(error, todo){
        if (error) {
            res.status(404).send(`Unable to find ToDo itemID: ${id}`)
        } else {
            todo.name = req.body.name
            todo.done = req.body.done
            todo.save(function(err, todo){
                if (err) {
                    res.status(400).send('Unable to update ToDo item')
                } else {
                    res.status(200).json(`todo ${id} updated`)
                }
            })
        }
    })


    // todo.findById(id, function(err, todo){
    //     if (err) {
    //        res.status(404).send(`Unable to find ToDo itemID: ${id}`) 
    //     } else {
    //         todo.name = req.body.name
    //         todo.done = req.body.done

    //         todo.save({
    //             function(err, todo){
    //                 if(err) {
    //                     res.status(404).send(`Unable to update ToDo itemID: ${id}`)
    //                 } else {
    //                     res.status(200).json(todo)
    //                 }
    //             }
    //         })
    //     }
    // })
})


module.exports = router