import styled from "styled-components";

export const StyledVerificationCodePage = styled.div`
height: 100dvh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
#input-boxes {
    display : flex;
    min-height: 10rem;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
    /* outline: 2px solid black; */
}
.text-field {
    width: 6rem;
    display: flex;
    justify-content: center;
    /* border: 2px solid blue; */
}
@media screen and (max-width: 500px) {
    #input-boxes {
        width: 75%;
    }
}
`