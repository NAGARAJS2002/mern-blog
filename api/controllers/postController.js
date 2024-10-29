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