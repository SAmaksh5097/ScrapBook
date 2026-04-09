import pool, { query } from '../config/db.js';

class MemoryModel{
  static async ensureUserExists(clerk_user_id){
    const sql = `
      INSERT INTO user_data (clerk_user_id)
      VALUES ($1)
      ON CONFLICT (clerk_user_id) DO NOTHING;
    `;

    try{
      await query(sql, [clerk_user_id]);
    } catch (err){
      throw new Error('Error ensuring user exists: ' + err.message);
    }
  }

  static async createMemory(memoryData){
    const {clerk_user_id,title,date,cover_img_url,location,description} = memoryData;
    
    const sql = `
      insert into memory_data (
	clerk_user_id, title, cover_img_url, location, date, description) values (
	$1, $2, $3, $4, $5, $6)
    returning *;
    `;

    const values = [clerk_user_id, title, cover_img_url, location, date, description];

    try{
      const result = await query(sql, values);
      
      return result.rows[0];
    } catch (err){
      throw new Error('Error creating memory: ' + err.message);
    }
  }

  static async getyearMemoriesByUserId(clerk_user_id, year){
    const sql = `
      SELECT * FROM memory_data WHERE clerk_user_id=$1 and EXTRACT(YEAR FROM date) = $2 ORDER BY date;
    `;
    
    try{
      const result = await query(sql, [clerk_user_id, year]);
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


  static async getDistinctYears(clerk_user_id){
    await this.ensureUserExists(clerk_user_id);
    
    const sql = `
      SELECT DISTINCT EXTRACT(year FROM date) as year FROM memory_data WHERE clerk_user_id=$1 ORDER BY year;
    `;
    try{
      const result = await query(sql, [clerk_user_id]);
      
      return result.rows;
    } catch (err){
      throw new Error('Error fetching distinct years: ' + err.message);
    }
  }

  static async getMemoriesWithMomentsByYear(clerk_user_id, year){
    const sql = `
      SELECT 
        m.memory_id,
        m.clerk_user_id,
        m.title,
        m.date,
        m.cover_img_url,
        m.location,
        m.description,
        mo.moment_id,
        mo.title as moment_title,
        mo.date as moment_date,
        mo.img_url,
        mo.description as moment_description
      FROM memory_data m
      LEFT JOIN moment_data mo ON m.memory_id = mo.memory_id AND mo.clerk_user_id = $1
      WHERE m.clerk_user_id = $1 AND EXTRACT(YEAR FROM m.date) = $2
      ORDER BY m.date, mo.date;
    `;
    
    try{
      const result = await query(sql, [clerk_user_id, year]);
      return result.rows;
    } catch (err){
      throw new Error('Error fetching memories with moments: ' + err.message);
    }
  }

  static async deleteMemoryWithMoments(memoryId){
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM moment_data WHERE memory_id=$1;', [memoryId]);

      const memoryResult = await client.query(
        'DELETE FROM memory_data WHERE memory_id=$1 RETURNING *;',
        [memoryId]
      );

      await client.query('COMMIT');
      return memoryResult.rows[0] || null;
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error('Error deleting memory: ' + err.message);
    } finally {
      client.release();
    }
  }
}

export default MemoryModel;