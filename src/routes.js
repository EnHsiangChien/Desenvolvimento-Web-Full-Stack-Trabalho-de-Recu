import {json, Router} from 'express'
import { pool } from './db.js'
const r = Router()

//GET http://localhost:3000/api/db/health
r.get('/db/health', async (_, res) => {
    try{
        const [rows] = await pool.query('SELECT 1 AS db_ok')
        res.json({ok: true, db: rows[0].db_ok})
    } catch {
        res.status(500).json({ok: false, db: 'down'})
    }
})
//GET http://localhost:3000/api/users
r.get('/users', async (_, res) => {
    try{
        const[rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
        )
        res.json(rows)
    } catch{
        res.status(500).json({error: 'Erro ao listar Usuários'})
    }
})
//POST http://localhost:3000/api/users
//Body Json {"name": "Fulano", "email": "fulano@teste.com"}
r.post('/users', async (req, res) => {
    const {name, email} = req.body
    if(!name || !email){
        return res.status(400).json({error: 'name e email obrigatórios'})
    }
    try{
        const [ins] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        )
        const [rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [ins.insertId]
        )
        res.status(201).json(rows[0])
    } catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({error: 'email já cadastrado'})
        }
        res.status(500).json({error: 'Erro ao criar usuário'})
    }
})
//GET http://localhost:3000/api/users/1 (?)
// Buscar Usuário específico
r.get('/users/:id', async (req, res) => {
    const {id} = req.params
    try{
        const[rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id =?'
            [id]
        )
        if(rows.length === 0){
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        res.json(rows[0])
    } catch{
        res.status(500).json({error: 'Erro ao Buscar Usuário'})
    }
})
//PUT http://localhost:3000/api/users/1 (?)
r.put('/users/:id', async (req, res) => {
    const {id} = req.params
    const{name, email}=req.body
    if(!name || !email){
        return res.status(400).json({error: 'name e email obrigatórios'})
    }
    try{
        const[result] = await pool.query(
            'UPDATE users SET name=?, email=? WHERE id=?',
            [name, email, id]
        )
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        const [rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id=?',
            [id]
        )
        res.json(rows[0])
    } catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({error: 'Email já cadastrado'})
        }
        res.status(500).json({error: 'Erro ao atualizar usuário'})
    }
})
//DELETE http://localhost:3000/api/users/1 (?)
r.delete('/users/:id', async (req, res) => {
    const {id} = req.params
    try{
        const [result] = await pool.query(
            'DELETE FROM users WHERE id =?',
            [id]
        )
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        res.json({message: 'Usuário excluído com sucesso.'})
    } catch(err){
        res.status(500).json({error: 'Erro ao excluir um usuário'})
    }
})

export default r