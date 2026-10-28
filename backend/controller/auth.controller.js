const Funcionario = require('../models/Funcionario')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'segredo'

const login = async (req,res) =>{
    const valores = req.body

    try {
        if(!valores.email || !valores.senha ){
            return res.status(422).json({message: 'Preencha todos os campos!'})
        }
        
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})
        
        if(!funcionario){
            return res.status(400).json({message: 'Email ou senha incorreto!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA);
        const senha = bytes.toString(CryptoJS.enc.Utf8);
        
        if(valores.senha !== senha){
            return res.status(400).json({message: 'Email ou senha incorreto!'})
        }
        
        const tempo = 180 * 60 * 1000
        const expiraEm = tempo + Date.now()
        
        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: expiraEm
        }
        
        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString();
        
        return res.status(200).json({
            message: 'Usuário logado com sucesso!!',
            token: token,
            nome: funcionario.nome
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'ocorreu um problema ao fazer login!'})
    }
}

module.exports = { login }