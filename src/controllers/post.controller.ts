import { Request, Response } from 'express';
import Post from '../models/post.model';

const ITEMS_PER_PAGE = 10; // Number of posts per page
// Fetch all blog posts

export const getPosts = async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });
    res.status(200).json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / ITEMS_PER_PAGE),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Fetch a specific blog post by ID
export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Create a new blog post
export const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      author,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Update an existing blog post
export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a blog post
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};
