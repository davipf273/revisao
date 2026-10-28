const Motorista = require('../models/Motorista')
const CHAVE_SECRETA = 'segredo'
const CryptoJS = require('crypto-js')

const cadastrar = async (req,res)=> {
    const valores = req.body

    try{
        if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
            return res.status(422).json({message: 'todos os campos são obrigatorios'})
        }

        const cnhCrypto = CryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCrypto = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCrypto,
            cpf: cpfCrypto,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'cadastro concluido com sucesso'})
    }catch(err){
        console.error('Erro ao cadastrar motorista',err)
        return res.status(500).json({message: 'Erro ao cadastrar motorista'})
    }
}

const consultar = async(req,res)=>{
    const nome = req.params.nome
    try{
        const motorista = await Motorista.findOne({where: {nome:nome }})

        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado'})
        }

        const bytes = CryptoJS.AES.decrypt(motorista.cnh, CHAVE_SECRETA)
        const cnhDesCrypto = bytes.toString(CryptoJS.enc.Utf8)
        const bytes2 = CryptoJS.AES.decrypt(motorista.cpf,CHAVE_SECRETA)
        const cpfDesCrypto = bytes2.toString(CryptoJS.enc.Utf8)

        const payload ={
            nome: motorista.nome,
            cnh: cnhDesCrypto,
            cpf: cpfDesCrypto,
            telefone: motorista.telefone
        }

        return res.status(200).json(payload)
    }catch(err){
        console.error('Erro ao consultar motorista',err)
        return res.status(500).json({message: 'Erro ao consultar motorista'})
    }
}

const atualizar = async (req, res)=>{
    const id = req.params.id
    const valores = req.body 
    try{
        const motorista = await Motorista.findByPk(id)

        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado'})
        }

        if(valores.cnh){
            const cnh = CryptoJS.AES.encrypt(valores.cnh,CHAVE_SECRETA).toString()
            valores.cnh = cnh
        }
        if(valores.cpf){
            const cpf = CryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
            valores.cpf = cpf
        }

        await Motorista.update(valores,{where:{codMotorista:id}})
        return res.status(200).json({message: 'Motorista atualizado com sucesso'})
    }catch(err){
        console.error('Erro ao atualizar motorista',err)
        return res.status(500).json({message: 'Erro ao atualizar motorista'})
    }
}



const apagar = async (req,res)=>{
    const id = req.params.id
    try{
        const motorista = await Motorista.findByPk(id)

        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado'})
        }

        await Motorista.destroy({where: {codMotorista:id}})
        return res.status(200).json({message: 'Motorista apagado com sucesso'})
    }catch(err){
        console.error('Erro ao apagar motorista',err)
        return res.status(500).json({message: 'Erro ao apagar motorista'})
    }
}

module.exports = { cadastrar, consultar, atualizar, apagar}