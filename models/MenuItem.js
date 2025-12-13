const mongoose=require('mongoose');

//define the MenuItem schema
const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})
//create MenuItem model
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports=MenuItem;
