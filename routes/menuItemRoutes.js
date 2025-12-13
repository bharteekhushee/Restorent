const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem')

// post method to add MenuItem
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('Data save successfully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
// get method to get all MenuItem
router.get('/', async (req, res) => {
    try {
        const response = await MenuItem.find();
        console.log('Data fetched successfully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
// get method to get taste wise data MenuItem
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
            const response = await MenuItem.find({ taste: taste });
            console.log('Data fetched successfully')
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: "Invalid taste type..." })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
router.put('/:id',async (req,res)=>{
    try{
        const menuItemId=req.params.id;
        const updatedmenuItemData=req.body;
        const response=await MenuItem.findByIdAndUpdate(menuItemId,updatedmenuItemData,{
            new:true,
            runValidators:true
        })
        if(!response){
           return res.status(404).json({error:"MenuItem Data not found..."})
        }
        console.log("MenuItem Data Updated Succesfully...")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const menuItemId=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuItemId)
        if(!response){
           return res.status(404).json({error:"MenuItem Data not found..."})
        }
        console.log("MenuItem Data Deleted Succesfully...")
        res.status(200).json({message:"MenuItem Data Deleted Succesfully..."})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error..." })
    }
})
module.exports = router;