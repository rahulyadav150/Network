const Comments = require('../models/commentModal')
const Posts = require('../models/postModel')

const commentCtrl = {
    createComment : async (req,res) => {
        try{

            const {postId, content, tag, reply,postUserId} = req.body
            const post =await Posts.findById(postId)
            if(!post) return  res.status(400).json({msg:"post does not exist"})
          
            if(reply){
            const replyCm = await Comments.findById(reply)
            if(!replyCm) return res.status(400).json({msg:"Comment does not exist"}) 
            }
            
            
            const newComment = new Comments({
                user:req.user._id,content,reply,tag,postId,postUserId
            })
            
            await Posts.findOneAndUpdate({_id : postId},{
                $push : {comments : newComment._id}
            },{new : true})
            
             
            await newComment.save()
            res.json({newComment})

        }catch(err){
            res.status(400).json({msg:err.message})

        }
    },
    updateComment : async (req,res) => {
        try{
            const {content} = req.body
            const updated = await Comments.findByIdAndUpdate({_id : req.params.id,user: req.user._id},{
                content
            },{new:true})

            if(!updated) return res.status(400).json("Inavlid query")
            res.json({msg:'comment updated succesfully'})
            
        
               

        }catch(err){ 
            res.json({msg:err.message})

        }
    },
    likeComment : async (req,res) => {
        try {
                  
           const post = await Comments.findOne({_id:req.params._id,likes:req.user._id})
           if(post) return  res.status(400).json({msg:"you already liked this!"})
           
            const newPost = await Comments.findOneAndUpdate({_id:req.params.id},{
                $push:{likes:req.user._id}
            },{new:true})
           if(!newPost) return res.status(400).json({msg: 'Comment Does not exit'})
            
           res.json({msg:'post liked!',
        newPost})
            
            
           
       }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    
    },
    unLikeComment : async (req,res) => {
        try {
                   
            const newPost = await Comments.findOneAndUpdate({_id:req.params.id},{
                $pull:{likes:req.user._id}
            },{new:true})
        
            if(!newPost) return res.status(400).json({msg: 'Comment Does not exit'})
            res.json({msg:'post Unliked!',
        newPost})
            
            
           
       }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    },
    deleteComment : async (req,res) => {
        try {
                   
         const comment = await Comments.findOneAndDelete({
          _id:req.params.id,
          $or:[
              {postUserId : req.user._id},
              {user: req.user._id}
              ]
            })
        if(!comment) return res.status(400).json({msg:'Wrong query'})

        await Posts.findOneAndUpdate({_id:comment.postId},{
            $pull : {comments : req.params.id}
        })

        
        
        res.json({msg:' comment deleted succesfully'})
       
            
            
           
       }catch(err){
           return  res.status(500).json({msg:err.message})
        }
    }
}

module.exports = commentCtrl