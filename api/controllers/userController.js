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
 

 export const getUserPost =  async (req,res,next) => {
    if (req.user.id === req.params.id) {
      try {
        const Posts = await Post({userId:req.params.id});
        res.status(201).json(Posts);
      } catch (error) {
        next(error)
      }
    }else{
      next(errorHandler(401,'your can only view own post'))
    }
  }