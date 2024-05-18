import styled from "styled-components";

export const StyledSignIn = styled.div`
#password-visibility {
    position: absolute;
    right: 1rem;
    top: 35%;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
}
.box {
    width: 40%;
}
.inner-box {
    width: 98%;
}
@media screen and (max-width: 900px) {
    .box {
        width: 55%;
    }
}
@media screen and (max-width: 700px) {
    .box {
        width: 75%;
    }
}
@media screen and (max-width: 500px) {
    .box {
        width: 100%;
    }
}
`