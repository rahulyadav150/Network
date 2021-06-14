const Users = require('../models/userModel')
const Posts = require('../models/postModel')
const ApiFeatures = require('./postCtrl').ApiFeatures

const userCtrl = {
    searchUsers: async (req, res) => {
        try {
            const users = await Users.find({ userName: { $regex: req.query.username } })
                .limit(10).select('fullName userName avatar')
            res.json(users)
            
        } catch (err) {
            return res.status.json({ err: err.message });
        }
    },

    getUser: async (req, res) => {
        try {


            const user = await Users.findById({ _id: req.params.id })
            .populate('follower following','-password').select('-password')


            if (!user) return res.status(404).json({ msg: "User does not exist" })

            res.status(200).json({ user: user })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateUser: async (req, res) => {
        try {
            const { avatar, fullName, address, website, gender, mobile, story } = req.body

            if (!fullName) return res.status(500).json({ msg: "Please add your full name." })

            const updatedData = await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, fullName, address, website, gender, mobile, story
            })

            console.log(" dd", updatedData)
            res.json({ msg: 'Updated Succesfully' });


        } catch (err) {
            console.log(err.message)
            return res.status(500).json({ msg: err.message })
        }
    },

    follow: async (req, res) => {
        try {

            const users = await Users.find({ _id: req.params.id, follower: req.user._id })
            if (users.length > 0) return res.status(400).json({ msg: 'You already followed this user!' })

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { follower: req.user._id }
            }, { new: true })

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true })

            res.json({ msg: 'user followed' })

        } catch (err) {

            return res.status(500).json({ msg: err.message })
        }

    },

    unFollow: async (req, res) => {
        try {

            const users = await Users.find({ _id: req.params.id, follower: req.user._id })
            if (users.length = 0) return res.status(400).json({ msg: 'You already unFollow this user!' })

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { follower: req.user._id }
            }, { new: true })

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { following: req.params.id }
            }, { new: true })

            res.json({ msg: 'user unFollowed' })

        } catch (err) {

            return res.status(500).json({ msg: err.message })
        }

    },
    getUserPosts: async (req, res) => {
        try {
            const features = new ApiFeatures(Posts.find({user:req.params.id}),req.query).paginating()
             const posts = await features.query.sort('-createdAt')
             
             res.json({
                 posts,
                 result:posts.length
                })
            


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    suggestionsUser: async (req, res) => {
        try {
            
            const newArr = [...req.user.following,req.user._id]
            const num = req.query.num || 10

            const users = await Users.aggregate([
                {$match : {_id : {$nin : newArr}}},
                {$sample : {size : num}},
                {$lookup : {from : 'users',localField : 'follower',foreignField :'_id' ,as :'follower'}},
                {$lookup : {from : 'users',localField : 'following',foreignField :'_id' ,as :'following'}}

            ]).project('-password')
            
            res.json({
                users,
                result: users.length
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }




}


module.exports = userCtrl;