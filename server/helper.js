const { create } = require('ipfs-http-client');
const fs = require("fs");
const ipfs = create('/ip4/127.0.0.1/tcp/5001');
const toBuffer = require('it-to-buffer');

const isUser = async (userWalletAddress) => {
    try {
        const result = await ipfs.files.stat(`/${userWalletAddress}`);
        return result.cid.toString();
    }
    catch(error) {
        if (error.message === "User folder not found") return false
        console.log(error.message);
    }
}

const mkUserDir = async (userWalletAddress) => {
    try {
        // await ipfs.files.mkdir(`/${dirName}/userInfo`, { parents: true });
        await ipfs.files.mkdir(`/${userWalletAddress}/posts`, { parents: true });
        await ipfs.files.mkdir(`/${userWalletAddress}/comments`, { parents: true });
         
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS directory");
        console.error(error.message);
    }
}

const writeFile = async (_postData) => {
    try {
        await ipfs.files.mkdir(`/${_postData.userAddress}/posts/${_postData.postTitle}/comments/`, { parents: true });

        // write file to new file folder
        let fileCid = "";
        if (_postData.filePath) {
            const file = fs.readFileSync(_postData.filePath);
            await ipfs.files.write(`/${_postData.userAddress}/posts/${_postData.postTitle}/${_postData.postTitle}`, file, { create: true });
            fileCid = (await ipfs.files.stat(`/${_postData.userAddress}/posts/${_postData.postTitle}/${_postData.postTitle}`)).cid.toString();
        }

        // write file data to file folder
        const postData = { 
            "postOwner": _postData.userAddress, 
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
        await ipfs.files.mv(`/${_postData.userAddress}/posts/${_postData.postTitle}/comments`,`/${_postData.userAddress}/posts/${postDataCid}`);
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
        postObj.postOwner = _postData.userAddress;
        return postObj;
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS post");
        console.error(error.message);
    }
}

const getUserPosts = async (userWalletAddress) => {
    try {
        console.log(userWalletAddress)
        const result = [];
        for await (const resultPart of ipfs.files.ls(`/${userWalletAddress}/posts`)) {
            result.push(await getPost(resultPart.name, userWalletAddress));
        }
        return result;
    }
    catch(error) {
        if (error.message === "Can't find file while getting all userPosts") return false
        console.log(error.message);
    }
}

const getPost = async (postDataCid) => {
    const postDataStr = await cidBufferToString(postDataCid);
    const postData = postDataStr;
    const username = await getUsername(postData.postOwner);
    postData["username"] = username;
    postData["postDataCid"] = postDataCid;
    postData["comments"] = await getComments(postData);
    return postData;
}

const getComments = async (postData) => {
    const result = [];
    const { postOwner, postDataCid } = postData;
    for await (const resultPart of ipfs.files.ls(`/${postOwner}/posts/${postDataCid}/comments`)) {
        const commentCid = await resultPart.cid.toString();
        const commentData = await cidBufferToString(commentCid);
        const username = await getUsername(commentData.commentOwner);
        commentData["username"] = username;
        result.push(commentData);
    }
    return result;
}

const postComment = async (userWalletAddress, postDataCid, commentText) => {
    try {
        const result = [];
        for await (const resultPart of ipfs.files.ls(`/${userWalletAddress}/posts/${postDataCid}/comments`)) {
            result.push(resultPart.cid.toString());
        }
        const commentData = { 
            "commentId": result.length,
            "commentOwner": userWalletAddress, 
            "postDataCid": postDataCid,
            "commentBody": commentText,
        };
        ipfs.files.write(`/${userWalletAddress}/posts/${postDataCid}/comments/${result.length}`, JSON.stringify(commentData), { create: true });
        console.log("comment added to post")
    }
    catch(error) {
        if (error === "error coming from postComment") return false
        console.log(error.message);
    }
} 

const cidBufferToString = async (dataCid) => {
    const bufferedContents = await toBuffer(ipfs.cat(dataCid));
    return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents));
}

const changeUsername = async (userWalletAddress, username) => {
    const userInfo = {
        "username": username,
        "changedAt": Date.now()
    }
    await ipfs.files.write(`/${userWalletAddress}/userInfo`, JSON.stringify(userInfo), { create: true });
}

const getUsername = async (userWalletAddress) => {
    try {
        const userInfo = await ipfs.files.stat(`/${userWalletAddress}/userInfo`);
        const userInfoCid = userInfo.cid.toString();
        const username = await cidBufferToString(userInfoCid);
        return username.username;
    }
    catch(err) {
        console.log(err.message)
    }
}

module.exports = { isUser, mkUserDir, writeFile, getUserPosts, postComment, changeUsername }