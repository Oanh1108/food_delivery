import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import foodModel from './models/foodModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrate = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(' Connected\n');

  const foods = await foodModel.find({});
  let success = 0, skip = 0, error = 0;

  for (const food of foods) {
    if (food.image?.startsWith('http')) {
      console.log(` Skip: ${food.name}`);
      skip++;
      continue;
    }

    const imagePath = path.join(__dirname, 'uploads', food.image);
    if (!fs.existsSync(imagePath)) {
      console.log(` Not found: ${food.image}`);
      error++;
      continue;
    }

    try {
      console.log(` ${food.name}...`);
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'food-delivery'
      });
      
      food.image = result.secure_url;
      food.images = [result.secure_url];
      await food.save();
      
      console.log(`Done\n`);
      success++;
    } catch (err) {
      console.log(` Error: ${err.message}\n`);
      error++;
    }
  }

  console.log(`\n Success: ${success} |  Skip: ${skip} |  Error: ${error}`);
  await mongoose.connection.close();
};

migrate();
