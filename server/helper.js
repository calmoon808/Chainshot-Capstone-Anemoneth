const { create } = require('ipfs-http-client');
const fs = require("fs");

const ipfs = create('/ip4/127.0.0.1/tcp/5001');

const isUser = async (walletAddress) => {
    try {
        const result = await ipfs.files.stat(`/${walletAddress}`);
        return result.cid.toString();
    }
    catch(error) {
        if (error.message === "file does not exist") return false
        console.log(1111111,error.message);
    }
}

const mkDir = async (dirName) => {
    try {
        await ipfs.files.mkdir(`/${dirName}/posts`, { parents: true });
        await ipfs.files.mkdir(`/${dirName}/comments`, { parents: true }); 
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS directory");
        console.error(error.message);
    }
}

const writeFile = async (userAddress, filePath, fileName,) => {
    try {
        const file = fs.readFileSync(filePath);
        await ipfs.files.write(`/${userAddress}/posts/${fileName}`, file, { create: true });
        const fileDir = await ipfs.files.stat(`/${userAddress}/posts/${fileName}`);
        return fileDir;
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS post");
        console.error(error.message);
    }
}

module.exports = { isUser, mkDir, writeFile }