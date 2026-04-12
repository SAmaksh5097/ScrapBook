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
  const clerk_user_id = req.params.clerk_user_id;
  const year = req.params.year;
  

  try{
    const memories = await MemoryModel.getyearMemoriesByUserId(clerk_user_id, year);
    if(memories.length === 0){
      return res.status(404).json({ message: "No memories found for this user and year." });
    }
    res.status(200).json(memories);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};

export const getMemoriesWithMoments = async (req,res)=>{
  const clerk_user_id = req.params.clerk_user_id;
  const year = req.params.year;

  try{
    const rows = await MemoryModel.getMemoriesWithMomentsByYear(clerk_user_id, year);
    if(rows.length === 0){
      return res.status(404).json({ message: "No memories found for this user and year." });
    }
    
    // Transform flat result set into nested structure
    const memoriesMap = new Map();
    
    rows.forEach(row => {
      if (!memoriesMap.has(row.memory_id)) {
        memoriesMap.set(row.memory_id, {
          memory_id: row.memory_id,
          clerk_user_id: row.clerk_user_id,
          title: row.title,
          date: row.date,
          cover_img_url: row.cover_img_url,
          location: row.location,
          description: row.description,
          moments: []
        });
      }
      
      // Add moment only if it exists (moment_id is not null)
      if (row.moment_id !== null) {
        memoriesMap.get(row.memory_id).moments.push({
          moment_id: row.moment_id,
          title: row.moment_title,
          date: row.moment_date,
          img_url: row.img_url,
          description: row.moment_description
        });
      }
    });
    
    const memoriesWithMoments = Array.from(memoriesMap.values());
    res.status(200).json(memoriesWithMoments);
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
  const clerk_user_id = req.params.clerk_user_id;

  if (!clerk_user_id) {
    return res.status(400).json({ error: 'Clerk user id is required.' });
  }
  
  try{
    const years = await MemoryModel.getDistinctYears(clerk_user_id);
    res.status(200).json(years);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
}

export const deleteMemory = async (req, res) => {
  const memoryId = parseInt(req.params.memoryId, 10);
  const {userId} = req.auth;

  if (Number.isNaN(memoryId)) {
    return res.status(400).json({ error: 'Invalid memory id.' });
  }

  try {
    const memory = await MemoryModel.getMemoryById(memoryId);
    if(!memory) {
      return res.status(404).json({ error: 'Memory not found.' });
    }
    if (memory.clerk_user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this memory.' });
    }
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