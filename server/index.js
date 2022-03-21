const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const { isUser, mkUserDir, writeFile, getUserPosts, postComment } = require("./helper");
const { create } = require('ipfs-http-client');
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.json()); // for JSON payloads

app.get("/", (req, res) => {
    res.status(200).send("test");
})

app.get("/userPosts", async (req, res) => {
    const userWalletAddress = req.query.userWalletAddress;
    res.status(200).send(await getUserPosts(userWalletAddress));
})

app.post("/postComment", async (req, res) => {
    const userWalletAddress = req.body.userWalletAddress;
    const postDataCid = req.body.postDataCid;
    const commentText = req.body.commentText;
    await postComment(userWalletAddress, postDataCid, commentText);
})

app.post("/postUpload", async (req, res) => {
    const userAddress = req.body.userAddress;
    if (!(await isUser(`/${userAddress}`))) {
        await mkUserDir(userAddress);
    }
    const postTitle = req.body.postTitle;
    const postBody = req.body.postBody;

    const postData = {
        userAddress,
        postTitle,
        postBody,
    }
    let postObj = { owner: userAddress };
    if (req.files) {
        const file = req.files.postFile;
        postData.fileName = file.name;
        postData.filePath = "tempFiles/" + file.name;
        file.mv(postData.filePath, async (err) => {
            if (err) {
                console.log("Error: failed to download the file");
                return res.status(500).send(err);
            }
    
            postObj = await writeFile(postData);
            fs.unlink(postData.filePath, (err) => {
                if (err) console.log(err);
            })
            res.status(200).send(postObj);
        })
    } else {
        postObj = await writeFile(postData);
        res.status(200).send(postObj);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})