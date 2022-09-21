const db = require('../models')

const index = (req,res) =>{
    db.Plant.find({}, (err,plants) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            return res.status(200).json({
                plants,
                requestedAt: new Date().toLocaleDateString
            })
        }
    })
}

const create = (req,res) =>{
    db.Plant.create(req.body, (err, createdPlant) =>{
        if(err){
            return res.status(404).json({error: err.message})
        }else{
            return res.status(200).json({plants:createdPlant}) 
        }
    })
}

const destroy = (req,res) =>{
    db.Plant.findByIdAndDelete(req.params.id, (err, deletedPlant) =>{
        if(err){
            return res.status(400).json({error: err.message})
        }
        if(!deletedPlant){
            return res.status(400).json({error: 'Plant not found'})
        }else{
            return res.status(200).json({message:`${deletedPlant.name} deleted successfully`}) 
        }
    })
}

const update = (req,res) =>{
    db.Plant.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        {new: true},
        (err,updatedPlant) =>{
            if(err){
                return res.status(400).json({error: err.message})
            }else{
                return res.status(200).json(updatedPlant)
            }
        })
}

module.exports = {
    index,
    create,
    destroy,
    update
}