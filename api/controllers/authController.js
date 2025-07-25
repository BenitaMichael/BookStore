import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

    try {
        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
      

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
      }
      
    try {
        const validatedUser = await User.findOne({email})
        if(!validatedUser){
            return next(errorHandler(404, 'Invalid credentials'))
        }
        const validPassword = bcryptjs.compareSync(password, validatedUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid credentials'))
        }
        const token = jwt.sign(
            { id: validatedUser._id, isAdmin: validatedUser.isAdmin},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        const { password: pass, ...rest } = validatedUser._doc;

        res.status(200).cookie('access_token', token, {
        httpOnly: true}).json(rest)
    } catch (error) {
        next(error)
    }
}

export const googleAuth = async(req, res, next) => {
    const {email, name, googlePhotoURL} = req.body

    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id, isAdmin : user.isAdmin}, process.env.JWT_SECRET);
            const{password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token,{
                httpOnly: true,
            }).json(rest);
        }else{
            const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
            username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: googlePhotoURL,
        });
        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id},
            process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
            .status(200)
            .cookie('access_token', token, {
            httpOnly: true,
            })
            .json(rest);
        }
    } catch (error) {
        next(error)
    }
}

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'No user found with that email' });

  // Generate reset token (you can use crypto or JWT)
  const resetToken = generateToken(user._id); // your implementation
  const resetLink = `https://your-app.com/reset-password/${resetToken}`;

  // Send email with resetLink (use nodemailer or similar)
  await sendEmail(user.email, resetLink); // your implementation

  res.json({ success: true, message: 'Reset link sent to your email' });
};
