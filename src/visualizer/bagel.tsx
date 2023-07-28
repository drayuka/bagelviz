import { Metadata } from "./metadata/metadata";
import { Distribution } from "./distribution/distribution";
import { MLSemantics} from "./mlsemantics/mlsemantics"
import { RecordSets } from "./recordSets/recordSets";
import { Title, Option, Options, TitleWrapper, BodyWrapper, WindowWrapper, Selector } from "./styles";
import { Dropdown } from "antd";
import { useEffect, useState } from 'react'
import { Catcher } from "./catcher/catcher";

import { AiFillCaretDown } from "react-icons/ai";

interface bagelProps {
    metas: {
        [key: string]: CroissantMetadata;
    }
}

export function scrollToThing(target: string) {
    const element = document.getElementById(target)
    element?.scrollIntoView(true)
    if(target == 'MLSemantics') {
        return
    }
    window.scrollBy(0,-200)
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
        setCroiMeta("https://github.com/mlcommons/croissant/blob/main/datasets/titanic/metadata.json")
    }, [props.metas])
    const somekey='something'

    return (
    <WindowWrapper>
        <TitleWrapper>
            <Title>🥐 Croissant Visualizer v0.1</Title>
            <Options>
                <Option onClick={() => scrollToThing('Metadata')}>
                    Metdata
                </Option>
                <Option onClick={() => scrollToThing('Distribution')}>
                    Distribution
                </Option>
                <Option onClick={() => scrollToThing('RecordSets')}>
                    Record Sets
                </Option>
                <Option onClick={() => scrollToThing('MLSemantics')}>
                    ML Semantics
                </Option>
            </Options>
            <Selector>
                <Dropdown menu={{items}}><a>{croiMeta}<AiFillCaretDown/></a></Dropdown>
            </Selector>
            <Title style={{marginTop: '10px'}}/>
        </TitleWrapper>
        <Catcher key={croiMeta}>
            <BodyWrapper id="mainBody">
                <div id="something"></div>
                <Metadata id="Metadata" croiMeta={props.metas[croiMeta]}/>
                <Distribution id="Distribution" croiMeta={props.metas[croiMeta]}/>
                <RecordSets id="RecordSets" croiMeta={props.metas[croiMeta]}/>
                <MLSemantics id="MLSemantics" />
            </BodyWrapper>
        </Catcher>

    </WindowWrapper>
    )
}