import MemoryModel from "../models/memoryModel.js";

export const addMemory = async (req, res) => {
  try{
    const { date } = req.body;
    const normalizedDate = /^\d{4}-\d{2}$/.test(date) ? `${date}-01` : date;

    const memory = await MemoryModel.createMemory({
      ...req.body,
      date: normalizedDate,
    });
    res.status(201).json({ message: "Memory added successfully!", memory });
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};
  
export const getUserMemories = async (req,res)=>{
  const userId = parseInt(req.params.userId);
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

export const getDistinctYears = async (req,res)=>{
  
  const userId = parseInt(req.params.userId,10);
  
  try{
    const years = await MemoryModel.getDistinctYears(userId);
    res.status(200).json(years);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
}

export const deleteMemory = async (req, res) => {
  const memoryId = parseInt(req.params.memoryId, 10);

  if (Number.isNaN(memoryId)) {
    return res.status(400).json({ error: 'Invalid memory id.' });
  }

  try {
    const deletedMemory = await MemoryModel.deleteMemoryWithMoments(memoryId);

    if (!deletedMemory) {
      return res.status(404).json({ message: 'Memory not found.' });
    }

    return res.status(200).json({
      message: 'Memory and related moments deleted successfully!',
      memory: deletedMemory,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};