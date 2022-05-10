const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
    faculity: Array,
    round: Array,
    projects: Array,
    course: Array
})

module.exports = model('selections', schema)