import MomentModel from "../models/momentModel.js";
import MemoryModel from "../models/memoryModel.js";

export const addMoment = async (req,res)=>{
    try{
        const { clerk_user_id, memory_id, day, date } = req.body;

        let finalDate = date;

        if (day !== undefined && day !== null && day !== '') {
            const memory = await MemoryModel.getMemoryById(memory_id);

            if (!memory) {
                return res.status(404).json({ error: "Memory not found." });
            }

            let year;
            let month;

            // Extract year/month in a timezone-safe way so month does not drift.
            if (memory.date instanceof Date) {
                year = memory.date.getFullYear();
                month = memory.date.getMonth() + 1;
            } else if (typeof memory.date === 'string') {
                const match = memory.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (match) {
                    year = parseInt(match[1], 10);
                    month = parseInt(match[2], 10);
                }
            }

            if (!year || !month) {
                const parsed = new Date(memory.date);
                year = parsed.getFullYear();
                month = parsed.getMonth() + 1;
            }

            const parsedDay = parseInt(day, 10);

            if (Number.isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31) {
                return res.status(400).json({ error: "Invalid day value." });
            }

            const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

            if (parsedDay > daysInMonth) {
                return res.status(400).json({ error: "Day exceeds days in memory month." });
            }

            const monthPart = String(month).padStart(2, '0');
            const dayPart = String(parsedDay).padStart(2, '0');
            finalDate = `${year}-${monthPart}-${dayPart}`;
        }

        const moment = await MomentModel.createMoment({
            ...req.body,
            date: finalDate,
        });
        res.status(201).json({ message: "Moment added successfully!" });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getMomentsByMemoryId = async (req,res)=>{
    const clerk_user_id = req.params.clerk_user_id;
    const memoryId = req.params.memoryId;
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    
    try{
        const moments = await MomentModel.getMomentsByMemoryId(clerk_user_id, memoryId, limit, offset);        
        const hasMore = moments.length === limit;
        res.status(200).json({ moments, hasMore });
    } catch(err){        
        res.status(500).json({ error: err.message });
    }
}

export const deleteMoment = async (req,res)=>{
    const {momentId, memoryId} = req.body;    
    try{
        const deletedMoment = await MomentModel.deleteMoment(momentId, memoryId);
        res.status(200).json({ message: "Moment deleted successfully!" });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

