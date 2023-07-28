import { MetaBlock, MetaItemName, MetaTitle, MetaItem, MetaItemDesc, MetaItems } from "./styles"
import { TagUrls } from "../../utils"

interface metadataProps {
    croiMeta: CroissantMetadata
    id: string
}

export function Metadata(props: metadataProps) {
    const croi = props.croiMeta
    if (!croi) {
        return <div></div>
    }

    const items = ["name", "url", "description", "license", "citation"].map((key) => {

        const val = croi[key]
        return (
            <MetaItem key={key}>
                <MetaItemName>
                    {key}
                </MetaItemName>
                <MetaItemDesc>
                    {TagUrls(val)}
                </MetaItemDesc>
            </MetaItem>
        )
    })

    return (
        <MetaBlock id={props.id}>
            <MetaTitle>
                Metadata
            </MetaTitle>
            <MetaItems>
                {items}
            </MetaItems>
        </MetaBlock>
    )
}