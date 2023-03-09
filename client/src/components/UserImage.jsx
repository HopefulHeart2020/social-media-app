import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const userImage = ({image, size = "60px"})=>{
    const url  = "https://3.75.176.58:8080";

    
    return (
        <Box width={size} height={size}>
            <img 
            style={{
                objectFit: "cover",
                borderRadius: "50%",
            }}
            width={size}
            height={size}
            src={`${url}/assets/${image}`}
            alt="user"
            />
        </Box>
    )
}

export default userImage;