const mongoose = require('mongoose')
const Anime = require('./models/anime')

mongoose
  .connect('mongodb://127.0.0.1/anime_db')
  .then(res => console.log('connected to mongodb'))
  .catch(err => console.log(err))

const seedsAnime = [
  {
    title: 'Kimi No Na wa',
    genre: ['romance', 'supernatural'],
    rating: 9,
    description:
      'Mitsuha Miyamizu is a high school girl living in the countryside town of Itomori. She yearns for a life in Tokyo, as she is sick of living in the countryside. At the same time, Taki Tachibana, a high school student, lives in Tokyo and has a great interest in architecture, aiming to become an urban planner in the near future.',
    type: 'movie'
  },
  {
    title: 'Bocchi The Rock',
    genre: ['comedy','music', 'slice of life'],
    rating: 9,
    description:
      'Yearning to make friends and perform live with a band, lonely and socially anxious Hitori "Bocchi" Gotou devotes her time to playing the guitar. On a fateful day, Bocchi meets the outgoing drummer Nijika Ijichi, who invites her to join Kessoku Band when their guitarist, Ikuyo Kita, flees before their first show. Soon after, Bocchi meets her final bandmate—the cool bassist Ryou Yamada.',
    type: 'tv'
  }
]

Anime.insertMany(seedsAnime)
.then(res => console.log(res))
