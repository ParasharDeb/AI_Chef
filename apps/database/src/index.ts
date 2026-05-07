import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const schema=mongoose.Schema;
const ObjectId=schema.ObjectId;
export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.DATABASE_URL ;
  console.log(uri)
  if(!uri){
    console.log("db not found")
    return
  }
  await mongoose.connect(uri)
  console.log("Mongo connected");
}
const admin=new schema({
    name:{type:String,required:true},
    password:{type:String,required:true}
})
const dish=new schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String},
    available:{type:Boolean,required:true,default:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
})
export const adminModel=mongoose.model('admin',admin);
export const dishModel=mongoose.model('dish',dish)