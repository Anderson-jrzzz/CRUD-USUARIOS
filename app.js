const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
    res.send("API CRUD funcionando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});