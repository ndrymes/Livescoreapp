const User = require('../../model/user')
const jwt= require('jsonwebtoken')
const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        
        if(!token){
            return res.status(400).send({
                error:true,
                message:'no token provided',
                code:400
            })
        }
       
        let decoded = jwt.verify(token,process.env.JWT_KEY)
        
        const id = decoded._id
        const privilege = decoded.privilege
        if(privilege!=="admin"){
            return res.status(401).send({
                code:401,
                message:"you are not authorized as an admin",
                
            })
        }
        
        var user = await User.findOne({_id:id,})
        if (!user) {
            throw new Error()
        }
         req.user=user 
        next()

    } catch (error) {
        
        
        res.status(400).send({error:'please Authentic'})
        
    }


     
}
module .exports = auth