const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
    name: String,
    tag: {
      faculity: String,
      round: String,
      projects: String,
      course: String,
    },
    description: String,
    date: String,
    term: String
})

module.exports = model('selections', schema)