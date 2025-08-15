import { neon } from '@neondatabase/serverless'
import { ENV } from './env.js'

//creating db connection
export const sql = neon(ENV.DATABASE_URL)