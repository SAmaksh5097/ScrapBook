import MemoryModel from "../models/memoryModel.js";

export const addMemory = async (req, res) => {
  try{
    const memory = await MemoryModel.createMemory(req.body);
    res.status(201).json({ message: "Memory added successfully!", memory });
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};
  
export const getUserMemories = async (req,res)=>{
  const userId = parseInt(req.body.userId);
  const year = req.params.year;
  
  try{
    const memories = await MemoryModel.getyearMemoriesByUserId(userId, year);
    if(memories.length === 0){
      return res.status(404).json({ message: "No memories found for this user and year." });
    }
    res.status(200).json(memories);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};

export const getMemoryById = async (req,res)=>{
  const memoryId = req.params.memoryId;
  try{
    const memory = await MemoryModel.getMemoryById(memoryId);
    res.status(200).json(memory);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};