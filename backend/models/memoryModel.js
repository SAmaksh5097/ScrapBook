import { query } from '../config/db.js';

class MemoryModel{
  static async createMemory(memoryData){
    const {user_id,title,date,cover_img_url,location,description} = memoryData;

    const sql = `
      insert into memory_data (
	user_id, title, cover_img_url, location, date, description) values (
	$1, $2, $3, $4, $5, $6)
    returning *;
    `;

    const values = [user_id, title, cover_img_url, location, date, description];

    try{
      const result = await query(sql, values);
      return result.rows[0];
    } catch (err){
      throw new Error('Error creating memory: ' + err.message);
    }
  }

  static async getyearMemoriesByUserId(userId, year){
    const sql = `
      SELECT * FROM memory_data WHERE user_id=$1 and EXTRACT(YEAR FROM date) = $2 ORDER BY date;
    `;

    try{
      const result = await query(sql, [userId, year]);
      return result.rows;
    } catch (err){
      throw new Error('Error fetching memories: ' + err.message);
    }
  }

  static async getMemoryById(memoryId){
    const sql = `
      SELECT * FROM memory_data WHERE memory_id=$1;
    `;

    try{
      const result = await query(sql, [memoryId]);
      return result.rows[0];
    } catch (err){
      throw new Error('Error fetching memory: ' + err.message);
    }
  }
}

export default MemoryModel;