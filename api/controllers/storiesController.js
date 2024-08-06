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

export const getStories = async(req, res, next) =>{
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const stories = await Story.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.author && { category: req.query.author }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalStories = await Story.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() -1,
      now.getDate()
    );

    const lastMonthStories = await Story.countDocuments({
      createdAt: {$gte: oneMonthAgo},
    });

    res.status(200).json({
      stories,
      totalStories,
      lastMonthStories,
    })

  } catch (error) {
    next(error)
  }
}

export const deleteStory = async(req, res, next) =>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this story'));
  }
  try {
    await Story.findByIdAndDelete(req.params.storyId);
    res.status(200).json('The story has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateStory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.storyId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedStory);
  } catch (error) {
    next(error);
  }
};