import { Avatar } from "@mui/material";
import { StyledCustomer } from "../styles/component-styles/StyledCustomer";
import { deepOrange } from "@mui/material/colors";

export default function Customer(props: {full_name: string, email: string, id: number}) {
    const {full_name, email, id} = props;
    return (
        <StyledCustomer>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{full_name[0]}</Avatar>
            <span>{full_name}</span>
            <span>update</span>
            <span>view more</span>
            <span>message</span>
        </StyledCustomer>
    )
}