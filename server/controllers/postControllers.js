import Post from "../models/postModel.js"
import User from '../models/userModel.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import HttpError from "../models/errorModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Ensure uploads directory exists
const ensureUploads = () => {
  const dir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

// ── Create post ───────────────────────────────────────────────────────────────
export const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description || !req.files || !req.files.thumbnail)
      return next(new HttpError("Fill in all fields and choose a thumbnail.", 422));

    const { thumbnail } = req.files;
    if (thumbnail.size > 5000000)
      return next(new HttpError("Thumbnail too big. File should be less than 5MB.", 422));

    const uploadsDir  = ensureUploads();
    const ext         = path.extname(thumbnail.name);
    const newFilename = `${uuid()}${ext}`;
    const uploadPath  = path.join(uploadsDir, newFilename);

    await thumbnail.mv(uploadPath);

    const newPost = await Post.create({
      title, category, description,
      thumbnail: newFilename,
      creator: req.user.id,
    });

    if (!newPost) return next(new HttpError("Post couldn't be created.", 500));

    // Increment user post count
    await User.findByIdAndUpdate(req.user.id, { $inc: { posts: 1 } });

    res.status(201).json(newPost);
  } catch (e) {
    return next(new HttpError("An error occurred: " + e.message, 500));
  }
};

// ── Get all posts ─────────────────────────────────────────────────────────────
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    return next(new HttpError("An error occurred: " + e.message, 500));
  }
};

// ── Get single post ───────────────────────────────────────────────────────────
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new HttpError("Post not found.", 404));
    res.status(200).json(post);
  } catch (e) {
    return next(new HttpError(e));
  }
};

// ── Get posts by category ─────────────────────────────────────────────────────
export const getCatPost = async (req, res, next) => {
  try {
    const catPosts = await Post.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (e) {
    return next(new HttpError(e));
  }
};

// ── Get posts by user ─────────────────────────────────────────────────────────
export const getUserPost = async (req, res, next) => {
  try {
    const posts = await Post.find({ creator: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    return next(new HttpError(e));
  }
};

// ── Edit post ─────────────────────────────────────────────────────────────────
export const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, description, category } = req.body;

    if (!title || !category || description.length < 12)
      return next(new HttpError("Fill in all fields.", 422));

    const oldPost = await Post.findById(postId);
    if (!oldPost) return next(new HttpError("Post not found.", 404));

    if (!req.files || !req.files.thumbnail) {
      // No new thumbnail — just update text fields
      const updated = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
      if (!updated) return next(new HttpError("Couldn't update post.", 400));
      return res.status(200).json(updated);
    }

    // New thumbnail provided
    const { thumbnail } = req.files;
    if (thumbnail.size > 2000000)
      return next(new HttpError("Thumbnail too big. Less than 2MB.", 422));

    // Delete old thumbnail
    if (oldPost.thumbnail) {
      const oldPath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch {}
      }
    }

    const uploadsDir  = ensureUploads();
    const ext         = path.extname(thumbnail.name);
    const newFilename = `${uuid()}${ext}`;
    await thumbnail.mv(path.join(uploadsDir, newFilename));

    const updated = await Post.findByIdAndUpdate(
      postId, { title, category, description, thumbnail: newFilename }, { new: true }
    );
    if (!updated) return next(new HttpError("Couldn't update post.", 400));
    res.status(200).json(updated);
  } catch (e) {
    return next(new HttpError("An error occurred: " + e.message, 500));
  }
};

// ── Delete post ───────────────────────────────────────────────────────────────
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) return next(new HttpError("Post unavailable.", 400));

    const post = await Post.findById(postId);
    if (!post) return next(new HttpError("Post not found.", 404));

    // Delete thumbnail file
    if (post.thumbnail) {
      const filePath = path.join(__dirname, '..', 'uploads', post.thumbnail);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch {}
      }
    }

    await Post.findByIdAndDelete(postId);

    // Decrement user post count
    const currentUser = await User.findById(req.user.id);
    if (currentUser && currentUser.posts > 0) {
      await User.findByIdAndUpdate(req.user.id, { $inc: { posts: -1 } });
    }

    res.json(`Post ${postId} deleted successfully.`);
  } catch (e) {
    return next(new HttpError(e));
  }
};
