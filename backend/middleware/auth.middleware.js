const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'segredo'

async function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    try {
        if(!token){
            return res.status(401).json({message: 'Não possui token!'})
        }
        
        const bytes  = CryptoJS.AES.decrypt(token, CHAVE_SECRETA);
        const tokenDescript = bytes.toString(CryptoJS.enc.Utf8);

        if(!tokenDescript){
            return res.status(403).json({message: 'ACCESS DENIED!'})
        }
        
        const payload = JSON.parse(tokenDescript)
        
        if(Date.now() > payload.expiraEm){
            return res.status(403).json({message: 'Tempo de sessão expirado!'})
        }
        
        req.usuario = payload
        
        next()   
    } catch (err) {
        console.error('ocorreu um problema na autenticação!',err)
        return res.status(500).json({message: 'ocorreu um problema na autenticação!'})
    }
}

module.exports = authMiddleware