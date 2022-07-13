const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    bio: String,
    skills: [{ type: String }],
    connections: { type: Object, default: { empty: true } },
    connections_count: { type: Number, default: 0 },
    connect_requests: { type: Object, default: { empty: true } },
    requests_count: { type: Number, default: 0 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostMessage' }]
}, { timestamps: true });


userSchema.method({
    populateRequests: async function () {
        if (this.requests_count === 0) return [];
        const unresolved = Object.keys(this.connect_requests).map(async (item) => {
            const fetched = await mongoose.model('User').findById(item, 'avatar fullName username skills');
            return fetched;
        })
        const resolved = await Promise.all(unresolved);
        return resolved;
    },

    toggleRequest: function (userId) {
        if (this.connect_requests.hasOwnProperty(userId)) {
            this.requests_count -= 1;
            if (this.requests_count === 0) { this.connect_requests.empty = true };
            delete this.connect_requests[userId];
            console.log(this.connect_requests);
            return 'Connect';
        } else {
            this.connect_requests[userId] = 1;
            this.requests_count += 1;
            if (this.connect_requests.empty) { delete this.connect_requests.empty };
            console.log(this.connect_requests);
            return 'Requested';
        }
    },

    populateConnections: async function () {
        if (this.connections_count === 0) return [];
        const unresolved = Object.keys(this.connections).map(async (item) => {
            const result = await mongoose.model('User').findById(item, 'avatar fullName username skills');
            return result;
        })
        const resolved = await Promise.all(unresolved);
        return resolved;
    },

    toggleConnect: function (userId) {
        if (this.connect_requests.hasOwnProperty(userId)) {
            this.requests_count -= 1;
            delete this.connect_requests[userId];
            this.markModified('connect_requests');
        }
        if (this.connections.hasOwnProperty(userId)) {
            this.connections_count -= 1;
            if (this.connections_count === 0) { this.connections.empty = true };
            delete this.connections[userId];
            this.markModified('connections');
            console.log(this.connections);
            return 'Connect';
        } else {
            this.connections[userId] = 1;
            this.connections_count += 1;
            if (this.connections.empty) { delete this.connections.empty };
            this.markModified('connections');
            console.log(this.connections);
            return 'Disconnect';
        }
    }
})



const User = mongoose.model("User", userSchema);
module.exports = User;