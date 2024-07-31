import Story from "../models/storiesModel.js";
import { errorHandler } from "../utils/error.js";

export const create = async(req, res, next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not authorised to create  a story'));
    }
    if (!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide all required fields'))
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newStory = new Story({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    next(error);
  }
}