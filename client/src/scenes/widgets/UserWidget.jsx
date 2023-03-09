import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material"
import { Box,Typography,Divider, useTheme } from "@mui/material"
import UserImage from "../../components/UserImage"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

const UserWidget = ({userId,picturePath}) => {
    const url  = useSelector((state) => state.URL);
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    const {palette} = useTheme()
    const token = useSelector(state => state.token)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://3.75.176.58:8080/users/${userId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const data = await response.json();
        setUser(data);
    } 

    useEffect(()=>{
        getUser()
        
    },[])

    if(!user) return null

    const {
        firstName,
        lastName,
        location,
        occupation,
        friends ,
    } = user

    return(
        <WidgetWrapper >
            {/* first row */}
            <FlexBetween
            
                gap="0.5rem"
                pb="1.1rem"
                onClick={()=>navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography 
                        variant="h4" 
                        color={dark} 
                        fontWeight="500" 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            }
                        }}
                        >{firstName} {lastName}</Typography>
                        <Typography color={medium}>Friends: {friends?.length }</Typography>
                    </Box>
                </FlexBetween>
                    <ManageAccountsOutlined />
                    </FlexBetween>
                <Divider />

                {/* second row */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb='0.5rem'>
                        <LocationOnOutlined fontSize="large" sx={{
                            color:main
                        }}/>
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" >
                        <WorkOutlineOutlined fontSize="large" sx={{
                            color:main
                        }}/>
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>
                <Divider />
                {/* third row */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem" >
                            <img src="../assets/twitter.png" alt="twitter"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium } >
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{
                            color:main
                        }}/>
                    </FlexBetween>

                    <FlexBetween gap="1rem" >
                        <FlexBetween gap="1rem" >
                            <img src="../assets/linkedin.png" alt="linkedin"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Linkedin
                                </Typography>
                                <Typography color={medium } >
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{
                            color:main
                        }}/>
                    </FlexBetween>
                </Box>

            
        </WidgetWrapper>
    )

}

export default UserWidget
