const { create } = require('ipfs-http-client');
const fs = require("fs");
const { dir } = require('console');

const ipfs = create('/ip4/127.0.0.1/tcp/5001');
const toBuffer = require('it-to-buffer');

const isUser = async (userWalletAddress) => {
    try {
        const result = await ipfs.files.stat(`/${userWalletAddress}`);
        return result.cid.toString();
    }
    catch(error) {
        if (error.message === "file does not exist") return false
        console.log(error.message);
    }
}

const mkUserDir = async (dirName) => {
    try {
        await ipfs.files.mkdir(`/${dirName}/posts`, { parents: true });
        await ipfs.files.mkdir(`/${dirName}/userInfo`, { parents: true }); 
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS directory");
        console.error(error.message);
    }
}

const writeFile = async (_postData) => {
    try {
        await ipfs.files.mkdir(`/${_postData.userAddress}/posts/${_postData.postTitle}`, { parents: true });

        // write file to new file folder
        let fileCid = "";
        if (_postData.filePath) {
            const file = fs.readFileSync(_postData.filePath);
            await ipfs.files.write(`/${_postData.userAddress}/posts/${_postData.postTitle}/${_postData.postTitle}`, file, { create: true });
            fileCid = (await ipfs.files.stat(`/${_postData.userAddress}/posts/${_postData.postTitle}/${_postData.postTitle}`)).cid.toString();
        }


        // write file data to file folder
        const postData = { 
            "owner": _postData.userAddress, 
            "fileCid": fileCid, 
            "fileName": _postData.fileName,
            "postTitle": _postData.postTitle,
            "postBody": _postData.postBody,
        };
        await ipfs.files.write(`/${_postData.userAddress}/posts/${_postData.postTitle}/postData`, JSON.stringify(postData), { create: true });

        // change post directory name to cid of postData file
        let postDataCid = (await ipfs.files.stat(`/${_postData.userAddress}/posts/${_postData.postTitle}/postData`)).cid.toString();
        await ipfs.files.mkdir(`/${_postData.userAddress}/posts/${postDataCid}`, { parents: true });
        await ipfs.files.mv(`/${_postData.userAddress}/posts/${_postData.postTitle}/postData`,`/${_postData.userAddress}/posts/${postDataCid}`);
        if (_postData.filePath) {
            await ipfs.files.mv(`/${_postData.userAddress}/posts/${_postData.postTitle}/${_postData.postTitle}`,`/${_postData.userAddress}/posts/${postDataCid}`);
        }
        await ipfs.files.rm(`/${_postData.userAddress}/posts/${_postData.postTitle}/`, { recursive: true });

        const postObj = {}
        let dirLength = 0;
        for await (const resultPart of ipfs.files.ls(`/${_postData.userAddress}/posts/${postDataCid}`)) {
            if (resultPart.name === "postData") {
                postObj.postDataCid = resultPart.cid.toString();
            } else {
                postObj.postCid = resultPart.cid.toString();
            }
            dirLength++;
        }
        postObj.owner = _postData.userAddress;
        return postObj;
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS post");
        console.error(error.message);
    }
}

const getUserPosts = async (userWalletAddress) => {
    try {
        const result = [];
        for await (const resultPart of ipfs.files.ls(`/${userWalletAddress}/posts`)) {
            // getting the postData CID from the name of the directory
            // result.push(resultPart.name);
            result.push(await getPost(resultPart.name, userWalletAddress));
        }
        return result;
    }
    catch(error) {
        if (error.message === "file does not exist") return false
        console.log(error.message);
    }
}

const getPost = async (postDataCid) => {
    const bufferedContents = await toBuffer(ipfs.cat(postDataCid));
    const string = new TextDecoder("utf-8").decode(bufferedContents);
    return JSON.parse(string);
}

module.exports = { isUser, mkUserDir, writeFile, getUserPosts }