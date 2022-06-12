import mongoose, { Document, Model } from 'mongoose';

export interface IUserDocument {
    name?: string;
    email: string;
    password: string;
}

interface IUserModel extends Model<IUserDocument> {
    findWithPosts(): Promise<IUserDocument[]>;
    register(data: IUserDocument): Promise<IUserDocument & Document>;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please insert an email."]
    },
    password: {
        type: String,
        required: [true, "Please insert a password."]
    }
});

userSchema.statics.register = function (data: IUserDocument) {
    return this.create({
        email: data.email,
        password: data.password
    });
}

userSchema.statics.findWithPosts = function () {
    const pipeline = [];

    pipeline.push({
        $lookup: { // join
            from: 'posts',
            localField: '_id',
            foreignField: 'userId',
            as: 'posts'
        }
    });

    pipeline.push({
        $unwind: {
            path: '$posts',
            preserveNullAndEmptyArrays: true
        }
    });

    pipeline.push({
        $lookup: {
            from: 'comments',
            localField: 'posts._id',
            foreignField: 'postId',
            as: 'posts.comments'
        }
    });

    pipeline.push({
        $group: {
            _id: '$_id',
            name: { $first: '$name' },
            posts: {
                $push: '$posts'
            }
        }
    });

    return this.aggregate(pipeline).exec();
}

export const User = mongoose.model<IUserDocument, IUserModel>('user', userSchema);
