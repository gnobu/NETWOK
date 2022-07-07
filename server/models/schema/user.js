const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    bio: String,
    skills: [{ type: String }],
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostMessage' }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;