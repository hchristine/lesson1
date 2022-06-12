import mongoose, { Model } from 'mongoose';

const { Schema } = mongoose;

interface IPostDocument {
    userId: typeof Schema.Types.ObjectId;
    title: string;
    description: string
}

interface IPostModel extends Model<IPostDocument> {
    findWithComments(): Promise<IPostDocument[]>;
}

const postSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

postSchema.statics.findWithComments = function () {
    const shndl = [];

    shndl.push({
        $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postId',
            as: 'comments'
        }
    });
    return this.aggregate(shndl).exec();
}

export const Post = mongoose.model<IPostDocument, IPostModel>('post', postSchema);