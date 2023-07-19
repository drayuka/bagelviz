import { RecordBlock, RecordSetTitle, RecordTitle, RecordSet, RecordSetItem, RecordSetFields, RecordSetFieldItem, RecordSetFieldColumnItem } from "./styles"

interface recordSetsProps {
    croiMeta: CroissantMetadata
}

export function RecordSets(props: recordSetsProps) {
    const fieldColumns = ["name", "description", "dataType", "source"]
    if (!props.croiMeta) {
        return <div></div>
    }
    const recordSets = props.croiMeta.recordSet.map((recordSet) => {
        const recordSetFields : JSX.Element[] = [];
        recordSetFields.push(...fieldColumns.map((key, cidx) => 
            <RecordSetFieldColumnItem style={{gridRow: 1, gridColumn:cidx+1}} key={1+key}>{key}</RecordSetFieldColumnItem>
        ))
        recordSet.field.forEach((field, ridx) => {
            recordSetFields.push(...fieldColumns.map((key, cidx) => {
                if (key == "dataType") {
                    let dt: string;
                    const dataType = field[key];
                    if(Array.isArray(dataType)) {
                        dt = dataType.join(', ');
                    } else {
                        dt = dataType;
                    }
                    return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1}} key={(ridx+2)+key}>{dt}</RecordSetFieldItem>
                } else {
                    return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1}} key={(ridx+2)+key}>{field[key]}</RecordSetFieldItem>
                }
            }))
        })
        return <RecordSet key={recordSet.name}>
            <RecordSetTitle>{recordSet.name}</RecordSetTitle>
            <RecordSetItem>{recordSet.description}</RecordSetItem>
            <RecordSetFields>
                {recordSetFields}
            </RecordSetFields>
        </RecordSet>
    })
    return (
        <RecordBlock>
            <RecordTitle>RecordSets</RecordTitle>
            {recordSets}
        </RecordBlock>
    )
}