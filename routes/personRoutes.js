const express = require('express');
const router = express.Router();
const Person = require('../models/Person')

// post method to add person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        // const newPerson=new Person();
        // newPerson.name=data.name
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data save successfully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
// get method to get all person
router.get('/', async (req, res) => {
    try {
        const response = await Person.find();
        console.log('Data fetched successfully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
// get method to get work wise data person
router.get('/:work', async (req, res) => {
    try {
        const work = req.params.work
        if (work == 'chef' || work == 'waiter' || work == 'manager') {
            const response = await Person.find({ work: work });
            console.log('Data fetched successfully')
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: "Invalid work type..." })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!response){
           return res.status(404).json({error:"Person Data not found..."})
        }
        console.log("Person Data Updated Succesfully...")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
           return res.status(404).json({error:"Person Data not found..."})
        }
        console.log("Person Data Deleted Succesfully...")
        res.status(200).json({message:"Person Data Deleted Succesfully..."})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})

module.exports = router;