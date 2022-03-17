const express = require("express");
const request = require('request');

const fileUpload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
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
app.use(fileUpload());
app.use(cors(corsOptions));
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
    
   // let data = JSON.stringify(req.body); 
    
    console.log(req.body.string);
    let result = await ipfs.add(req.body.string);
    console.log(result.cid.toString());
    // let result = ipfs.add("Hello World", (err, hash) => {
    //     if(err){
    //         return console.log(err);
    //     }
    // console.log(result);
    // })
    
    
})

app.post("/fileUpload", (req, res) => {
    const file = req.files.file;
    const fileName = req.files.file.name;
    const filePath = "tempFiles/" + fileName;
  
    file.mv(filePath, async (err) => {
        if (err) {
            console.log("Error: failed to download the file");
            return res.status(500).send(err);
        }

        const fileHash = await addFile(fileName, filePath);
        fs.unlink(filePath, (err) => {
            if (err) console.log(err);
        })
        
        res.status(200).send({ fileHash, fileName });
    })
})
// async function saveFile() {

    

//     let data = fs.readFileSync("./package.json")
//     let options = {
//         warpWithDirectory: false,
//         progress: (prog) => console.log(`Saved :${prog}`)
//     }
//     let result = await ipfs.add(data, options);
//     console.log(result)
// }
//saveFile()
const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({ path: fileName, content: file });
    const fileHash = fileAdded.cid.toString();
    console.log(fileHash)

    return fileHash;
}

// async function saveText() {
    

//     let result = await ipfs.add("test");

//     //console.log(result);
// }
//  //saveText();

async function saveFile() {

    

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    //console.log(result)
}
//saveFile()

async function getData(hash) {
    

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        //console.log(data)
    }
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})