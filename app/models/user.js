// setup the TODO model

const mongoose = require('mongoose')

// define ToDo schema and collection
const user = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Must have a first name!']
        },
        lastname: {
            type: String,
            required: [true, 'Must have a last name!']
        },
        email: {
            type: String,
            required: [true, 'Must have an email']
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        collection: 'users'
    }
)

module.exports = mongoose.model('User', user)