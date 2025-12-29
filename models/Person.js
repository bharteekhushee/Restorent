const mongoose = require('mongoose')
const bcrypt=require('bcrypt');

//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 0
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Invalid mobile number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});
// personSchema.pre('save',async function(){
//     const person=this;
//     //hashed the password only if it has been modified (or is new)
//     if (!person.isModified('password')) return;
//     try{
//         //salt generation
//         const salt=await bcrypt.genSalt(10);
//         //hashed password
//         const hashedPassword=await bcrypt.hash(person.password,salt)
//         //override plain to hashed password
//         person.password=hashedPassword
//     }
//     catch(err){
//         console.log(err);
//         throw err;
//     }
// })
// personSchema.methods.comparePassword=async function(candidatePassword){
//     try{
//         //use bcrypt to compare the provided password with the hashed password
//         const isMatch=await bcrypt.compare(candidatePassword,this.password);
//         return isMatch;
//     }
//     catch(err){
//         throw err;
//     }
// }
personSchema.pre('save', async function () {
    const person = this;

    if (!person.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    person.password = await bcrypt.hash(person.password, salt);
});

/* 🔑 COMPARE PASSWORD */
personSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
