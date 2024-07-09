const Task = require("../model/task.model");

exports.createTask = async(req,res)=>{
    try {
       const taskData = await Task.create(req.body)
       res.status(200).send({data:taskData})
    } catch (error) {
        res.status(500).send({message:`${error.message}`});
    }
}

exports.featchTask = async(req,res)=>{
    try {
        const taskData = await Task.find()
        if(!taskData){
            res.status(200).send({message:"data not found"})
        }
        res.status(200).send({data:taskData,message:"data fetch successfully"})
    } catch (error) {
        res.status(500).send({message:`${error.message}`});
    }
}

exports.deleteTask = async(req,res)=>{
    try {
       await Task.findByIdAndDelete(req.params.id).then(data=>{
        res.status(200).send({message:'task deleted successfully'})
       })
    } catch (error) {
        res.status(500).send({message:`${error.message}`});
    }
}