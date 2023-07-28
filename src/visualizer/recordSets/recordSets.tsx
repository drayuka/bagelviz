import { RecordBlock, RecordHint, RecordSetTitle, RecordTitle, RecordSet, RecordSetItem, RecordSetFields, RecordSetFieldItem, RecordSetFieldColumnItem } from "./styles"
import { TagUrls } from "../../utils"
interface recordSetsProps {
    croiMeta: CroissantMetadata
    id: string
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
                const val = field[key]
                const colorize = recordSet.key == field.name 
                if (key == "source") {
                    const source = field[key]
                    if( typeof source == 'object' ) {
                        let item : string
                        if(source?.distribution) {
                            item = "distribution: " + source?.distribution
                        } else {
                            item = source?.dataExtraction?.csvColumn + " @ " + source?.distribution
                        }   
                        return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1, fontWeight: colorize ? 'bold' : 'inherit'}} key={(ridx+2)+key}>{item}</RecordSetFieldItem>
                    }
                    return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1, fontWeight: colorize ? 'bold' : 'inherit'}} key={(ridx+2)+key}>{source}</RecordSetFieldItem>
                } else if (key == "dataType") {
                    let dt: string;
                    const dataType = field[key];
                    if(Array.isArray(dataType)) {
                        dt = dataType.join(', ');
                    } else {
                        dt = dataType;
                    }
                    return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1, fontWeight: colorize ? 'bold' : 'inherit'}} key={(ridx+2)+key}>{dt}</RecordSetFieldItem>
                } else if (key == "description" && val != undefined) {
                    return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1, fontWeight: colorize ? 'bold' : 'inherit'}} key={(ridx+2)+key}>{TagUrls(field[key])}</RecordSetFieldItem>
                }
                return <RecordSetFieldItem style={{gridRow: ridx+2, gridColumn:cidx+1, fontWeight: colorize ? 'bold' : 'inherit'}} key={(ridx+2)+key}>{field[key]}</RecordSetFieldItem>
            }))
        })
        return <RecordSet key={recordSet.name}>
            <RecordSetTitle>{recordSet.name}</RecordSetTitle>
            <RecordSetItem>{recordSet.description? TagUrls(recordSet.description) : ""}</RecordSetItem>
            <RecordSetFields>
                {recordSetFields}
            </RecordSetFields>
        </RecordSet>
    })
    return (
        <RecordBlock id={props.id}>
            <RecordTitle>Record Sets<br/><RecordHint>Keys are bolded, if available</RecordHint></RecordTitle>
            {recordSets}
        </RecordBlock>
    )
}