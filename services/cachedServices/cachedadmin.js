const redis = require('redis')
const bluebird= require('bluebird')

const client =  bluebird.promisifyAll(redis.createClient()) 

class adminCached {
   async readCached(){

        const fixtures= await  client.getAsync('fixture')        
        return fixtures  
    }
    async teamCached(){
        
        const teams = await client.getAsync(process.env.KEY)
        return teams
    }
    async createCached(data){
          return await client.set(process.env.SECRET,JSON.stringify(data),redis.print)
             
    }
    async createTeam(data){
        return await client.set(process.env.KEY,JSON.stringify(data),redis.print)
    }
    async tokenServices(data){
       return await client.set('Token',JSON.stringify(data),redis.print)
    }
}

client.on('error', (err) => {
    console.log("Error " + err)
});
module.exports=adminCached