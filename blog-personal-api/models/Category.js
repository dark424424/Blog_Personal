const moongoose = require('mongoose');

const CategorySchema = new moongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);

module.exports = moongoose.model('Category', CategorySchema);
