import { FallingLines } from "react-loader-spinner";

export default function FallingSpinner() {
    return (
        <div style={{height : "100vh", width : "100%", display : "flex", justifyContent : "center", alignItems : "center"}}>
        <FallingLines
            color="#4F46E5"
            width="100"
            visible={true}
        />
        </div>
    )
}