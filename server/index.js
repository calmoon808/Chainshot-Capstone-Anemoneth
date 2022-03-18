const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
// const { create } = require('ipfs-http-client');
const { isUser, mkDir, writeFile } = require("./helper");
// const ipfs = create('/ip4/127.0.0.1/tcp/5001');

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.json()); // for JSON payloads

app.get("/", (req, res) => {
    res.status(200).send("test4");
})

app.post("/stringUpload", (req, res) => {
    console.log(req.body.string);
})

app.post("/fileUpload/", async (req, res) => {

    const userAddress = req.body.userAddress;
    if (!(await isUser(`/${userAddress}`))) {
        await mkDir(userAddress);
    } else {
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
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})