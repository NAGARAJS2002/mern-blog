import { errorHandler } from "../../utils/error.js";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs"
export const updateUser =async  (req,res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401,'You can only update your own account!'));
    }

try {
   if (req.body.password) {
     req.body.password=  bcryptjs.compareSync(req.body.password);
   }
   const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
        $set:{
            username: req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,
        }
    },
    {new:true}
  )
  await updatedUser.save();
  const { password, ...rest } = updatedUser._doc;
 
     res.status(200).json(rest);
   } catch (error) {
     next(error);
   }
  
}



// export const updateUser = async (req, res, next) => {
//     if (req.user.id !== req.params.id)
//       return next(errorHandler(401, 'You can only update your own account!'));
//     try {
//       if (req.body.password) {
//         req.body.password = bcryptjs.hashSync(req.body.password, 10);
//       }
  
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             avatar: req.body.avatar,
//           },
//         },
//         { new: true }
//       );
  
//       const { password, ...rest } = updatedUser._doc;
  
//       res.status(200).json(rest);
//     } catch (error) {
//       next(error);
//     }
//   };
 