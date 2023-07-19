import { Metadata } from "./metadata/metadata";
import { Distribution } from "./distribution/distribution";
import { MLSemantics} from "./mlsemantics/mlsemantics"
import { RecordSets } from "./recordSets/recordSets";
import { Title, Option, Options, TitleWrapper, BodyWrapper, WindowWrapper, Selector } from "./styles";
import { Dropdown } from "antd";
import { useEffect, useState } from 'react'

interface bagelProps {
    metas: {
        [key: string]: CroissantMetadata;
    }
}

export function Bagel(props: bagelProps) {

    const firstKey = Object.keys(props.metas)[0];
    const [croiMeta, setCroiMeta] = useState<string>(firstKey);
    const items = Object.keys(props.metas).map((key) => {
        return {
            key: key,
            label: (
                <div onClick={() => setCroiMeta(key)}>{key}</div>

            )
        }
    });
    useEffect(() => {
        setCroiMeta("datasets/titanic/metadata.json")
    }, [props.metas])
    console.log("bagel inf")
    console.log(props.metas);
    console.log(croiMeta);

    return (
    <WindowWrapper>
        <TitleWrapper>
            <Title>🥐 Croissant Visualizer v0.1</Title>
            <Options>
                <Option>
                    Metdata
                </Option>
                <Option>
                    Distribution
                </Option>
                <Option>
                    Record Sets
                </Option>
                <Option>
                    ML Semantics
                </Option>
            </Options>
            <Selector>
                <Dropdown menu={{items}}><div>{croiMeta}</div></Dropdown>
            </Selector>
        </TitleWrapper>
        <BodyWrapper>
            <Metadata croiMeta={props.metas[croiMeta]}/>
            <Distribution croiMeta={props.metas[croiMeta]}/>
            <RecordSets croiMeta={props.metas[croiMeta]}/>
            <MLSemantics/>
        </BodyWrapper>
    </WindowWrapper>
    )
}