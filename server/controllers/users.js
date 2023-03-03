import User from "../models/User.js";

// get a user 

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

// get user friends
export const getUserFriends = async (req, res) => {
    try{
        const {id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
            );
    
            const formatedFriends = friends.map((friend) => {
                const { _id, firstName, lastName, picturePath, occupation, location } = friend;
                return { _id, firstName, lastName, picturePath, occupation, location };
            });
            res.status(200).json(formatedFriends);
    
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

//update friends
export const addRemoveFriend = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        } 

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
            );
    
            const formatedFriends = friends.map((friend) => {
                const { _id, firstName, lastName, picturePath, occupation, location } = friend;
                return { _id, firstName, lastName, picturePath, occupation, location };
            });
        
        res.status(200).json(formatedFriends);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
