import { Box } from "@mui/material";

const userImage = ({image, size = "60px"})=>{
    return (
        <Box width={size} height={size}>
            <img 
            style={{
                objectFit: "cover",
                borderRadius: "50%",
            }}
            width={size}
            height={size}
            src={`https://social-media-app-server-mu.vercel.app/assets/${image}`}
            alt="user"
            />
        </Box>
    )
}

export default userImage;