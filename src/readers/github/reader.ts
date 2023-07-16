import { Octokit } from "octokit";

var owner = "mlcommons"
var repo = "croissant"
var path = "datasets"



const octokit = new Octokit();

const isfulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
    input.status === 'fulfilled'

export var GetDirectories = async () => await octokit.rest.repos.getContent({path: path, owner: owner, repo: repo})

export var GetMetadataFiles = async () => {
    var dirs = await GetDirectories();
    const metadataPaths: string[] = [];

    if (Array.isArray(dirs.data)) {
        dirs.data.forEach(item => {
            if (item.type == "dir") {
                metadataPaths.push(item.path + "/metadata.json");
            }
        });
    } else {
        return Promise.reject("did not recieve directory data from request")
    }
    console.log(metadataPaths);

    const metadataGets = metadataPaths.map((metadataPath) => octokit.rest.repos.getContent({path: metadataPath, owner: owner, repo: repo}))
    const metadataResponses = await Promise.allSettled(metadataGets);
    console.log("got here");

    const goodMetaResponses = metadataResponses.filter(isfulfilled);

    if (goodMetaResponses.length != 0) {
        return goodMetaResponses.map((item) => {
            const fileInfo = item.value.data
            if (!Array.isArray(fileInfo) && fileInfo.type === 'file') {
                return JSON.parse(fileInfo.content)
            }
    
        })
    } else {
        return [];
    }

}