import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import postgres from "postgres";
dotenv.config();

import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoutes.js';
import createSchema from './Tables/createSchema.js';
import sql from './config/db.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://store-review-six.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

// createSchema()  


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
