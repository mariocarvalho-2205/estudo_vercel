import User from "../models/User.js";

export const createUser = async (req, res) => {
    const { nome } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }

    try {
        const user = await User.create({ nome });
        res.status(201).json({
            message: "Usuário criado com sucesso!",
            data: user
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            error: "Erro no servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};