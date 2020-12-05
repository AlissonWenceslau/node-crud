const { raw } = require('body-parser')
const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuarios.models')

router.get('/cadastrarusuario', (req,res)=>{
    res.render('usuarios/cadastrar-usuario')
})

router.post('/novousuario', (req,res)=>{

    let erros = []

    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:'Nome inválido'})
    }
    if(req.body.nome.length < 3){
        erros.push({texto:'Nome muito pequeno'})
    }
    if(req.body.senha != req.body.resenha){
        erros.push({texto:'As senhas não são iguais'})
    }
    if(erros.length>0){
        res.render('usuarios/cadastrar-usuario', {erros:erros})
    }else{

        const novoUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        Usuario.create(novoUsuario).then(()=>{
            req.flash('success_msg', 'Usuário cadastrado com sucesso!')
            res.redirect('/usuarios/cadastrarusuario')
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao cadastrar o usuário, tente novamente!')
            res.redirect('/usuarios/cadastrarusuario')
        })
    }
})

router.get('/listarusuarios', (req,res)=>{
    Usuario.findAll({raw : true}).then((usuario)=>{
        res.render('usuarios/listar-usuarios', {usuario:usuario})
    })
})

router.get('/editarusuarios/:id', (req,res)=>{
    Usuario.findOne({where:{id:req.params.id}}).then((usuario)=>{
        res.render('usuarios/editar-usuarios', {usuario:usuario})
    }).catch((err)=>{
        req.flash('error_msg','Houve um erro ao carregar o usuário!')
        res.redirect('/usuarios/listarusuarios')
    })
})

router.post('/editar', (req,res)=>{
    
    let erros = []
    
    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:'Nome inválido'})
    }
    if(!req.body.email || req.body.email == undefined || req.body.email == null){
        erros.push({texto:'Email inválido'})
    }
    if(!req.body.senha || req.body.senha == undefined || req.body.senha == null){
        erros.push({texto:'Senha inválida'})
    }
    if(req.body.senha != req.body.resenha){
        erros.push({texto:'As senhas não são iguais'})
    }
    if(erros.length>0){
        res.render('home', {erros:erros})
    }else{
        Usuario.findOne({where:{id:req.body.id}}).then((usuario)=>{
            usuario.nome = req.body.nome
            usuario.email = req.body.email
            usuario.senha = req.body.senha

            usuario.save().then(()=>{
                req.flash('success_msg', 'Usuário atualizado com sucesso!')
                res.redirect('/usuarios/listarusuarios')
            }).catch((err)=>{
                req.flash('error_msg', 'Houve um erro ao atualizar o usuário!!')
                res.redirect('/usuarios/listarusuarios')
            })

        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao tentar alterar o usuário')
            res.redirect('/usuarios/listarusuarios')
        })
    }
})

router.get('/deletar/:id', (req,res)=>{
    Usuario.destroy({
        where:{
            id:req.params.id
    }}).then(()=>{
        req.flash('success_msg', 'Usuário deletado com sucesso!')
        res.redirect('/usuarios/listarusuarios')
    }).catch((err)=>{
        req.flash('error_msg', 'Houve um erro ao deletar o usuário!')
        res.redirect('/usuarios/listarusuarios')
    })
})


module.exports = router