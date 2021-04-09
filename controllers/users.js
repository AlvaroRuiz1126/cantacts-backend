const { request, response } = require('express');
const User = require('../models/users');

const getUsers = async (req = request, res = response) => {
    const users = await User.find();

    return res.status(200).json({
        ok: true,
        msg: 'Lista de usuarios',
        users
    });
};

const userCreate = async (req = request, res = response) => {
    const { correo, cedula } = req.body;

    try {
        let email = await User.findOne({correo});
        let identification = await User.findOne({cedula});

        if(identification){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con la misma cédula'
            });
        }

        if(email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con el mismo correo'
            });
        }

        let user = new User(req.body);
        await user.save();

        return res.status(200).json({
            ok: true,
            msg: "Usuario creado",
            user
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

        if(identification){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente la cédula'
            });
        }

        if(email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente con el mismo correo'
            });
        }

        const updateUserDB = await User.findByIdAndUpdate(userId, newUser, { new: true })

        return res.status(200).json({
            ok: true,
            msg: 'Usuario Actualizado',
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

const deleteUser = async (req = request, res = response) => {
    const userId = req.params.id;

    try {
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existente"
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado',
            user
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
    getUsers,
    userCreate,
    updateUser,
    deleteUser,
}