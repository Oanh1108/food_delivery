import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import 'dotenv/config';
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Cấu hình app
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Kết nối MongoDB trước khi xử lý requests
let isConnected = false;

const ensureDbConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Middleware để đảm bảo DB connected
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// API Endpoints
app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Chỉ listen khi chạy local
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export app cho Vercel
export default app;