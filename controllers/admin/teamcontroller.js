const userService = require('../../services/mongoservices/admin')
const services= new userService()
const cachedServices = require('../../services/cachedServices/cachedadmin')
const cached = new cachedServices()
class  teamManager {
    async createTeam(req,res){
        const team = req.body
        try {
            const Teams= await services.createTeam(team)
            
            if (!Teams) {
                return res.status(401).send({
                    error:true,
                    message:'fill the required',
                    code:401
                })
            }
            res.status(200).send({
                data:Teams,
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
    async viewTeam(req,res){
            try {
                const cachedTeams = await cached.teamCached()
              if (cachedTeams){
                 return res.status(200).send({
                     source:"cached",
                     data:cachedTeams,
                     code:200,
                     error:false,
                 })
              }
              else{
                 const team= await services.viewTeams()
                 if (team.length===0) {
                     return res.status(404).send({
                         code:404,
                         error:true,
                         message:"no fixtures found"
                     })
                 }
                 cached.createTeam(team)
                 
                 res.status(200).send({
                   data:team,
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
        async editTeam(req,res){
            
            const _id = req.params.id
           const {phone,name}=req.body
           const params= {
               phone,
               name
           }

            try {
                
                const team=await services.editTeams(_id,params)
                
                if (!team) {
                    return res.status(404).send({
                        code:404,
                        error:true,
                        message:"no fixtures found"
                    })
                }
                res.status(200).send({
                    data:team,
                    code:200,
                    error:false,
                })
              const allTeams = await services.viewTeams()
              return await cached.createTeam(allTeams)
            } catch (error) {
                res.status(500).send({
                    code:500,
                    message:'internal server error',
                     errormessage:error
                })
            }
        }
        async removeTeam(req,res){
            const _id = req.params.id
            
            try {
              const removedTeams = await services.removeTeams(_id);
              if(!removedTeams){
                  return res.status(404).send({
                      code:404,
                      error:true,
                      message:"no fixtures found"
                  })
              }
              res.status(200).send({
                  data:removedTeams,
                  code:200,
                  error:false,
              })
              const allTeams = await services.viewTeams()
            return await cached.createTeam(allTeams)
              
            } catch (error) {
              res.status(500).send({
                  code:500,
                  message:'internal server error',
                   errormessage:error
              })
            } 
         }

         
    }
module.exports= teamManager