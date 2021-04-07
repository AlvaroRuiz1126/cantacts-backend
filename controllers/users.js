const { request, response } = require('express');
const User = require('../models/users');

const userCreate = async (req = request, res = response) => {
    const { correo, cedula } = req.body;

    try {
        let email = await User.findOne({correo});
        let identification = await User.findOne({cedula});

        if(email || identification){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con el mismo correo o cedula'
            });
        }

        let user = new User(req.body);
        await user.save();

        return res.status(200).json({
            ok: true,
            msg: "Usuario creado"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        });
    }
};

const updateUser = async (req = request, res = response) => {
    const userId = req.params.id;
    const { correo, cedula } = req.body

    try {
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existente"
            });
        }

        const newUser = {...req.body};
        let email = await User.findOne({correo});
        let identification = await User.findOne({cedula});

        if(email || identification){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con el mismo correo o cedula'
            });
        }

        const updateUserDB = await User.findByIdAndUpdate(userId, newUser, { new: true })

        return res.status(200).json({
            ok: true,
            msg: 'Usuaria Actualizado',
            updateUserDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        });
    }
};

module.exports = {
    userCreate,
    updateUser,
}