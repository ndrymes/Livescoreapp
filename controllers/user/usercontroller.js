const userservices= require('../../services/mongoservices/user')
const services= new userservices()

class userController {
    async LogIn(req,res){
        const {email,password}=req.body
        const params ={
            email,
            password
        }
        
        try {
         const login= await services.logIn(params.email,params.password) 
               if(!login){
                 return res.status(404).send({
                     code:404,
                     error:true,
                     message:"wrong Email or password combination"
                 })
               }
               res.status(200).send({
                 data:login,
                 code:200,
                 error:false,
             })
 
        } catch (error) {
         res.status(500).send({
             code:500,
             message:'internal server error',
              errormessage:error
         })
        }
        }
   async FixturesStatus (req,res){
       try {
        const{completed}= req.body
        const fixtures = await services.findCompleted(completed)
        res.status(200).send({
            data:fixtures,
            code:200,
            error:false,
        })
       } catch (error) {
        res.status(500).send({
            code:500,
            message:'internal server error',
             errormessage:error
        })
       }
       
       
   }
}
module.exports=userController
