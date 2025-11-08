import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Upload image to Cloudinary from buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'food-delivery' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: uploadResult.secure_url
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log("Error in addFood:", error);
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
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      console.log("Food not found with ID:", req.body.id);
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image from Cloudinary if it exists
    if (food.image) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = food.image.split('/');
        const publicIdWithExt = urlParts[urlParts.length - 1];
        const publicId = `food-delivery/${publicIdWithExt.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image from Cloudinary: ${publicId}`);
      } catch (imgError) {
        console.log("Error deleting image from Cloudinary:", imgError);
      }
    }

    await foodModel.findByIdAndDelete(req.body.id);
    console.log(`Food with ID ${req.body.id} deleted`);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in removeFood:", error);
    res.status(500).json({ success: false, message: "Error occurred while removing food" });
  }
};

export { addFood, listFood, removeFood };
