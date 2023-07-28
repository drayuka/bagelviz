import { styled } from "styled-components"

export const LinkWrapper = styled.a`
    text-decoration: none;
    &:active {
        text-decoration: none;
    }
    &:hover, &focus: {
        color: red;
        text-decoration: underline;
    }
`