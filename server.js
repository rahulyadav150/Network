require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser');
var path = require('path')




const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use('/api',require('./routes/authRouter'));
app.use('/api',require('./routes/userRouter'));
app.use('/api',require('./routes/postRouter'));
app.use('/api',require('./routes/commentRouter'));
app.use(express.static(path.join(__dirname, "client", "build")))








const URL=process.env.MONGODB_URL;
mongoose.connect(URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err)
    throw err;
    console.log("connected to mongoDB");
})




app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    
});
const port=process.env.PORT || 5000
app.listen(port,function(req,res){
    console.log("server started on port ",port);
})
