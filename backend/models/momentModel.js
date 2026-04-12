import { query } from '../config/db.js';

class MomentModel{
    static async createMoment(momentData){
    const {clerk_user_id,memory_id,date,title,img_url,description} = momentData;
    const sql = `
      insert into moment_data (
	clerk_user_id, memory_id, date, title, img_url, description) values (
	$1, $2, $3, $4, $5, $6)
    returning *;
    `;

    const values = [clerk_user_id, memory_id, date, title, img_url, description];

    try{
      const result = await query(sql, values);
      return result.rows[0];
    } catch (err){
      throw new Error('Error creating moment: ' + err.message);
    }
  }

  static async getMomentsByMemoryId(clerk_user_id, memoryId, limit = 12, offset = 0){
    const sql = `
      SELECT * FROM moment_data WHERE clerk_user_id = $1 AND memory_id=$2 ORDER BY date DESC LIMIT $3 OFFSET $4;`
      ;

      try{
        const result = await query(sql, [clerk_user_id, memoryId, limit, offset]);
        return result.rows;
      } catch (err){
        throw new Error('Error fetching moments: ' + err.message);
      }
  }

  static async deleteMoment(momentId, memoryId){
    const sql = `
      DELETE FROM moment_data WHERE moment_id=$1 AND memory_id=$2 RETURNING *;
    `;
    try{
      const result = await query(sql, [momentId, memoryId]);
      
      return result.rows[0];
    } catch (err){      
      throw new Error('Error deleting moment: ' + err.message);
    }
  }
}

export default MomentModel;