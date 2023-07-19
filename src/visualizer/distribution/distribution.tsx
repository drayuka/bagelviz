import { DistItems, DistTitle, DistBlock, DistItem } from "./styles";


interface distroProps {
    croiMeta: CroissantMetadata
}

export function Distribution(props: distroProps) {

    const croi = props.croiMeta

    if (!croi) {
        return <div></div>
    }

    const fieldList = ["name", "contentUrl", "contentSize", "sha256", "encodingFormat"]
    const distItems = fieldList.map((key, idx) => <DistItem style={{gridRow: 1, gridColumn:idx+1}} key={key}>{key}</DistItem>)
    croi.distribution.forEach((dist, index) => distItems.push(...fieldList.map((key, cindex) => {
            let val = dist[key];
            return (
                <DistItem style={{gridRow: index+2, gridColumn: cindex+1}} key={(index+1)+key}>
                    {val}
                </DistItem>
            )}
    )));

    return (
        <DistBlock>
            <DistTitle>Distributions</DistTitle>
            <DistItems>
                {distItems}
            </DistItems>
        </DistBlock>
    )
}