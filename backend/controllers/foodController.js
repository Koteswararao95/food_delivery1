import foodModel from '../models/foodModel.js';

import fs from 'fs'


const addFood = async (req, res) => {
   // console.log('req.file:', req.file)
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image file is required.' });
  }

  let image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving food item" });
  }
};
//all food list database show
const listFood = async(req,res)=>{
   try {
      const foods = await foodModel.find({});
      res.json({success:true,data:foods})
      
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
   }

}
// remove food item our database 
const removeFood = async(req,res)=>{
   try {
      // find the food model id
      const food =await foodModel.findById(req.body.id);
      // delete image this folder
      fs.unlink(`public/image/${food.image}`,()=>{})
         await foodModel.findByIdAndDelete(req.body.id);
         res.json({success:true,message:"Food Remove"})
      
      
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
   }

}
export {addFood,listFood,removeFood}