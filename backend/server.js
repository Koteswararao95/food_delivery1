import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// API routes
app.use('/api/food', foodRouter);
//show froentend image
app.use("/images",express.static('public/image'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)



// Base route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
