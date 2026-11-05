"use strict";

const { neon } = require('@neondatabase/serverless');
const { getConnectionString } = require('@netlify/database');

module.exports = neon(process.env.DATABASE_URL || getConnectionString());
