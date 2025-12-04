import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
 
const app = express();
app.use(express.json());
 
mongoose.connect(process.env.MONGODB_URI, { dbName: 'Aula' })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro na conexão:', err.message));
 
const usuarioSchema = new mongoose.Schema({
    user: { type: String, required: true, trim: true, minlength: 2 },
    senha: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
}, ({ collection: 'usuarios', timestamps: true }));
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');
 
const registros = new mongoose.Schema({
    cidade: { type: String, required: true, trim: true, minlenght: 2 },
    estado: { type: String, required: true, trim: true, maxlenght: 2 },
    data_observacao: { type: String, required: true },
    temperatura_c: { type: Number, required: true },
    condicao: { type: String, required: true, trim: true, minlenght: 2 },
    sensacao_termica: { type: Number, required: true },
    umidade_percentual: { type: Number, required: true },
    notas_usuario: { type: String, required: true, minlenght: 2 }
}, ({ collection: 'registro', timestamps: true }));
const Registros = mongoose.model('Registro', registros, 'registro');
 
app.get('/', (req, res) => res.json({ msg: 'API rodando' }));
 
//CRUD Usuario:
 
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
 
        if (!usuario) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
 
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar um usuário' });
    }
});
 
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
 
        if (!usuarios) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os dados do usuário' });
    }
});
 
app.patch('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.update(req.body);
 
        if (!usuario) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
 
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar os dados do usuário' });
    }
});
 
app.delete('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.delete(req.body);
 
        if (!usuario) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
 
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
});
 
//CRUD registros:
 
app.post('/registros', async (req, res) => {
    try {
        const registro = await Registros.create(req.body);
 
        if (!registro) {
            return res.status(400).json({ error: 'Registro não encontrado' });
        }
 
        res.status(201).json(registro);
    } catch (error) {
        res.status(500).json(({ error: 'Erro ao criar um registro' }));
    }
 
 
});
 
app.get('/registro', async (req, res) => {
    try {
        const registro = await Registros.find();
 
        if (!registro) {
            return res.status(400).json({ error: 'Resgistro não encontrado' });
        }
 
        res.json(registro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os dados da registro' });
    }
});
 
app.patch('/registro', async (req, res) => {
    try {
        const registro = await Registros.update(req.body);
 
        if (!registro) {
            return res.status(400).json({ error: 'Registro não encontrada' });
        }
 
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar os dados do registro' });
    }
});
 
app.delete('/registro', async (req, res) => {
    try {
        const registro = await Registros.delete(req.body);
 
        if (!registro) {
            return res.status(400).json({ error: 'Registro não encontrado' });
        }
 
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o registro' });
    }
});
 
 
app.listen(process.env.PORT, () =>
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);