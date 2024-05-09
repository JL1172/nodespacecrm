import styled from "styled-components";

export const StyledSignIn = styled.div`
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