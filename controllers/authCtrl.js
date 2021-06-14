const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
    register: async (req, res) => {
        try {

            const { fullName, userName, email, password, gender } = req.body;
            let newusername = userName.toLowerCase().replace(/\s/g, '');
            const user_name = await Users.findOne({ userName: newusername });
            if (user_name) return res.status(400).json({ msg: 'username already exist' });

            const user_email = await Users.findOne({ email: email });
            if (user_email) return res.status(400).json({ msg: 'email already exist' });

            if (password.length < 6)
                return res.status(400).json({ msg: 'password must be 6 character long' })

            // res.json({msg:'registered'});
            const passwordhash = await bcrypt.hash(password, 12);
            const newUser = new Users({
                fullName: fullName,
                userName: newusername,
                email: email,
                password: passwordhash,
                gender: gender
            })
            const access_token = createAcessToken({ _id: newUser._id });
            const refresh_token = createRefreshToken({ _id: newUser._id });
            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            const n = await newUser.save();
            res.json({
                access_token,
                user: n._doc,
                msg: 'Registered suceessfully !'
            })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
           
            const user = await Users.findOne({ email: email })
                .populate('follower following ', '-password');

            if (!user) return res.status(404).json({ msg: 'user not found' });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(404).json({ msg: 'incorrect password' });

            const access_token = createAcessToken({ _id: user._id });
            const refresh_token = createRefreshToken({ _id: user._id });
            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            

            return res.status(200).json({
                user: user,
                access_token: access_token,
                msg: 'suucesfully authenticated'
            })





        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: '/api/refresh_token' });
            return res.status(200).json("logged out!");
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    generateAccessToken: async (req, res) => {
       
        try {
            const rf_token = req.cookies.refreshToken;


            if (!rf_token) return res.status(400).json({ msg: 'please login' });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: 'please login' });

                const user = await Users.findById(result._id).select('-password')
                    .populate('follower following',-'password');
                if (!user) return res.status(400).json({ msg: 'please login' });

                const accessToken = createAcessToken({ _id: user._id });
               
                return res.status(200).json({ accessToken: accessToken, user: user })

            });


        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

const createAcessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    });
}


module.exports = authCtrl;