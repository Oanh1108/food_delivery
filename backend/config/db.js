import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://oanh1008:oanh1008@cluster0.n4tfnwq.mongodb.net/food-del')
    .then(()=>console.log("DB Connected"));
}