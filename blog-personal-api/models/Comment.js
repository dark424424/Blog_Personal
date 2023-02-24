const moongoose = require('mongoose');

const CommentSchema = new moongoose.Schema(
    {
        posttitle: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = moongoose.model('Comment', CommentSchema);
