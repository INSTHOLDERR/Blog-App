import Post from "../models/postModel.js"
import User from '../models/userModel.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import HttpError from "../models/errorModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;

        if (!title || !category || !description || !req.files || !req.files.thumbnail) {
            return next(new HttpError("Fill in all fields and choose a thumbnail.", 422));
        }

        const { thumbnail } = req.files;

        if (thumbnail.size > 5000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 5MB.", 422));
        }

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("File upload failed. " + err.message, 500));
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id });
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created.", 500));
                }

                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

                res.status(201).json(newPost);
            }
        });

    } catch (error) {
        return next(new HttpError("An error occurred: " + error.message, 500));
    }
};








export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updateAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError("An error occurred: " + error.message, 500));
    }
}








export const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return next(new HttpError("Post not found.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}




export const getCatPost = async (req, res, next) => {
    try {

        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts)

    } catch (error) {
        return next(new HttpError(error))
    }
}





export const getUserPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts)

    } catch (error) {
        return next(new HttpError(error))
    }
}






export const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id; 
        let fileName;
        let newFilename;
        let updatedPost;
        let { title, description, category } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const oldPost = await Post.findById(postId);
        if (!oldPost) {
            return next(new HttpError("Post not found.", 404));
        }

        if (!req.files || !req.files.thumbnail) {
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
        } else {
            if (oldPost.thumbnail) {
                const oldThumbnailPath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
                if (fs.existsSync(oldThumbnailPath)) {
                    fs.unlink(oldThumbnailPath, (err) => {
                        if (err) {
                            return next(new HttpError("Failed to delete old thumbnail. " + err.message, 500));
                        }
                    });
                }
            }

            const { thumbnail } = req.files;
            if (thumbnail.size > 2000000) { 
                return next(new HttpError("Thumbnail too big. File should be less than 2MB.", 422));
            }

            fileName = thumbnail.name;
            let splittedFilename = fileName.split('.');
            newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];

            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                if (err) {
                    return next(new HttpError("File upload failed. " + err.message, 500));
                }

                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });

                if (!updatedPost) {
                    return next(new HttpError("Couldn't update post.", 400));
                }

                res.status(200).json(updatedPost);
            });

            return; 
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update post.", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError("An error occurred: " + error.message, 500));
    }
};








export const deletePost = async (req, res, next) => {
    try {

        const postId =req.params.id;
        console.log(postId);
        if(!postId){
            return next(new HttpError("Post unavailable.",400))
        }

        const post = await Post.findById(postId)
        const fileName=post?.thumbnail;

        fs.unlink(path.join(__dirname,'..','uploads',fileName),async (err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                await Post.findByIdAndDelete(postId);
                const currentUser =await User.findById(req.user.id)
                const userPostCount = currentUser?.posts-1;
                await User.findByIdAndUpdate(req.user.id,{posts : userPostCount})


            }
        })

        res.json(`Post ${postId} deleted successfully.`)
        
    } catch (error) {
        return next(new HttpError(error))
    }
}
