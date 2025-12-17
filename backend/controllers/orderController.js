
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false, // initially unpaid
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartDate: {} });

    // Create line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Price in paise (₹1 = 100 paise)
      },
      quantity: item.quantity,
    }));

    // Add delivery charge (₹2)
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100, // ₹2 in paise
      },
      quantity: 1,
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// Verify Order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      // Mark order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      // Optional: Keep the order and allow retry
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      res.json({ success: false, message: "Payment canceled" });
    }
  } catch (error) {
    console.error("Order verification error:", error);
    res.json({ success: false, message: "Verification failed" });
  }
};

// user order for fronted 
const userOrders = async(req,res)=> {
   

  try {
     const orders = await orderModel.find({userId:req.body.userId});
     res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}
// Listing orders for admin pannel 
 const listOrders =async (req,res)=>{
   try {
    const orders = await orderModel.find({})
    res.json({success:true,data:orders})
    
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
   }

 }
 //  api for updating order staus
  const updateStatus = async(req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status Update"})
      
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }

  }
export { placeOrder, verifyOrder,userOrders ,listOrders,updateStatus};
