import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


//login user
const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    try {
        //Truy vấn user từ database
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false, message:"User Doesn't exist"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }
    
        const token = createToken(user._id);
        res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
    
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Kiểm tra định dạng email và độ mạnh của mật khẩu
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Băm mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        // In lỗi chi tiết để tìm ra nguyên nhân
        console.error("Error in registerUser:", error);
        res.json({ success: false, message: error.message || "Error" });
    }
};


export {loginUser, registerUser};