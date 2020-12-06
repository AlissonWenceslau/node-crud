const express = require('express')
const router = express.Router()
const UsuariosControllers = require('../controllers/Usuario.controllers')

router.get('/cadastrarusuario', UsuariosControllers.cadastrar)
router.post('/novousuario', UsuariosControllers.novo)
router.get('/listarusuarios', UsuariosControllers.listar)
router.get('/editarusuarios/:id', UsuariosControllers.editar)
router.post('/editar', UsuariosControllers.atualizar)
router.get('/deletar/:id', UsuariosControllers.deletar)

module.exports = router