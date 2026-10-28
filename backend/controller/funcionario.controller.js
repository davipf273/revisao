const CHAVE_SECRETA = 'segredo'
const CryptoJS = require('crypto-js')
const Funcionario = require('../models/Funcionario')

const cadastrar = async (req,res)=> {
    const valores = req.body

    try{
        if(!valores.nome || !valores.email || !valores.senha){
            return res.status(422).json({message: 'todos os campos são obrigatorios'})
        }

        const senhaCrypto = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome: valores.nome,
            email:valores.email,
            senha: senhaCrypto
        })
        return res.status(201).json({message: 'cadastro concluido com sucesso'})
    }catch(err){
        console.error('Erro ao cadastrar funcionario')
        return res.status(500).json({message: 'Erro ao cadastrar funcionario'})
    }
}

module.exports = {cadastrar}