
import express from 'express'
import { ENV } from './config/env.js'
import { sql } from './config/db.js'
import usersRoute from '../routes/usersRoute.js'
import userBooksRoute from '../routes/userBooksRoute.js'
import job from './config/cron.js'

const app = express()
app.use(express.json())

job.start()

const PORT = ENV.PORT

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE,
            bio TEXT,
            pfp TEXT
        )`

        await sql`CREATE TABLE IF NOT EXISTS user_books(
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            work VARCHAR(255),
            added_date DATE NOT NULL DEFAULT CURRENT_DATE,
            status STATUS NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users (id)
        )`;

        await sql`CREATE TABLE IF NOT EXISTS reviews(
            review_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            isbn VARCHAR(13),
            rating INT CHECK (rating >=1 AND rating <= 5),
            posted_at DATE NOT NULL DEFAULT CURRENT_DATE,
            review TEXT,
            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users (id)
        )`

        const num = await sql`SELECT enum_range(null::status)`
    } catch (error) {
        console.error("Error creating table", error)
        process.exit(1)
    }
}

app.get("/api/health", (req, res) => {
    res.status(200).json({success: true})
})

app.use("/api/users", usersRoute)
app.use("/api/userBooks", userBooksRoute)


initDB().then(()=> {
    app.listen(PORT, () => {
        console.log("SERVER RUNNING ON PORT:", PORT)
    })
})

