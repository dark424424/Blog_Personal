const moongoose = require('mongoose');

const PostSchema = new moongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true },
);

module.exports = moongoose.model('Post', PostSchema);
