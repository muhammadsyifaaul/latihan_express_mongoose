const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const Anime = require('./models/anime')
const methodOverride = require('method-override')


mongoose.connect('mongodb://127.0.0.1/anime_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

// app.set('views', path.join(__dirname,"views"))

app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('view engine','ejs')
app.set('layout', 'layouts/layout');


app.get('/', (req,res) => {
    res.redirect('/home')
})

app.get('/home',async(req,res) => {
    const allAnime = false
    const {title, genre} = req.query
    try {
        if(title) {
        const anime = await Anime.find({title : {$regex: title, $options: 'i'}})
        res.render('index', {
            title: 'Home | Praktik Crud',
            layout: 'layouts/main-layout',
            animes: anime,
            allAnime: true
        })
        } else if(genre) {
            const anime = await Anime.find({genre : {$regex: genre, $options: 'i'}})
        res.render('index', {
            title: 'Home | Praktik Crud',
            layout: 'layouts/main-layout',
            animes: anime,
            allAnime: true
        })
        } 
        else {
            const animes = await Anime.find()
        res.render('index',{
            title: 'Home | Praktik Crud',
            layout: 'layouts/main-layout',
            animes,
            allAnime
        })
        }
    }catch {
        res.status(500).send('Internal Server Error');
    }  
})
app.get('/addAnime', (req,res) => {
    res.render('addAnime', {
        layout: 'layouts/main-layout',
        title: 'Add Anime | Praktik Crud'
    })
})

app.post('/addAnime', async (req,res) => {
    try {
        const {title,genre, rating,type,description} = req.body
    const arrayGenre = genre.split(',').map(g => g.trim())
    const anime = new Anime({
        title,
        genre: arrayGenre,
        rating,
        type,
        description
    })
    // const anime = new Anime(req.body)
    await anime.save()
    res.redirect('/home')
    } catch(err) {
        console.log(err)
    }
})



app.get('/editAnime/:id', async(req,res) => {
    try {
        const anime = await Anime.findById(req.params.id)
        res.render('editAnime', {
            layout: 'layouts/main-layout',
            title: 'Edit Anime | Praktik Crud',
            anime
        })
    }catch {
        res.status(500).send('Internal Server Error');
    }
})
app.put('/editAnime/:id', async (req,res) => {
    const {id} = req.params
    const {title,genre,rating,type,description} = req.body
    const genreArray = genre.split(',').map(g => g.trim())
    const update = {title,genre: genreArray,rating,type,description}

    try {
        const anime = await Anime.findByIdAndUpdate(id, update, {
            runValidators: true
        })
        res.redirect('/home')
    } catch(err) {
        console.log(err)
    }
})

app.delete('/deleteAnime/:id', async (req,res) => {
    try {
        const {id} = req.params
        await Anime.findByIdAndDelete(id)
        res.redirect('/home')
    } catch(err) {
        console.log(err)
    }
})


app.listen(3000, () => {
    console.log('server is running')
})
