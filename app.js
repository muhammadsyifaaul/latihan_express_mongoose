const express = require('express')
const app = express()
const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1/anime_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))


app.listen(3000, () => {
    console.log('server is running')
})