const router = require('express').Router();
const db = require('../db');

router.get('/',    async (req, res) => {
  const { rows } = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/',   async (req, res) => {
  const { title } = req.body;
  const { rows } = await db.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]
  );
  res.status(201).json(rows[0]);
});

router.patch('/:id', async (req, res) => {
  const { rows } = await db.query(
    'UPDATE todos SET done = NOT done WHERE id = $1 RETURNING *', [req.params.id]
  );
  rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;