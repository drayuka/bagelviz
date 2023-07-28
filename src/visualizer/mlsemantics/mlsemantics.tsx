import { MLDesc, MLTitle, MLWrapper } from "./styles"

export interface MLSemanticsProps {
    id: string;
}

export function MLSemantics(props: MLSemanticsProps) {
    return (
        <MLWrapper id={props.id}>
            <MLTitle>ML Semantics</MLTitle>
            <MLDesc>None specified</MLDesc>
        </MLWrapper>
    )
}