const express = require('express')
const cors = require('cors')
const app = express()

const conn = require('./db/conn')

const host = 'localhost'
const PORT = 3000

require('./models/rel')
const motoristaController = require('./controller/motorista.controller')
const funcionarioController = require('./controller/funcionario.controller')
const authController = require('./controller/auth.controller')

const authMiddleware = require('./middleware/auth.middleware')

// ------------- midware -------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// ------------ Rotas Públicas --------------

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res) => {
    return res.status(200).json({message: 'Aplicação rodando !!'})
})

// ----------- Rotas Privadas -------------

app.use(authMiddleware)




app.post('/motorista', motoristaController.cadastrar)
app.get('/motorista/nome/:nome', motoristaController.consultar)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

// ---------- server -------------
conn.sync()
.then(()=>{
    app.listen(PORT,host ,()=>{
        console.log(`Servidor rodando em: http://${host}:${PORT}/`)
    })
})
.catch((err)=>{
    console.error('Houve um problema com o banco de dados: ', err)
})