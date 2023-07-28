import { DistItems, DistTitle, DistBlock, DistItem, DistCopyLink } from "./styles";

import { AiFillCopy } from "react-icons/ai"

import { formatBytes } from "../../utils"; 

import { TagUrls } from "../../utils"


interface distroProps {
    croiMeta: CroissantMetadata
    id: string
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
        if(key == "sha256" && val != undefined && val != "") {
            return (
                <DistItem style={{gridRow: index+2, gridColumn: cindex+1}} key={(index+1)+key}>
                    <DistCopyLink onClick={() => {navigator.clipboard.writeText(val)}}>{val.slice(0,20) + "..."}<AiFillCopy/></DistCopyLink>
                </DistItem>
            )
        } else if(key == "contentSize" && val != undefined && val != "" && val.match(/[0-9]+ B/g)) {
            const number = Number(val.slice(0, val.length - 2))
            return (
                <DistItem style={{gridRow: index+2, gridColumn: cindex+1}} key={(index+1)+key}>
                    {formatBytes(number)}
                </DistItem>
            )
        } else if(key == "contentUrl" && val != undefined) {
            return (
                <DistItem style={{gridRow: index+2, gridColumn: cindex+1}} key={(index+1)+key}>
                    {TagUrls(val)}
                </DistItem>
            )
        }
        if(key == "contentSize" && val == " B") {
            val = ""
        }
        return (
            <DistItem style={{gridRow: index+2, gridColumn: cindex+1}} key={(index+1)+key}>
                {val}
            </DistItem>
        )
    })));
    

    return (
        <DistBlock id={props.id}>
            <DistTitle>Distributions</DistTitle>
            <DistItems>
                {distItems}
            </DistItems>
        </DistBlock>
    )
}