const mongoose = require('mongoose');
const FriendRequestSchema = new mongoose.Schema({
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: 'string',
        enum:['PENDING', 'ACCEPTED','REJECTED']
    }
},{timestamps:true});
module.exports = mongoose.model('FriendRequest', FriendRequestSchema);)