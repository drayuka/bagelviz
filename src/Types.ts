
interface CroissantMetadata {
    name: string,
    url: string,
    description: string,
    license: string,
    citation: string,
    [key: string]: any,
    distribution: {
        name: string,
        contentUrl: string,
        contentSize: string,
        sha256: string,
        encodingFormat: string,
        [key: string]: string
    }[]
    recordSet:{
        name: string,
        description: string,
        key: string,
        field: {
            [key: string]: string | string[] | any
            name: string,
            description: string,
            dataType: string[] | string,
            source: string | {
                dataExtraction: {
                    "csvColumn": string
                }
                distribution: string
            },
        }[]
    }[]
}