const passport=require('passport')
const passportLocalStrategy=require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new passportLocalStrategy(async (username,password,done)=>{
    try{
        // console.log('Credentials: ',username,password);
        const user = await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Incorrect Username...'});
        }
        // const isPasswordMatch=user.password===password?true:false;
        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user)
        }
        else{
            return done(null,false,{message:"Incorrect Password..."})
        }
    }
    catch(err){
        return done(err)
    }
}))
module.exports=passport;