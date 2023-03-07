import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material"
import { Box, Divider , IconButton,Typography,useTheme } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import Friend from "../../components/Friend"
import WidgetWrapper from "../../components/WidgetWrapper"
import {useState} from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPosts } from "../../state"

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) =>{
    const [isComment,setIsComment] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLikked = Boolean(likes(loggedInUserId));
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId:loggedInUserId}),
        });

        const updatedPost = await response.json();
        dispatch(setPosts({posts:updatedPost}));
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend 
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{mt:"1rem"}}>{description}</Typography>
            {picturePath && <img 
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="post" 
            width="100%" 
            height="auto" 
            style={{
                borderRadius:"0.75rem" 
                ,marginTop:"0.75rem"
                }}
            />}

            <FlexBetween sx={{mt:"0.25rem"}}>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLikked ? <FavoriteOutlined color={primary} /> : <FavoriteBorderOutlined />}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComment(!isComment)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComment && (
                <Box sx={{mt:"0.5rem"}}>
                    {comments.map((comment,i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{color:main,m:"0.5rem",pl:"1rem"}}>{comment}</Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget
