import Memory from '../models/memoryModel.js';

export const getYearbook = async (req, res) => {
  try {
    const { groupId } = req.params;
    const memories = await Memory.fetchTimeline(groupId);
    res.status(200).json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMemory = async (req, res) => {
  const { elements, ...memoryData } = req.body;
  
  if (!elements || elements.length > 5) {
    return res.status(400).json({ error: "Max 5 items allowed." });
  }

  try {
    const id = await Memory.createWithElements(memoryData, elements);
    res.status(201).json({ message: "Pinned to ScrapBook!", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};