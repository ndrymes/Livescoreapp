const AgentServices = require('../../services/mongoservices/admin')
const services = new AgentServices()
const cachedServices = require('../../services/cachedServices/cachedadmin')
const cached= new cachedServices()

class AdminController {
    // admin Signup
    async signUp(req,res){
        const {name,email,password,privilege} = req.body
        const params ={
            name,
            email,
            password,
            privilege
        }
                
        if (!params.name || !params.email ||!params.password) {
            
            return res.status(401).send({
                error:true,
                message:'name,email and password is required',
                code:401
            })
        }
        try {
            const user= await services.Signup(params)
            const token = await user.generateAuthToken()
             const storedToken = cached.tokenServices(token)
            if(!user){
                throw new Error()
            }
            res.status(200).send({
                data:user,
                code:200,
                error:false,
                token
            })
        } catch (error) {
            res.status(500).send({
                code:500,
                message:'internal server error',
                 errormessage:error
            })
        }
      
    }
    //login 
    async LogIn(req,res){
       const {email,password}=req.body
       const params ={
           email,
           password
       }
       console.log(params);
       
       try {
        const login= await services.Login(params.email,params.password)
        
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
       
    
    //create fixtures
   async createFixtures(req,res){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const  startime = date+' '+time;
       const{
        isLive,
        hometeam,
        awayteam,
        firsthalfscore,
        secondhalfscore,
        homeredcard,
        awayredcard,
        status,
        currentmin,
        completed
    } = req.body

    const params ={
        startime,
        isLive,
        hometeam,
        awayteam,
        firsthalfscore,
        secondhalfscore,
        homeredcard,
        awayredcard,
        status,
        currentmin,
        completed
    }
    
    
    try {
        const fixtures= await services.createFixtures(params)
        if (!fixtures) {
            return res.status(401).send({
                error:true,
                message:'fill the required',
                code:401
            })
        }
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
// view fixtures
   async viewFixtures(req,res){
       try {
           const cachedFixtures = await cached.readCached()
           
         if (cachedFixtures){
            return res.status(200).send({
                source:"cached",
                data:cachedFixtures,
                code:200,
                error:false,
            })
         }
         else{
            const fixtures= await services.viewFixtures()
            if (fixtures.length===0) {
                return res.status(404).send({
                    code:404,
                    error:true,
                    message:"no fixtures found"
                })
            }
            cached.createCached(fixtures)
            
            res.status(200).send({
              data:fixtures,
              code:200,
              error:false,
          })
         }
        
       } catch (error) {
        res.status(500).send({
            code:500,
            message:'internal server error',
             errormessage:error
        })
       }

   }
   //edit fixtures
   async editFixtures(req,res){
    const _id = req.params.id
    const {isLive,hometeam,awayteam,firsthalfscore,secondhalfscore}=req.body
    const params = {
        isLive,
        hometeam,
        awayteam,
        firsthalfscore,
        secondhalfscore
    }
    try {
        const fixture=await services.editFixtures(_id,params)
        if (!fixture) {
            return res.status(404).send({
                code:404,
                error:true,
                message:"no fixtures found"
            })
        }
        res.status(200).send({
            data:fixture,
            code:200,
            error:false,
        })
      const allFixtures = await services.viewFixtures()
      return await cached.createCached(allFixtures)
    } catch (error) {
        res.status(500).send({
            code:500,
            message:'internal server error',
             errormessage:error
        })
    }
    
   }
   async removeFixtures(req,res){
      const _id = req.params.id
      try {
        const removedFixtures = await services.removeFixtures(_id);
        if(!removedFixtures){
            return res.status(404).send({
                code:404,
                error:true,
                message:"no fixtures found"
            })
        }
        res.status(200).send({
            data:removedFixtures,
            code:200,
            error:false,
        })
        const allFixtures = await services.viewFixtures()
      return await cached.createCached(allFixtures)
        
      } catch (error) {
        res.status(500).send({
            code:500,
            message:'internal server error',
             errormessage:error
        })
      } 
   }
}
module.exports = AdminController;