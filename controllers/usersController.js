import { sql } from "../src/config/db.js"

export async function getUserByUsername(req, res) {
    try {
        const { username } = req.params

        const user = await sql`
            SELECT * FROM users 
            WHERE username = ${username}
            ORDER BY created_at DESC 
        `

        res.status(201).json(user)
    } catch (error) {
        console.log("Error getting user", error)
        res.status(500).json({error:"Something went wrong"});    
    }
}

export async function createUser(req, res) {
    try {
        const { username, firstname, lastname, bio, pfp } = req.body;

        if (!username || !firstname || !lastname) {
            return res.status(400).json({ message: "Username, first name, and last name are required" })
        }

        const user = await sql`
            INSERT INTO users(username, first_name, last_name, bio, pfp)
            VALUES (${username}, ${firstname}, ${lastname}, ${bio}, ${pfp})
            RETURNING *
        `
        res.status(201).json(user);
    } catch (error) {
        console.log("Error adding user", error)
        res.status(500).json({error:"Something went wrong"});        
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" })
        }

        const user = await sql`
            DELETE FROM users 
            WHERE id = ${id} 
            RETURNING *
        `

        if (user.length === 0) {
            return res.status(400).json({ message: "No user found" })
        }

        return res.status(201).json({ message: "User deleted successfully" })

    } catch (error) {
        console.log("Error deleting user", error)
        res.status(500).json({error:"Something went wrong"});   
    }
}