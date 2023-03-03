import Post from '../models/Post.js';
import User from '../models/User.js';

// create post
export const createPost = async (req, res) => {
    try{
        const {userId, description , picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: {}
        })

        await newPost.save();

        const posts = await Post.find();

        res.status(201).json(posts);

    }catch(err){
        res.status(409).json({message: err.message})
    }
}


//read posts
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req,res)=>{
    const {userId} = req.params;
    try {
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

//update post
export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes[userId];
        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id,{likes: post.likes},{new: true});

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}