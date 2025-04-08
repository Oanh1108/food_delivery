import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Add food item
const addFood = async (req, res) => {
  try {
    // Lấy tên tệp ảnh từ req.file.filename
    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    // Lưu món ăn vào cơ sở dữ liệu
    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log("Error in addFood:", error); // In lỗi chi tiết
    res.status(500).json({ success: false, message: error.message || "Error" });
  }
};

// Get all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in listFood:", error);
    res.status(500).json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    // Tìm món ăn trong cơ sở dữ liệu theo ID
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      console.log("Food not found with ID:", req.body.id);
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Log thông tin món ăn
    console.log("Found food:", food);

    // Đảm bảo đường dẫn tệp ảnh chính xác
    const imagePath = path.join('uploads', food.image);
    console.log("Image path:", imagePath);

    // Xóa ảnh khỏi thư mục uploads nếu tồn tại
    if (fs.existsSync(imagePath)) {
      // Xóa ảnh từ thư mục uploads
      await fs.promises.unlink(imagePath);
      console.log(`Deleted image: ${imagePath}`);
    } else {
      console.log(`Image not found at path: ${imagePath}`);
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await foodModel.findByIdAndDelete(req.body.id);
    console.log(`Food with ID ${req.body.id} deleted`);

    // Trả về phản hồi thành công
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in removeFood:", error);
    res.status(500).json({ success: false, message: "Error occurred while removing food" });
  }
};

export { addFood, listFood, removeFood };
