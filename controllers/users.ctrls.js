const db = require('../models')
const bcrypt = require('bcrypt')
const session = require('express-session')

const signUp = (req,res) =>{
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    db.User.findOne({username:req.body.username}, (err,userExists) =>{
        if(err){
            res.status(404).json({error:err.message})
        }
        if(userExists){
            res.redirect('/users/signin')
        }else{
            db.User.create(req.body, (err,createdUser) =>{
                if(err){
                    return res.status(404).json({error:err.message})    
                }else{
                    return res.status(200).json({user:createdUser})
                }
            })
        }
    })
}

const getUser = (req,res) =>{
    db.User.findOne({email:req.params.email}, (err,foundUser) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            console.log(foundUser)
            return res.status(200).json({foundUser})
        }
    })
}

const signIn = (req,res) =>{
    db.User.findOne({email:req.body.email}, (err,foundUser) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            if(foundUser){
                const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
                if(validLogin){
                    return res.status(200).json({foundUser})
                }else{
                    return res.status(404).json({error: 'Log in failed'})
                }
            }
        }
    })
}

const signOut = (req,res) =>{
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    getUser,
    signUp,
    signIn,
    signOut
}