import Story from "../models/storiesModel.js";
import { errorHandler } from "../utils/error.js";


//CREATE STORIES
export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not authorized to create a story'));
  }

  const { title, author, category, chapters, prologue, image } = req.body;

  if (!title || !author) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newStory = new Story({
    title,
    author,
    category,
    chapters: chapters || [],
    prologue: prologue || '',
    image,
    slug,
    userId: req.user.id,
  });

  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    next(error);
  }
};


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



// DELETE STORIES
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



// UPDATE STORY
export const updateStory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this story'));
  }

  try {
    const story = await Story.findById(req.params.storyId);

    if (!story) {
      return next(errorHandler(404, 'Story not found'));
    }

    if (req.body.title) story.title = req.body.title;
    if (req.body.category) story.category = req.body.category;
    if (req.body.image) story.image = req.body.image;
    if (req.body.prologue) story.prologue = req.body.prologue;
    if (req.body.epilogue) story.epilogue = req.body.epilogue;

    if (req.body.chapters) {
      req.body.chapters.forEach((chapter) => {
        const existingChapter = story.chapters.id(chapter._id);
        if (existingChapter) {
          // Update existing chapter
          existingChapter.title = chapter.title;
          existingChapter.content = chapter.content;
        } else {
          // Add new chapter
          story.chapters.push({
            title: chapter.title,
            content: chapter.content,
          });
        }
      });
    }

    // Handle chapter deletion
    if (req.body.removeChapterIds && Array.isArray(req.body.removeChapterIds)) {
      req.body.removeChapterIds.forEach((chapterId) => {
        story.chapters.pull(chapterId);
      });
    }

    const updatedStory = await story.save();
    res.status(200).json(updatedStory);
  } catch (error) {
    next(error);
  }
};
