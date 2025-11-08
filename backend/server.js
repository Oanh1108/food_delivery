import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import 'dotenv/config'; // Import dotenv để sử dụng các biến môi trường
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Kết nối MongoDB
connectDB();

// Cấu hình app
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
    res.send("API Working");
});

// Chỉ listen khi chạy local, không listen trên Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export app cho Vercel
export default app;