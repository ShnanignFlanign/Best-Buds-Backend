const db = require('../models')
const bcrypt = require('bcrypt')


const signUp = (req,res) =>{
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    db.User.findOne({username:req.body.username}, (err,userExists) =>{
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
    db.User.find({}, (err,users) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            console.log(users)
            return res.status(200).json({users})
        }
    })
}

const signIn = (req,res) =>{
    db.User.findOne({email:req.body.email}, (err,foundUser) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(foundUser){
                if(validLogin){
                    return res.status(200).json({foundUser:req.session.currentUser})
                }else{
                    //do something
                }
            }
        }
    })
}

const signOut = (req,res) =>{
    req.session.destory()
    res.redirect('/')
}

module.exports = {
    getUser,
    signUp,
    signIn,
    signOut
}