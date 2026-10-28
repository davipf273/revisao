const conn = require('./db/conn')
const { Funcionario, Motorista, Carga, Entrega} = require('./models/rel')

async function sync() {
    try{
        await conn.sync({force: true})
        console.log('conectando com o banco de dados')
    }catch(err){
        console.error('erro ao conectar com o banco de dados',err)
    }finally{
        console.log('fechando conexão com o banco de dados')
        await conn.close()
    }
}

sync()