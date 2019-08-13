const User= require('../../model/user');
const Teams= require('../../model/teams');
const Fixtures=require('../../model/fixtures');


class UserServices {
 async logIn(email,password){  
     console.log('res');
        
    return await User.verifyDetails(email,password)
 }   
 async findCompleted(data){
      return Fixtures.find({completed:data})
 }
}
module.exports = UserServices