const express = require("express");
const request = require('request');

const fileUpload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
<<<<<<< HEAD
// const { create } = require('ipfs-http-client');
const { isUser, mkDir, writeFile } = require("./helper");
// const ipfs = create('/ip4/127.0.0.1/tcp/5001');

=======
const { create } = require('ipfs-http-client');

const ipfs = create('/ip4/127.0.0.1/tcp/5001');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
>>>>>>> 4d2a219a7ec229eab38fa7b9e0f6bc97600144e8
app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.json()); // for JSON payloads

app.get("/", (req, res) => {

    res.status(200).send("test");
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
})

app.post("/stringUpload", async(req, res) => {

    let result = await ipfs.add(req.body.string);
    console.log(result.cid.toString());
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

<<<<<<< HEAD
=======
const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({ path: fileName, content: file });
    const fileHash = fileAdded.cid.toString();
    console.log(fileHash)

    return fileHash;
}



>>>>>>> 4d2a219a7ec229eab38fa7b9e0f6bc97600144e8
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})