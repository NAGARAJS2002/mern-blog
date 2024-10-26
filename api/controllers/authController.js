
import User from "../model/userModel.js"
export const signup = async  (req,res,next) => {
    const {username,email,password} = req.body;
    if (!username||!email||!password) {
      return res.json({error:'All fileds(username,email,password) required'});
}
try {
    const newUser = new User({
        username:username,
        email:email,
        password:password,
       });
    
       await newUser.save();
 res.status(201).json('User created cuccessfully!');   
} catch (error) {
    next(error);
}
  
}