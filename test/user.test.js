const request = require('supertest')
const app = require('../app')
const User= require('../model/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userOneId = mongoose.Types.ObjectId()

const userOne= {
    _id:userOneId ,
    name:'oluwole',
    email:'saywhat@gmail.com',
    password:'werftre',
    privilege:'admin',
    tokens:[{
        token:jwt.sign({_id:userOneId,privilege:this.privilege},process.env.JWT_KEY)
    }]
}
console.log(userOne.tokens);


beforeEach(async()=>{
     await User.deleteMany()
     await User.create(userOne)
    
})

test('should signup and admin', async() => {
   const response = await request(app).post('/admin/signup').send({
        name:"oluwole",
        email:"sunemondeudse@gmail.com",
        password:"mypderrr",
        privilege:"admin"
    }).expect(200)


    //Assert that the database was changed correctly
   
    const user =await User.find({email:response.body.email})    
    expect(user).not.toBeNull()

    //Assertion about response
    expect(response.body).toMatchObject({
        data: {
            name: "oluwole",
            email: "sunemondeudse@gmail.com",
            __v: 0
        },
        code: 200,
        error: false,
        token:response.body.token
    })


})



test('should login user', async() => {
    await request(app).post('/admin/login').send({
         email:userOne.email,
         password:userOne.password
    }).expect(200)
})

test('should create fixtures by authorized admin', () => {
    request(app).post('/admin/createfixtures')
    .set('Authorization', `Bearer ${userOne.tokens}`)
    .send({
        isLive:true,
	    completed:"true"
    })
    .expect(200)
})
test('it should not create fixtures if token is not sent',async()=>{
    request(app).post('/admin/createfixtures')
    .send({
        isLive:true,
	    completed:"true"
    })
    .expect(400)
})
test('should view fixtures', async () => {
    request(app).get('/admin/view')
    .set('Authorization',`Bearer ${userOne.tokens}`)
    .expect(200)
})
test('should edit fixtures ', async () => {
    const response = await request(app).patch('/admin/edit/:id')
    .set('Authorization',`Bearer ${userOne.tokens}`)
    .send({
        isLive:"true",
        hometeam:"Arsenal",
        awayteam:"Chelsea"
    })
    .expect(200)
    console.log(response.body);
    
})


