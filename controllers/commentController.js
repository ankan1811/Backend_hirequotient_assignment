const Comment = require('../models/commentModel');

// Controller methods
const commentController = {
  async getAllComments(req, res) {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getCommentById(req, res) {
    const commentId = req.params.commentId;

    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createComment(req, res) {
    const { content, postId,userId,profileId } = req.body;

    try {
      const newComment = new Comment({
        content,
        postId: postId, // Assuming postId is passed from the request
        userId: userId,
        profileId: profileId
      });

      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateComment(req, res) {
    const commentId = req.params.commentId;
    const { content } = req.body;

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json(updatedComment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async deleteComment(req, res) {
    const commentId = req.params.commentId;

    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = commentController;
