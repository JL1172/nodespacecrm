import styled from "styled-components";

export const StyledInputs = styled.div`
height : 100vh;
.input-default {
    padding-left : 5px;
    font-size : 1.4rem;
    height : 2.4rem;
    transition : .1s ease-in-out;
    &:focus {
        border : none;
        outline : 2px solid #4F46E5;
        transition : 50ms;
    }
}
#error {
    outline : 2px solid red;
}
button {
    height : 2.4rem;
    display : flex;
    align-items : center;
    justify-content : center;
}
.password-toggles {
    position : relative;
}
.icons {
    width : 1.5rem;
    height : 1.5rem;
    position : absolute;
    right : .2rem;
    top : .4rem;
    cursor: pointer;
}
#errorMessages {
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
}
.alerts {
    width : 50vw;
}
`