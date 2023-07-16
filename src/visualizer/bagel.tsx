import { Metadata } from "./metadata/metadata";
import { Distribution } from "./distribution/distribution";
import { MLSemantics} from "./mlsemantics/mlsemantics"
import { RecordSets } from "./recordSets/recordSets";
import { Title, Option, Options, TitleWrapper, BodyWrapper, WindowWrapper } from "./styles";

interface bagelProps {
    croiMeta: CroissantMetadata;
}

export function Bagel(props: bagelProps) {


    return (<WindowWrapper>
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
    </TitleWrapper>
    <BodyWrapper>
        <Metadata croiMeta={props.croiMeta}/>
        <Distribution croiMeta={props.croiMeta}/>
        <RecordSets croiMeta={props.croiMeta}/>
        <MLSemantics croiMeta={props.croiMeta}/>
    </BodyWrapper>
    </WindowWrapper>
    )
}