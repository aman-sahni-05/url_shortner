require('dotenv').config();
const express = require('express')
const pool = require('./db')
const { nanoid } = require('nanoid');

const app = express()

app.use(express.json())

app.post('/shorten', async (req,res) => {
    const { original_url } = req.body;
    try{
        new URL(original_url)
    }catch(err){
        return res.status(400).json({ error: 'invalid-data' })
    }
    try{
        const short_code = nanoid()
        const result = await pool.query('INSERT INTO urls (original_url,short_code) VALUES ($1,$2) RETURNING *',[original_url,short_code])
        res.json({short_code: result.rows[0].short_code})
    }catch(err){
        return res.status(500).json({err})
    }
})

app.get('/:code', async (req,res) => {
    try{
        const shortCode = req.params.code
        const short_code = await pool.query(`SELECT * FROM urls WHERE short_code=$1`,[shortCode])
        if(!short_code.rows[0]){
            return res.status(404).json({error: "short_code not found"})
        }
        res.redirect(short_code.rows[0].original_url)
    }catch(err){
        return res.status(500).json({err})
    }
})


app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
}) 