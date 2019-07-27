// setup the TODO model

const mongoose = require('mongoose')

// define ToDo schema and collection
const todo = new mongoose.Schema(
    {
        name: {
            type: String
        },
        done: {
            type: Boolean
        }
    },
    {
        collection: 'todos'
    }
)

module.exports = mongoose.model('Todo', todo)