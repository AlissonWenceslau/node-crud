const express = require('express')
const app = express()
const flash = require('connect-flash');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const usuariosRoutes = require('./routes/Usuarios.routes')

//Session
app.use(session({
    secret: 'cadastro-node',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())

//Middleware
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowMethodsByDefault: true
    }
}))
app.set('view engine', 'handlebars')

//Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.get('/', (req, res)=>{
    res.render('index/index')
})

app.use('/usuarios', usuariosRoutes)



let port = 3000
app.listen(port,()=>{
    console.log('Servidor rodando na porta ' + port)
})