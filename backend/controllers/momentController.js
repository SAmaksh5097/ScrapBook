import MomentModel from "../models/momentModel.js";

export const addMoment = async (req,res)=>{
    try{
        const moment = await MomentModel.createMoment(req.body);
        res.status(201).json({ message: "Moment added successfully!", moment });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getMomentsByMemoryId = async (req,res)=>{
    const memoryId = req.params.memoryId;
    
    try{
        const moments = await MomentModel.getMomentsByMemoryId(memoryId);        
        res.status(200).json(moments);
    } catch(err){        
        res.status(500).json({ error: err.message });
    }
}

