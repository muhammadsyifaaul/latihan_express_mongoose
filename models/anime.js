const mongoose = require('mongoose')


const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 25,
        required: true
    },
    genre: {
        type: [String],
    validate: {
      validator: function(array) {
        return array.length > 0;  
      },
      message: 'Genre should have at least one genre'
    },
    required: true
    },
    rating: {
        type: Number,
        min:1,
        required: true
    },
    description: {
        type: String,
        max: 150,
        required: true
    },
    type: {
        type: String,
        enum: ['tv','ona','movie','ova']
    }
})

const Anime = mongoose.model('Anime',animeSchema)
module.exports = Anime