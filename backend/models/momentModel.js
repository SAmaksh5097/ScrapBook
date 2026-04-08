import { query } from '../config/db.js';

class MomentModel{
    static async createMoment(momentData){
    const {memory_id,date,title,img_url,description} = momentData;
    const sql = `
      insert into moment_data (
	memory_id, date, title, img_url, description) values (
	$1, $2, $3, $4, $5)
    returning *;
    `;

    const values = [memory_id, date, title, img_url, description];

    try{
      const result = await query(sql, values);
      return result.rows[0];
    } catch (err){
      throw new Error('Error creating moment: ' + err.message);
    }
  }

  static async getMomentsByMemoryId(memoryId){
    const sql = `
      SELECT * FROM moment_data WHERE memory_id=$1 ORDER BY date;`
      ;

      try{
        const result = await query(sql, [memoryId]);
        return result.rows;
      } catch (err){
        throw new Error('Error fetching moments: ' + err.message);
      }
  }
}

export default MomentModel;