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

// Get comment by post
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
    try {
        let comments;
        if (username) {
            comments = await Comment.find({ username });
        } else if (postTitle) {
            comments = await Comment.find({
                posttitle: postTitle,
            });
        } else {
            comments = await Comment.find();
        }
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
