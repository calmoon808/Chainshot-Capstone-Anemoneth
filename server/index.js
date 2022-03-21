const express = require("express");
// const request = require('request');

const fileUpload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const { isUser, mkDir, writeFile } = require("./helper");
const { create } = require('ipfs-http-client');
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.json()); // for JSON payloads

app.get("/", (req, res) => {
    
    res.status(200).send("test");
})

app.post("/stringUpload", async(req, res) => {
    const userAddress = req.body.userWalletAddress;
    if (!(await isUser(`/${userAddress}`))) {
        await mkDir(userAddress);
    }

    await ipfs.files.write(`/${userAddress}/comments/${req.body.string}`, req.body.string, { create: true })
    let result = await ipfs.files.stat(`/${userAddress}/comments/${req.body.string}`);
    console.log(result);
})

app.post("/userName", async(req, res) => {
    console.log(Date.now());
    console.log(req.body);
    const userAddress = req.body.userWalletAddress;
     if (!(await isUser(`/${userAddress}`))) {
     await mkDir(userAddress);
     }
     if (await ipfs.files.ls('`/${userAddress}/userInfo/${req.body.userName}' !== req.body.userName)){
        await ipfs.files.write(`/${userAddress}/userInfo/${req.body.userName}`, req.body.userName + Date.now(), { create: true })
        let result = await ipfs.files.stat(`/${userAddress}/userInfo/${req.body.userName}`);
        console.log(result);
     }
})

app.post("/fileUpload", async (req, res) => {
    const userAddress = req.body.userAddress;
    if (!(await isUser(`/${userAddress}`))) {
        await mkDir(userAddress);
    }
    const file = req.files.file;
    const fileName = req.files.file.name;
    const filePath = "tempFiles/" + fileName;

    file.mv(filePath, async (err) => {
        if (err) {
            console.log("Error: failed to download the file");
            return res.status(500).send(err);
        }

        const fileHash = await writeFile(userAddress, filePath, fileName);
        fs.unlink(filePath, (err) => {
            if (err) console.log(err);
        })
        
        res.status(200).send({ fileHash, fileName });
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})