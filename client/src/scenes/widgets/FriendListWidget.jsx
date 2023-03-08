import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
    const _id = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends);

    const isNonProfile = userId !== _id;

    const getFriends = async () => {
        const response = await fetch(`https://social-media-app-server-mu.vercel.app/users/${userId}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }
        useEffect(() => {
            getFriends();
        }, []);

        return (
            <WidgetWrapper>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight={500}
                    sx={{
                        mb: "1.5rem",
                    }}
                >
                    Friend List
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1.5rem"
                >
                    {Array.isArray(friends) && friends.map(friend => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                            isNonProfile={isNonProfile}
                        />
                    ))}
                </Box>
            </WidgetWrapper>
        )
    }


export default FriendListWidget;