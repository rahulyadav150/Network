const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true,
        maxlength:25
    },
    userName:{
        type:String,
        trim:true,
        required:true,
        maxlength:25,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://cdn2.vectorstock.com/i/thumb-large/23/81/default-avatar-profile-icon-vector-18942381.jpg'
    },
    role:{
        type:String,
        default:'user'
    },
    gender:{
        type:String,
        default:'male'
    },
    mobile:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    story:{
        type:String,
        maxlength:200,
        default:''
    },
    website:{
        type:String,
        default:''
    },
    follower:[{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }],
    following:[{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }],
    saved : [{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }]


},{timestamps:true});

module.exports=mongoose.model('user',userSchema);