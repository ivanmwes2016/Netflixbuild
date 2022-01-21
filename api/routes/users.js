const router = require('express').Router()
const express = require('express')
const User = require('../models/User')
const CryptoJS = require ('crypto-js')
const verify = require('../verifyToken')

const app = express()

//UPDATE

app.put('/:id', verify, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'password', 'profilePic', 'isAdmin']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).json('Invalid updates!')
    }

    //Hashing the Password
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }

    try{

        const user = await User.findById(req.params.id)
        updates.forEach((update) =>{
            user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        if(!user){
            return res.status(404).send('User doesnot exist')
        }
        res.status(200).json(user)
    }catch(e) {
        res.status(400).json(e)
    }
})


//DELETE
app.delete('/:id', verify, async (req, res) => {

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("user has been deleted..")

            if(!user){
                return res.status(404).send('User doesnot exist')
            }
        } catch(e){
            res.status(403).send()
    
        }

})

//GET
//GETALL
//GET USER STATS


module.exports = app;