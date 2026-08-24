import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SELECT nodeNumber, name, designation, icardVersion FROM dcsn_nodes ORDER BY nodeNumber ASC');
console.table(rows);
await conn.end();
