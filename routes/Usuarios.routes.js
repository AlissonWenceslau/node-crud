const express = require('express')
const router = express.Router()
const UsuariosControllers = require('../controllers/Usuario.controllers')

router.get('/cadastrar', UsuariosControllers.cadastrar)
router.post('/novo', UsuariosControllers.novo)
router.get('/listar', UsuariosControllers.listar)
router.get('/editar/:id', UsuariosControllers.editar)
router.post('/atualizar', UsuariosControllers.atualizar)
router.get('/deletar/:id', UsuariosControllers.deletar)

module.exports = router