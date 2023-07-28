import getUrls from "get-urls"
import { LinkWrapper } from "./util-styles"

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function TagUrls(incoming: string) : (string | JSX.Element)[] {
    const urls = getUrls(incoming, {stripWWW: false,removeQueryParameters: true, sortQueryParameters: false, stripTextFragment: false, stripAuthentication: false})
    let finals : (string | JSX.Element)[] = [incoming]
    Array.from(urls.values()).forEach((url) => {
        finals = finals.flatMap((chunk, oindex) => {
            if( typeof chunk != "string") {
                return chunk
            }
            if( chunk == url) {
                return [<LinkWrapper key={url+oindex}href={url}>{url}</LinkWrapper>]
            }
            const interleaved = chunk.split(url).flatMap((splits, iindex) => {
                return [splits, <LinkWrapper key={url+oindex+ "|" +iindex}href={url}>{url}</LinkWrapper>]
            })
            //remove extra link
            interleaved.pop()
            return interleaved
        })
    })
    return finals

}