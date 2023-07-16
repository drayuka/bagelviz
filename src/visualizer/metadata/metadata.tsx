import { MetaBlock, MetaItemName, MetaTitle, MetaItem, MetaItemDesc, MetaItems } from "./styles"

interface metadataProps {
    croiMeta: CroissantMetadata
}

export function Metadata(props: metadataProps) {
    const croi = props.croiMeta

    const items = ["name", "url", "description", "license", "citation"].map((key) => {

        const val = croi[key]
        return (
            <MetaItem key={key}>
                <MetaItemName>
                    {key}
                </MetaItemName>
                <MetaItemDesc>
                    {val}
                </MetaItemDesc>
            </MetaItem>
        )
    })

    return (
        <MetaBlock>
            <MetaTitle>
                Metadata
            </MetaTitle>
            <MetaItems>
                {items}
            </MetaItems>
        </MetaBlock>
    )
}