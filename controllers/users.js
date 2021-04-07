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

module.exports = {
    userCreate
}