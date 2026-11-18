const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  name: {type:String,required:true,trim:true,minlength:2,maxlength:80},
  product: {type:String,required:true,enum:['HIM POWER MAX Powder','HIM POWER Oil','HIM POWER Combo']},
  comment: {type:String,required:true,trim:true,minlength:3,maxlength:1000},
  rating: {type:Number,required:true,min:1,max:5}
},{timestamps:true,versionKey:false});
reviewSchema.index({createdAt:-1});
module.exports=mongoose.model('Review',reviewSchema);
