const Post = require('../models/postModel');

// Controller methods
const postController = {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getPostById(req, res) {
    const postId = req.params.postId;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createPost(req, res) {
    const { title, content, userId,profileId } = req.body;

    try {
      const newPost = new Post({
        title,
        content,
        userId: userId,
        profileId:profileId // Assuming you pass the author's ID from the request
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updatePost(req, res) {
    const postId = req.params.postId;
    const { title, content } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async getPostsByUser (req, res) {
    const userId = req.params.userId; // Assuming the userId is passed in the URL parameters
  
    try {
      const posts = await Post.find({ userId: userId });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    },

  async deletePost(req, res) {
    const postId = req.params.postId;

    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
// Get all posts by a specific user


module.exports = postController;
