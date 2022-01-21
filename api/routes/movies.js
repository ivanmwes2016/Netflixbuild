const express = require('express');
const Movie = require('../models/Movie');

const app = express();

//ADD MOVIE
app.post('/add', async (req, res) => {
    try{

        const newMovie = new Movie({
            title: req.body.title,
            desc: req.body.desc
    
        })
        const movie = await newMovie.save()
        res.status(200).json(movie)

    }catch(e){
        req.status(404).json("Movie not Found")
    }
})


//UPDATE

app.patch('/:id', async (req, res) => {

    const updates = Object.keys(req.body)

    try{
        const movies = await Movie.findById(req.params.id)
        updates.forEach((update) => {
            movies[update] = req.body[update]
        })
        await movies.save()

        if(!movies){
            return res.status(404).json("No such Movie")
        }
        res.status(200).json(movies)

    }catch(e) {
        res.status(400).json(e)
    }

})


//DeleteMovie

app.delete('/:id', async (req, res) =>{

    try{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json( 'Movie has been deleted...')

    if(!movie){
        res.status(404).json('No such movie')
    }

    }catch(e){
        res.status(403).json(e)
    }
})

//getAll
app.get('/all', async(req, res) => {
    try{
        Movie.find({}).then((users) => {
            res.status(200).json(users)
        })

    }catch(e){
        res.send(e)
    }
})




module.exports = app;