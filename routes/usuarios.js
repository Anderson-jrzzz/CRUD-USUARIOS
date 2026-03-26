const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// LISTAR
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (err, results) => {
        res.json(results);
    });
});

// INSERTAR
router.post('/add', (req, res) => {
    const { nombre, correo } = req.body;
    conexion.query(
        'INSERT INTO usuarios(nombre, correo) VALUES (?, ?)',
        [nombre, correo],
        () => res.send("Usuario agregado")
    );
});

// ACTUALIZAR
router.put('/update/:id', (req, res) => {
    const { nombre, correo } = req.body;
    const id = req.params.id;

    conexion.query(
        'UPDATE usuarios SET nombre=?, correo=? WHERE id=?',
        [nombre, correo, id],
        () => res.send("Usuario actualizado")
    );
});

// ELIMINAR
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    conexion.query(
        'DELETE FROM usuarios WHERE id=?',
        [id],
        () => res.send("Usuario eliminado")
    );
});

module.exports = router;