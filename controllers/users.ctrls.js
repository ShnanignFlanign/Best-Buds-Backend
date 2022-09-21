const db = require('../models')

// const signUp = (req,res) =>{
//     db.User.findOne({username:req.body.username}, (err,userExists) =>{
//         if(userExists){
//             //do something
//         }else{
//             return res.status(200).json({
//                 db.User.create(req.body, (err,createdUser) =>{
//                     if(err){

//                     }
//                 })
//             })
//         }
//     })
// }