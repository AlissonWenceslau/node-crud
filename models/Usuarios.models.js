const db = require('../database/db')

const Usuario = db.sequelize.define('Usuarios', {
    nome:{
        type: db.Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: db.Sequelize.STRING,
        allowNull: true
    },
    senha:{
        type: db.Sequelize.STRING,
        allowNull: true
    }
})


//Usuario.sync({alter:true})

module.exports = Usuario