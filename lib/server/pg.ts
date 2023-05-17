import {Pool} from 'pg'

export const pool = new Pool({
    connectionString: process.env.DB_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})