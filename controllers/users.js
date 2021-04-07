const { request, response } = require('express');
const User = require('../models/users');

const userCreate = async (req = request, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Bienvenido',
    });
};

module.exports = {
    userCreate
}