import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import HttpError from "../models/errorModel.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Register ──────────────────────────────────────────────────────────────────
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password)
      return next(new HttpError("Fill in all fields.", 422));

    const newEmail = email.toLowerCase();
    if (await User.findOne({ email: newEmail }))
      return next(new HttpError("Email already exists.", 422));

    if (password.trim().length < 6)
      return next(new HttpError("Password should be at least 6 characters.", 422));

    if (password !== password2)
      return next(new HttpError("Passwords do not match.", 422));

    const salt      = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser   = await User.create({ name, email: newEmail, password: hashedPass });
    res.status(201).json(`New user ${newUser.email} registered`);
  } catch {
    return next(new HttpError("User registration failed.", 422));
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new HttpError("Fill in all fields.", 422));

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return next(new HttpError("Invalid credentials.", 422));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new HttpError("Invalid credentials.", 422));

    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ token, id, name });
  } catch {
    return next(new HttpError("Login failed. Please check your credentials.", 500));
  }
};

// ── Get single user ───────────────────────────────────────────────────────────
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return next(new HttpError("User not found.", 404));
    res.status(200).json(user);
  } catch (e) {
    return next(new HttpError(e));
  }
};

// ── Change avatar ─────────────────────────────────────────────────────────────
export const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar)
      return next(new HttpError("Please choose an image.", 422));

    const avatar = req.files.avatar;
    if (avatar.size > 5 * 1024 * 1024)
      return next(new HttpError("Profile picture too big. Less than 5MB.", 422));

    const user = await User.findById(req.user.id);
    if (!user) return next(new HttpError("User not found.", 404));

    // Delete old avatar
    if (user.avatar) {
      const oldPath = path.join(__dirname, '..', 'uploads', user.avatar);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch {}
      }
    }

    const ext         = path.extname(avatar.name);
    const newFilename = `${uuidv4()}${ext}`;
    const uploadPath  = path.join(__dirname, '..', 'uploads', newFilename);

    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    await avatar.mv(uploadPath);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, { avatar: newFilename }, { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser, avatar: newFilename });
  } catch (e) {
    return next(new HttpError(e.message || "Avatar upload failed.", 500));
  }
};

// ── Edit user (partial — only update what's provided) ─────────────────────────
export const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return next(new HttpError("User not found.", 403));

    // Build update object — only change what the user actually sent
    const updates = {};

    if (name  && name.trim())  updates.name  = name.trim();
    if (email && email.trim()) {
      const lowerEmail = email.toLowerCase().trim();
      // Check email uniqueness only if it's changing
      if (lowerEmail !== user.email) {
        const existing = await User.findOne({ email: lowerEmail });
        if (existing) return next(new HttpError("Email already in use.", 422));
      }
      updates.email = lowerEmail;
    }

    // Password change — only if currentPassword is provided AND not a skip signal
    const wantsPasswordChange = currentPassword && currentPassword !== '__skip__';
    if (wantsPasswordChange) {
      if (!newPassword || !confirmNewPassword)
        return next(new HttpError("Please fill in all password fields.", 422));

      if (newPassword !== confirmNewPassword)
        return next(new HttpError("New passwords do not match.", 422));

      if (newPassword.length < 6)
        return next(new HttpError("New password must be at least 6 characters.", 422));

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return next(new HttpError("Current password is incorrect.", 422));

      const salt   = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    if (Object.keys(updates).length === 0)
      return next(new HttpError("No changes to save.", 422));

    const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.status(200).json(updated);
  } catch (e) {
    return next(new HttpError(e.message || "An unexpected error occurred.", 500));
  }
};

// ── Get all authors ───────────────────────────────────────────────────────────
export const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select('-password');
    res.json(authors);
  } catch (e) {
    return next(new HttpError(e));
  }
};
