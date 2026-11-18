require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const helmet=require('helmet');
const rateLimit=require('express-rate-limit');
const Review=require('./models/Review');
const app=express();
const cors=require('cors');
app.disable('x-powered-by');
app.use(helmet({contentSecurityPolicy:false}));
app.use(cors());
app.use(express.json({limit:'16kb'}));
app.use(express.static(path.join(__dirname,'public')));
const reviewLimiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,message:{success:false,message:'बहुत सारे reviews भेजे गए हैं। 15 मिनट बाद कोशिश करें।'}});
app.get('/api/reviews',async(req,res)=>{
 try{
   const limit=Math.min(Math.max(parseInt(req.query.limit,10)||30,1),111);
   const reviews=await Review.find({}).sort({createdAt:-1}).limit(limit).select('name product comment rating createdAt').lean();
   res.set('Cache-Control','no-store');res.json({success:true,reviews});
 }catch(e){console.error('GET reviews:',e);res.status(500).json({success:false,message:'Reviews load नहीं हो पाए'});}
});
app.post('/api/reviews',reviewLimiter,async(req,res)=>{
 try{
   const {name,product,comment,rating}=req.body||{};
   if(typeof name!=='string'||name.trim().length<2||name.trim().length>80||typeof comment!=='string'||comment.trim().length<3||comment.trim().length>1000||!['HIM POWER MAX Powder','HIM POWER Oil','HIM POWER Combo'].includes(product)||!Number.isInteger(rating)||rating<1||rating>5){return res.status(400).json({success:false,message:'Name, product, comment और 1-5 rating सही भरें'});}
   const review=await Review.create({name:name.trim(),product,comment:comment.trim(),rating});
   res.status(201).json({success:true,message:'Review saved',review});
 }catch(e){console.error('POST reviews:',e);res.status(500).json({success:false,message:'Review save नहीं हो पाया'});}
});
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
const port=Number(process.env.PORT)||3089;
mongoose.connect("mongodb+srv://lokeshkumariiit_db_user:ELXY3au9HgDpBqp5@cluster0.ztuzep3.mongodb.net/quotexx?retryWrites=true&w=majority",{serverSelectionTimeoutMS:10000}).then(()=>{
 app.listen(port,()=>console.log(`Him Ayurveda website + API running on port ${port}`));
}).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
