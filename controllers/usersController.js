import { sql } from "../src/config/db.js"

export async function getUserByUsername(req, res) {
    try {
        const { username } = req.params
        console.log(username)

        const user = await sql`
            SELECT * FROM users 
            WHERE user_id = ${username}
            ORDER BY created_at DESC 
        `

        res.status(201).json(user)
    } catch (error) {
        console.log("Error getting user", error)
        res.status(500).json({error:"Something went wrong"});    
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await sql`
            SELECT * FROM users
            ORDER BY created_at DESC
        `

        res.status(201).json(users)
    } catch (error) {
        console.log("Error getting user", error)
        res.status(500).json({error:"Something went wrong"});
    }
}

export async function createUser(req, res) {
    try {
        const { userId, username, firstname, lastname, bio, pfp } = req.body;

        if (!userId || !username || !firstname || !lastname) {
            return res.status(400).json({ message: "Username, first name, and last name are required" })
        }

        const user = await sql`
            INSERT INTO users(user_id, username, first_name, last_name, bio, pfp)
            VALUES (${userId}, ${username}, ${firstname}, ${lastname}, ${bio}, ${pfp})
            RETURNING *
        `
        res.status(201).json(user);
    } catch (error) {
        console.log("Error adding user", error)
        res.status(500).json({error:"Something went wrong"});        
    }
}

export async function addUserId(req, res) {

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

export async function editUser(req, res) {
    try {
        const { id } = req.params
        const { username, first_name, last_name, bio, pfp } = req.body

        const user = await sql`
            UPDATE users
            SET username = ${username},
            first_name = ${first_name},
            last_name = ${last_name},
            bio = ${bio},
            pfp = ${pfp}
            WHERE user_id = ${id}
            RETURNING *
        `

        res.status(201).json(user)
    } catch (error) {
        console.error("Error updating profile", error)
        res.status(500).json({ error: "Error editing profile" })
    }
}