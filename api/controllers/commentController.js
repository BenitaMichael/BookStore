import Comment from '../models/commentModel.js'

export const createComment = async (req, res, next) => {
  try {
    const { content, storyId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      storyId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};


export const getStoryComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ storyId: req.params.storyId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};