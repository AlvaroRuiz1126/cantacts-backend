const { Router } = require('express');
const { check } = require('express-validator');
const { userCreate, updateUser, deleteUser, getUsers } = require('../controllers/users');
const { fieldValidate } = require('../helpers/validate');
const router = Router();

router.get('/', getUsers);

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('cedula', 'la cédula es obligatoria').isNumeric(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('telefono', 'El teléfono es obligatorio').isNumeric(),
    fieldValidate
], userCreate);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;