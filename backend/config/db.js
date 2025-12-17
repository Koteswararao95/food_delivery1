import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kampasatikampasati76:234@cluster0.4s1eubr.mongodb.net/FOOD-DEL')
    .then(()=>console.log("DB connected"));
}