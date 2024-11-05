import { errorHandler } from "../../utils/error.js"
import Post from "../model/postModel.js"

export const createPost = async (req,res,next) => {
    const {title,content,category,image,} = req.body;
   try {
    if (!title || !content) {
        return next(errorHandler(400,'please provide all required feilds!'))
    }
    const post = new Post({
         title:title,
         content:content,
         category:category,
         image: image,
        userId:req.user.id,
    });

   const savedPost=  await post.save();
    res.status(201).json(savedPost)
   } catch (error) {
    next(error)
   }
}

export const deletePost = async (req,res,next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
  }


export const getPost = async (req,res,next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(errorHandler(404,'post not found'))
    }
    res.status(200).json(post)
  } catch (error) {
    next(error)
  } 
}

export const updatePost = async (req,res,next) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(errorHandler(404,'post not found' ));
}
if(req.user.id !== post.userId){
    return next(errorHandler(401, 'You can only update your own listings!'));
}

try{
    const  updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
   res.status(200).json(updatedpost);
}catch (err){
    next(err);
}

}