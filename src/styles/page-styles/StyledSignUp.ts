import styled from "styled-components";

export const StyledSignUp = styled.div`
min-height: 100vh;
height: fit-content;
display: flex;
align-items: center;
#container {
    width: 75%;
    margin-top: 4rem;
    margin-bottom: 4rem;
    min-height: 80vh;
    height: fit-content;
}
#password-visibility {
    position: absolute;
    right: 1rem;
    top: 35%;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
}
@media screen and (max-width: 600px) {
    #container {
        width: 100%;
    }
}
`