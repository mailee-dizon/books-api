import { sql } from "../src/config/db.js";

export async function addBooks(req, res) {
    try {
        const { user_id, work, status } = req.body

        if (!user_id || !work || !status) {
            return res.status(400).json({ message: "All fields must be completed" })
        }

        const books = await sql`
            INSERT INTO user_books(user_id, work, status)
            VALUES (${user_id}, ${work}, ${status})
            RETURNING *
        `

        res.status(201).json(books)
    } catch (error) {
        console.log("Error adding book", error)
        res.status(500).json({ error:"Something went wrong" });    
    }
}

export async function changeBookStatus(req, res) {
    try {
        const { user_id } = req.params
        const { isbn, status } = req.body
        
        if (!user_id || !isbn || !status) {
            return res.status(400).json({ message: "All fields must be completed" })
        }

        const books = await sql`
            UPDATE user_books
            SET status = ${status}
            WHERE user_id = ${user_id} AND isbn = ${isbn}
            RETURNING *
        `
        res.status(201).json(books)

    } catch (error) {
        console.log("Error changing book status", error)
        res.status(500).json({ error:"Something went wrong" });  
    }
}

export async function getWTRByUsername(req, res) {
    try {
        const { user_id } = req.params

        const books = await sql`
            SELECT * FROM user_books
            WHERE status = 'want_to_read' AND user_id = ${user_id}
            ORDER BY added_date
        `

        res.status(201).json(books)
    } catch (error) {
        console.log("Error getting users want to read", error)
        res.status(500).json({error:"Something went wrong"});    
    }
}

export async function getReadByUsername(req, res) {
    try {
        const { user_id } = req.params

        const books = await sql`
            SELECT * FROM user_books
            WHERE status = 'read' AND user_id = ${user_id}
            ORDER BY added_date
        `
        res.status(201).json(books)
    } catch (error) {
        console.log("Error getting users read", error)
        res.status(500).json({error:"Something went wrong"});  
    }
}

export async function getCurrentReadByUsername(req, res) {
    try {
        const { user_id } = req.params

        const books = await sql`
            SELECT * FROM user_books
            WHERE status = 'currently_reading' AND user_id = ${user_id}
            ORDER BY added_date
        `

        res.status(201).json(books)
    } catch (error) {
        console.log("Error getting users currently reading", error)
        res.status(500).json({error:"Something went wrong"});  
    }
}

export async function getUsersBooks(req, res) {
    try {
        const { user_id } = req.params

        const books = await sql`
            SELECT * FROM user_books
            WHERE user_id = ${user_id}
            ORDER BY added_date
        `

        res.status(201).json(books)
    } catch (error) {
        console.log("Error getting users currently reading", error)
        res.status(500).json({error:"Something went wrong"});  
    }
}

export async function removeBook(req, res) {
    try {
        const { user_id } = req.params
        const { isbn } = req.body

        if (!isbn) {
            res.status(400).json({ message: "Need a book" })
        }

        const book = await sql`
            DELETE FROM user_books
            WHERE user_id = ${user_id} AND isbn = ${isbn}
            RETURNING *
        `
        if (book.length === 0) {
            return res.status(400).json({ message: "No book found under this user" })
        }

        return res.status(201).json({ message: "Book deleted successfully" })
    } catch (error) {
        console.log("Error removing book", error)
        res.status(500).json({error:"Something went wrong"});          
    }
}