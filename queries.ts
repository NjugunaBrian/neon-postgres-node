import { Pool } from "pg";
import dotenv from "dotenv";
import { create } from "domain";
import { get } from "http";

dotenv.config()

const pool = new Pool({
    connectionString : process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const createUser = (req, res) => {
    const { name, email } = req.body

    pool.query(`INSERT INTO users name, email VALUES ${name}, ${email} RETURNING id`, [name, email], 
        (error, results) => {
            if (error){
                throw error
            }
            console.log(results)
            res.status(201).send(`User added with ID: ${results.row[0].id}`)
        }
    );
};

export const updateUser = (req, res) => {
    const id = req.query.id;
    const { name, email } = req.body;

    pool.query(`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`, [name, email,id],
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`);

        }
    );
};

export const getUsers = (req, res) => {
    pool.query(`SELECT * FROM users ORDER BY id ASC`,
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).json(results.rows)
        }
    );
};

export const getUserById = (req, res) => {
    const id = req.query.id;
    pool.query(`SELECT * FROM users WHERE id = ${id}`,
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).json(results.row)
        }
    );
};

export const deleteUser = (req, res) => {
    const id = req.query.id;
    pool.query(`DELETE FROM users WHERE id = ${id}`,
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).send(`User deleted with ID: ${id}`);
        }
    );
};



module.exports = {
    createUser, updateUser, deleteUser, getUsers, getUserById
};
