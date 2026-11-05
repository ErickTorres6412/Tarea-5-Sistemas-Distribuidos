"use strict";

const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  const statements = fs.readFileSync(__dirname + '/schema.sql', 'utf8')
    .split(';').map((s) => s.trim()).filter(Boolean);
  for (const statement of statements) await sql.query(statement);
  for (const table of ['books', 'authors', 'publishers']) {
    const rows = await sql.query(`SELECT count(*) FROM ${table}`);
    console.log(`${table}: ${rows[0].count} filas`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
