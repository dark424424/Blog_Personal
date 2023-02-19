const moongoose = require('mongoose');

const UserSchema = new moongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            crequired: true,
        },
        profilePicture: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = moongoose.model('User', UserSchema);
