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
    populateRequests: async function (currUser) {
        if (this.requests_count === 0) return [];
        const unresolved = Object.keys(this.connect_requests).map(async (item) => {
            const fetched = await mongoose.model('User').findById(item, 'avatar fullName username skills connect_requests');
            return fetched;
        })
        const resolved = await Promise.all(unresolved);
        const related = resolved.map((obj) => {
            obj = obj.toObject();
            const otherId = obj._id.toString();
            const currId = currUser._id.toString();
            if (otherId === currId) {
                obj.action = null;
            } else if (obj.connect_requests.hasOwnProperty(currId)) {
                obj.action = 'Requested';
            } else {
                currUser.getAction(otherId, obj);
            }
            return obj;
        });
        return related;
    },

    populateConnections: async function (currUser) {
        if (this.connections_count === 0) return [];
        const unresolved = Object.keys(this.connections).map(async (item) => {
            const result = await mongoose.model('User').findById(item, 'avatar fullName username skills connect_requests');
            return result;
        })
        const resolved = await Promise.all(unresolved)
        const related = resolved.map((obj) => {
            obj = obj.toObject();
            const otherId = obj._id.toString();
            const currId = currUser._id.toString();
            if (otherId === currId) {
                obj.action = null;
            } else if (obj.connect_requests.hasOwnProperty(currId)) {
                obj.action = 'Requested';
            } else {
                currUser.getAction(otherId, obj);
            }
            return obj;
        });
        return related;
    },

    toggleRequest: function (userId) {
        if (this.connect_requests.hasOwnProperty(userId)) {
            this.requests_count -= 1;
            if (this.requests_count === 0) { this.connect_requests.empty = true };
            delete this.connect_requests[userId];
            this.markModified('connect_requests');
            console.log(this.connect_requests);
            return 'Connect';
        } else {
            this.requests_count += 1;
            if (this.connect_requests.empty) { delete this.connect_requests.empty };
            this.connect_requests[userId] = 1;
            this.markModified('connect_requests');
            console.log(this.connect_requests);
            return 'Requested';
        }
    },

    toggleConnect: function (userId) {
        if (this.connect_requests.hasOwnProperty(userId)) {
            this.requests_count -= 1;
            if (this.requests_count === 0) { this.connect_requests.empty = true };
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
            this.connections_count += 1;
            if (this.connections.empty) { delete this.connections.empty };
            this.connections[userId] = 1;
            this.markModified('connections');
            console.log(this.connections);
            return 'Disconnect';
        }
    },

    getAction: function (otherId, obj) {
        if (this.connect_requests.hasOwnProperty(otherId)) {
            obj.action = 'Accept';
        } else if (this.connections.hasOwnProperty(otherId)) {
            obj.action = 'Disconnect';
        } else {
            obj.action = 'Connect';
        }
        // return obj;
    }
})






const User = mongoose.model("User", userSchema);
module.exports = User;