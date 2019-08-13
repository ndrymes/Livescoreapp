const User = require('../../model/user')
const Fixtures = require('../../model/fixtures')
const Team = require('../../model/teams')
class AdminServices {
    async Signup(data){
     return  await User.create(data)
    }
    async session(id){
        return await User.findById(id)
    }
    async Login(email,password){
    return await User.verifyDetails(email,password)
    
    }
    async createFixtures(data){
        return  Fixtures.create(data)
    }
    async viewFixtures(){
      return await Fixtures.find({})
    }
    async editFixtures(_id,data){
        return Fixtures.findByIdAndUpdate({_id},{$set:data},{useFindAndModify: false})
    }
    async removeFixtures(_id){
      return Fixtures.findByIdAndRemove(_id,{useFindAndModify: false})
    }
    async createTeam(data){
    
       return Team.create(data)
    }
    async viewTeams (){
        return await Team.find({})
    }
    async editTeams(_id,data){
        
        return Team.findByIdAndUpdate({_id},{$set:data},{useFindAndModify: false})
    }
    async removeTeams(_id){
    
        
        return Team.findByIdAndRemove(_id,{useFindAndModify: false})
      }
}
module.exports = AdminServices