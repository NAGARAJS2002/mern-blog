import { errorHandler } from "../../utils/error.js";
import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs"

export const deleteUser =async (req,res,next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401 , 'you can only delete your own account!'));
  try {
    await User.findByIdAndUpdate(req.params.id);
    res.clearCookie('access_token')
    res.status(202).json('User has been deleted')
  } catch (error) {
    next(error)
  }
 }



export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
 
  export const getUserPosts = async (req, res, next) => {
    if (req.user?.id === req.params.id) {  // Ensure req.user is defined
      try {
        const posts = await Post.find({   userId: req.params.id });
        return res.status(200).json(posts); // Add return to prevent further execution
      } catch (error) {
        return next(error); // Proper error handling
      }
    } else {
      return next(errorHandler(401, 'You can only view your own posts!')); // Corrected typo
    }
  };