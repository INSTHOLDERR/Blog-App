import { Router } from 'express';
import {createPost,getPosts,getPost,getCatPost,getUserPost,editPost,deletePost} from '../controllers/postControllers.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.post('/',authMiddleware,createPost);
router.get('/',getPosts);
router.get('/:id',getPost);
router.get('/categories/:category',getCatPost);
router.get('/users/:id',getUserPost);
router.patch('/:id',authMiddleware,editPost);
router.delete('/:id',authMiddleware,deletePost);

export default router;
