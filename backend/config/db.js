import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
        require: true
    }
});

pool.on('connect',()=>{
    console.log("ScrapBook database connected successfully ✅");
});

pool.on('error',(err)=>{
    console.error("Error connecting to the ScrapBook database ❌", err);
    process.exit(-1);
})

export const query = (text, params) => pool.query(text, params);
export default pool;
