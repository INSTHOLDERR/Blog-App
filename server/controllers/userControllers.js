import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import HttpError from "../models/errorModel.js";
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all fields.", 422))
        }
        const newEmail = email.toLowerCase()
        const emailExists = await User.findOne({ email: newEmail })

        if (emailExists) {
            return next(new HttpError("Email already exists.", 422))
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422))
        }

        if (password != password2) {
            return next(new HttpError("Password do not match.", 422))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass })
        res.status(201).json(`New User ${newUser.email} registered`)

    } catch (error) {
        return next(new HttpError("User registration failed.", 422))
    }
};





export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });

        if (!user) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials", 500));
    }
};









export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError("User not found", 422));
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error));
    }
};





export const changeAvatar = async (req, res, next) => {
  try {
    // CHECK FILE
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Please choose an image.", 422));
    }

    const avatar = req.files.avatar;

    // FILE SIZE CHECK
    if (avatar.size > 5 * 1024 * 1024) {
      return next(
        new HttpError("Profile picture too big. Less than 5MB.", 422)
      );
    }

    // FIND USER
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    // DELETE OLD AVATAR
    if (user.avatar) {
      const oldAvatarPath = path.join(
        __dirname,
        "..",
        "uploads",
        user.avatar
      );

      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // CREATE NEW FILE NAME
    const fileExtension = path.extname(avatar.name);

    const newFilename = `${uuidv4()}${fileExtension}`;

    const uploadPath = path.join(
      __dirname,
      "..",
      "uploads",
      newFilename
    );

    // MOVE FILE
    await avatar.mv(uploadPath);

    // UPDATE DATABASE
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: newFilename },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.log(error);
    return next(new HttpError(error.message || "Avatar upload failed", 500));
  }
};








export const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        console.log(name, email, currentPassword, newPassword, confirmNewPassword );
        
        if (!name || !email || !currentPassword || !newPassword || !confirmNewPassword) {
            return next(new HttpError("Please fill in all fields.", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found.", 403));
        }

        const emailExist = await User.findOne({ email });
        if (emailExist && emailExist._id.toString() !== req.user.id) {
            return next(new HttpError("Email already exists.", 422));
        }

        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid current password.", 422));
        }

        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("New passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash }, { new: true });
        res.status(200).json(newInfo);

    } catch (error) {
        console.error(`Error in editUser: ${error.message}`);
        return next(new HttpError("An unexpected error occurred.", 500));
    }
};











export const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error));
    }
};
