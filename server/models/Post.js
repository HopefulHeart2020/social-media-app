import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    location:String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type:Array,
        default: []
    },

}
, { timestamps: true });

export default mongoose.model('Post', postSchema);