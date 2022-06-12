import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

export const Comment = mongoose.model('comment', commentSchema);