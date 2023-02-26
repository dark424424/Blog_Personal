const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const bcrypt = require('bcrypt');

//Create new comment
router.post('/', async (req, res, next) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err);
    }
});

// delete comment

router.delete('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.username === req.body.username) {
            try {
                await comment.delete();

                res.status(200).json('Comment had been deleted');
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json('You can only delete your comment');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update comment
router.put('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.username === req.body.username) {
            try {
                const updatedComment = await Comment.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true },
                );
                res.status(200).json(updatedComment);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json('You can only update your comment');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get comments by post

router.get('/', async (req, res) => {
    const postTitle = req.query.title;
    const username = req.query.user;
    const postId = req.query.postId;
    try {
        let comments;
        if (username) {
            comments = await Comment.find({ username });
        } else if (postId) {
            comments = await Comment.find({
                postId: postId,
            }).sort({ updatedAt: -1 });
        } else {
            comments = await Comment.find().sort({ updatedAt: -1 });
        }
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
