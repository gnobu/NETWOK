const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    // likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: { type: Object, default: { empty: true } },
    likes_count: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.method({
    populateLikes: async function () {
        if (this.likes_count === 0) return [];
        const unresolved = Object.keys(this.likes).map(async (item) => {
            const fetched = await mongoose.model('User').findById(item, 'avatar fullName username skills');
            return fetched;
        });
        const resolved = await Promise.all(unresolved);
        return resolved;
    },
    
    toggleLike: function (userId) {
        if (Object.hasOwn(this.likes, userId)) {
            delete this.likes[userId];
            this.likes_count -= 1;
            if (this.likes_count === 0) { this.likes.empty = true };
        } else {
            this.likes[userId] = 1
            this.likes_count += 1;
            if (this.likes.empty) { delete this.likes.empty };
        }
        return likesArray;
    }
})


const PostMessage = mongoose.model('PostMessage', postSchema);
module.exports = PostMessage;