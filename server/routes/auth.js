const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) {
            return res.status(400).json({
                error: "Email já cadastrado."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "Usuario criado com sucesso."
        });
    } catch(error) {
        res.status(500).json({
            error: "Erro ao cadastrar usuario."
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: {email} });
        if(!user) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Senha inválda "});
        }
        res.json({
            status: 200,
            message: "Logado com sucesso",
            user
        })
    } catch(error) {
        return res.status(500).json({ 
            error: "Erro ao fazer login" 
        })
    }
});


module.exports = router;