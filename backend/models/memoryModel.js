import pool, { query } from '../config/db.js';

const fetchTimeline = async (groupId) => {
  const sql = `
    SELECT m.*, 
    COALESCE(JSON_AGG(me.* ORDER BY me.id) FILTER (WHERE me.id IS NOT NULL), '[]') as elements
    FROM memories m
    LEFT JOIN memory_elements me ON m.id = me.memory_id
    WHERE m.group_id = $1
    GROUP BY m.id
    ORDER BY m.event_date ASC;
  `;
  const { rows } = await query(sql, [groupId]);
  return rows;
};

const createWithElements = async (memoryData, elements) => {
  const { group_id, memory_name, overall_desc, event_date, location } = memoryData;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const res = await client.query(
      `INSERT INTO memories (group_id, memory_name, overall_desc, event_date, location) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [group_id, memory_name, overall_desc, event_date, location]
    );
    const memoryId = res.rows[0].id;

    for (const item of elements) {
      await client.query(
        `INSERT INTO memory_elements (memory_id, media_url, media_type, sub_heading, item_desc) 
         VALUES ($1, $2, $3, $4, $5)`,
        [memoryId, item.mediaUrl, item.mediaType, item.subHeading, item.itemDesc]
      );
    }
    await client.query('COMMIT');
    return memoryId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// 1. Group them into an object
const Memory = {
  fetchTimeline,
  createWithElements
};

// 2. Now you can safely export default
export default Memory;