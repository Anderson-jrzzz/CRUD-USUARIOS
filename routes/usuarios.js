const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// LISTAR
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.log("Error LISTAR:", err);
            return res.status(500).json({ error: "Error al listar" });
        }
        res.json(results);
    });
});

// INSERTAR
router.post('/add', (req, res) => {
    const { nombre, correo } = req.body;

    console.log("📥 Datos:", nombre, correo);

    conexion.query(
        'INSERT INTO usuarios(nombre, correo) VALUES (?, ?)',
        [nombre, correo],
        (err, result) => {
            if (err) {
                console.log("Error INSERT:", err);
                return res.status(500).json({ error: "Error al insertar" });
            }
            res.json({ mensaje: "Usuario agregado" });
        }
    );
});

// ACTUALIZAR
router.put('/update/:id', (req, res) => {
    const { nombre, correo } = req.body;
    const id = req.params.id;

    conexion.query(
        'UPDATE usuarios SET nombre=?, correo=? WHERE id=?',
        [nombre, correo, id],
        (err) => {
            if (err) {
                console.log("Error UPDATE:", err);
                return res.status(500).json({ error: "Error al actualizar" });
            }
            res.json({ mensaje: "Usuario actualizado" });
        }
    );
});

// ELIMINAR
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    conexion.query(
        'DELETE FROM usuarios WHERE id=?',
        [id],
        (err) => {
            if (err) {
                console.log("Error DELETE:", err);
                return res.status(500).json({ error: "Error al eliminar" });
            }
            res.json({ mensaje: "Usuario eliminado" });
        }
    );
});

module.exports = router;