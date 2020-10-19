const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Name'
    },
    phone: {
        type: String,
        required: true,
        default: 'Phone'
    },
})

module.exports = mongoose.model('Student', studentSchema);