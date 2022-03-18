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
        console.log(error.message);
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
        await ipfs.files.mkdir(`/${userAddress}/posts/${fileName}`, { parents: true });
        // write file to file folder
        await ipfs.files.write(`/${userAddress}/posts/${fileName}/${fileName}`, file, { create: true });
        // write file data to file folder
        const fileData = `{ owner: ${userAddress}, name: ${fileName} }`;
        await ipfs.files.write(`/${userAddress}/posts/${fileName}/fileData`, fileData, { create: true });


        // const fileDir = await ipfs.files.ls(`/${userAddress}/posts/${fileName}`);

        const result = []

        for await (const resultPart of ipfs.files.ls(`/${userAddress}/posts/${fileName}`)) {
            result.push(resultPart)
        }
        console.log(result);
        // return fileDir;
    }
    catch (error) {
        console.log("Something went wrong when creating a new IPFS post");
        console.error(error.message);
    }
}

module.exports = { isUser, mkDir, writeFile }