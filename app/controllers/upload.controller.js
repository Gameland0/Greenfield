const formidable = require("formidable");
const busboy = require('busboy');
const cmd = require("node-cmd");
const path = require("path");
const fs = require("fs");
const { Client } = require('@bnb-chain/greenfield-js-sdk')
const client = Client.create('https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org', '5600')

const thunkStreamMerge = (sourceFiles, targetFiles) => {
  const list = fs.readdirSync(path.resolve(__dirname, sourceFiles));
  const fileWriteStream = fs.createWriteStream(
    path.resolve(__dirname, targetFiles)
  );
  thunkStreamMergeProgress(list, fileWriteStream, sourceFiles);
};

function thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles) {
  if (!fileList.length) {
    return fileWriteStream.end("console.log('完成了')");
  }
  const currentFile = path.resolve(__dirname, sourceFiles, fileList.shift());
  const currentReadSteam = fs.createReadStream(currentFile);
  currentReadSteam.pipe(fileWriteStream, { end: false });
  fs.rm(currentFile, { recursive: true }, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
  });
  currentReadSteam.on("end", () => {
    thunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);
  });
}

exports.upload = (req, res) => {
  let info = {};
  const cacheFoler = "MarkenUpload";
  if (!fs.existsSync(path.join(__dirname, "../../../", cacheFoler))) {
    fs.mkdirSync(path.join(__dirname, "../../../", cacheFoler));
  }
  const option = {
    maxFileSize: 600 * 1024 * 1024
  }
  const form = new formidable.IncomingForm(option);
  form.uploadDir = path.join(__dirname, "../../../", cacheFoler);
  form.encoding = "utf-8";
  // form.maxFileSize = 900 * 1024 * 1024;
  // form.maxFieldsSize = 900 * 1024 * 1024;
  form.parse(req, function (error, fields, files) {
    if (error) {
      info.status = 0;
      info.message = error.message;
      res.send(info);
    }
    const savePath = form.uploadDir + "/" + files.files.originalFilename;
    fs.renameSync(files.files.filepath, savePath);
    res.send({
      code: 1,
    });
  });
};


exports.Sharding = (req, res) => {
  let info = {};
  const cacheFoler = "thunk";
  if (!fs.existsSync(path.join(__dirname, "../../../", cacheFoler))) {
    fs.mkdirSync(path.join(__dirname, "../../../", cacheFoler));
  }
  const form = new formidable.IncomingForm();
  console.log("req.files:",req.body)
  form.uploadDir = path.join(__dirname, "../../../", cacheFoler);
  form.encoding = "utf-8";
  form.parse(req, function (error, fields, files) {
    if (error) {
      info.status = 0;
      info.message = error.message;
      res.send(info);
    }
    const readStream = fs.createReadStream(files.files.filepath);
    const file = path.join(__dirname, "../../../thunk/");
    const writeStream = fs.createWriteStream(file + files.files.originalFilename);
    readStream.pipe(writeStream);
    res.send({
      code: 1,
    });
  });
};

exports.merge = (req, res) => {
  try {
    const { filename } = req.body;
    thunkStreamMerge(
      path.join(__dirname, "../../../thunk/"),
      path.join(__dirname, "../../../MarkenUpload/")+ filename
    );
    res.send({
      code: 1,
    });
  } catch (error) {
    res.send({
      code: 0,
      message: error.message,
    });
  }
};

exports.matedata = (req, res) => {
  let info = {};
  // const address = req.query.address
  const cacheFoler = "Matedata";
  if (!fs.existsSync(path.join(__dirname, "../../../", cacheFoler))) {
    fs.mkdirSync(path.join(__dirname, "../../../", cacheFoler));
  }
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../../../", cacheFoler);
  form.encoding = "utf-8";
  form.parse(req, function (error, fields, files) {
    if (error) {
      info.status = 1;
      info.message = "upload failed";
      res.send(info);
    }
    const savePath = form.uploadDir + "/" + files.files.originalFilename;
    fs.renameSync(files.files.filepath, savePath);
    cmd.run("ipfs add " + savePath, function (err, data) {
      res.send({
        code: 1,
        data: data,
      });
    });
  });
};

exports.download = (req, res) => {
  let filepath = path.join(
    __dirname,
    "../../../MarkenUpload/" + req.query.filename
  );
  res.download(filepath);
};

exports.Greenfield = async (req, res) => {
  client.object.getObject(
    {
      bucketName: 'waytimtest2',
      objectName: '1.jpg'
    },
    {
      type: 'ECDSA',
      privateKey: ''
    }).then((data) => {
      res.send({
        code: 1,
        data: data
      });
    }).catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message
      })
    })
// const resdata = await client.object.downloadFile(
//   {
//     bucketName: 'waytimtest2',
//     objectName: '1.jpg'
//   },
//   {
//     type: 'ECDSA',
//     privateKey: ''
//   })
//   console.log(resdata)
//   res.send({
//     code: 1
//   });
};
