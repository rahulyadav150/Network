const commentModal = require('../models/commentModal')
const Comments = require('../models/commentModal')
const Users = require('../models/userModel')
const Posts = require('../models/postModel')

 class ApiFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }

    paginating(){
        const page = this.queryString.page*1 || 1
        const limit = this.queryString.limit*1 || 3
        const skip = (page*(page-1)/2)*3
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const postCtrl = {
    createPost : async (req,res) => {
        try {
      
            const {content,images} = req.body
            if(images.length===0)      return  res.status(400).json({msg:"Please add an image"})
            const newPost = new Posts({
                content,images,user:req.user._id
            })

          await  newPost.save()
          const getNewPost = await Posts.findOne({_id : newPost._id})
          .populate('user likes','avatar fullName userName')
            res.json({msg : 'Created succesfully!',
          newPost: getNewPost})

        }catch(err){
            
           return  res.status(500).json({msg:err.message})
        }
    },
    getPosts : async (req,res) => {
        try {
            const features = new ApiFeatures(Posts.find({user:[...req.user.following,req.user._id]}),req.query).paginating()
            const posts = await features.query.sort('-createdAt')
            .populate('user likes','avatar userName fullName')
            .populate({
                path : 'comments',
                populate :{
                    path : 'user likes tag',
                    select : '-password'
                }
            })
           
            res.json({
                msg:'success!',
                result : posts.length,
                posts
            })
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    getPost : async (req,res) =>{
        try {
           
            const post = await Posts.findById(req.params.id)
            .populate('user likes','avatar userName fullName')
            .populate({
                path : 'comments',
                populate :{
                    path : 'user likes tag',
                    select : '-password'
                }
            })
           if(!post)  return res.status(400).json({msg:'post does not exist'})
            res.json({post})
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    updatePost : async (req,res) => {
        try {
      
            const {content,images} = req.body
            const post = await  Posts.findOneAndUpdate({_id:req.params.id},{content,images})
            .populate('user likes','fullName userName avatar')
           
            res.json({
                msg : 'upadated succesfully',
                newPost :{...post._doc,
                content,
                images
                }
            })

        }catch(err){
            
           return  res.status(500).json({msg:err.message})
        }
    },
    likePost : async (req,res) => {
        try {
                  
           const post = await Posts.findOne({_id:req.params._id,likes:req.user._id})
           if(post) return  res.status(400).json({msg:"you already liked this!"})
           
            const newPost = await Posts.findOneAndUpdate({_id:req.params.id},{
                $push:{likes:req.user._id}
            },{new:true})
           if(!newPost) return res.status(400).json({msg:'post does not exists'})

            res.json({msg:'post liked!',
        newPost})
            
            
           
       }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    unLikePost : async (req,res) => {
        try {
                   
            const newPost = await Posts.findOneAndUpdate({_id:req.params.id},{
                $pull:{likes:req.user._id}
            },{new:true})

            if(!newPost) return res.status(400).json({msg:'post does not exists'})
            res.json({msg:'post Unliked!',
        newPost})
            
            
           
       }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    getPostsDicover : async (req,res) => {
        try {
            const features = new ApiFeatures(Posts.find({user:{$nin: [...req.user.following,req.user._id]}}),req.query).paginating()
            const posts = await features.query.sort('-createdAt')
            
           
            res.json({
                msg:'success!',
                result : posts.length,
                posts
            })
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    deletePost : async (req,res) => {
        try {
            const checkPost = await  Posts.findById({_id:req.params.id})
            if(checkPost.user === req.user._id) return res.status(400).json({msg:'Unautorized'})
           
            const post = await Posts.findOneAndDelete({_id: req.params.id})
            await Comments.deleteMany({_id:{$in: post.comments}})

            

            res.json({msg:'Post Deleted',post})
            
            

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    getPosts : async (req,res) => {
        try {
            const features = new ApiFeatures(Posts.find({user:[...req.user.following,req.user._id]}),req.query).paginating()
            const posts = await features.query.sort('-createdAt')
            .populate('user likes','avatar userName fullName')
            .populate({
                path : 'comments',
                populate :{
                    path : 'user likes tag',
                    select : '-password'
                }
            })
           
            res.json({
                msg:'success!',
                result : posts.length,
                posts
            })
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    savePost : async (req,res) =>{
        try {
           
            const user = await Users.find({_id:req.user._id,saved : req.params.id})
            if(user.length>0) return res.status(400).json({msg:'You already saved this post'})
            
            const save = await Users.findOneAndUpdate({_id:req.user._id},{
                $push : {saved : req.params.id}
            })
            
            if(!save) return  res.status(400).json({msg:'This user does not exit'})

            res.json({msg:'saved post'})
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    unSavePost : async (req,res) =>{
        try {
           
            const user = await Users.find({_id:req.user._id,saved : req.params.id})
            if(user.length===0) return res.status(400).json({msg:'You already unSaved this post'})
            
            const save = await Users.findOneAndUpdate({_id:req.user._id},{
                $pull : {saved : req.params.id}
            })
            
            if(!save) return  res.status(400).json({msg:'This user does not exit'})

            res.json({msg:'unSaved post'})
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    getSavedPosts : async (req,res) => {
        try {
            const features = new ApiFeatures(Posts.find({_id: {$in : req.user.saved}}),req.query).paginating()
            const posts = await features.query.sort('-createdAt')
            .populate('user likes','avatar userName fullName')
            .populate({
                path : 'comments',
                populate :{
                    path : 'user likes tag',
                    select : '-password'
                }
            })
           
            res.json({
                msg:'success!',
                result : posts.length,
                savedPosts : posts
            })
       

        }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    }
      
}

module.exports = postCtrl;
module.exports.ApiFeatures = ApiFeatures