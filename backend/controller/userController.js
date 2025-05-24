import User from "../models/User.js"
import supabase from "../db/supabase.js"

export const createUser = async (req, res) => {
    const {nome} = req.body
    console.log(nome)

    try {
        const user = await User.create({nome})

        if (!user){
            res.status(422).json({error: "Verifique o usuario"})
            return
        }

        res.status(200).json({message: "Usuario criado com sucesso!", nome})
        return
    } catch (error) {
        res.status(500).json({errors: "Houve um erro no servidor, por favor tente mais tarde.", error: error})
    }

}


