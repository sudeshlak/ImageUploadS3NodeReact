const express = require('express');
const server = express();
const cors = require('cors');
const {
  generateGetUrl,
  generatePutUrl
} = require('./AWSPresigner');

server.use(express.json());
server.use(cors());

const port = 3500;


// GET URL
server.get('/generate-get-url', (req:any, res:any) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
    .then((getURL:any )=> {
      res.send(getURL);
    })
    .catch((err:any) => {
      res.send(err);
    });
});

// PUT URL
server.get('/generate-put-url', (req:any, res:any)=>{
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } =  req.query;
  generatePutUrl(Key, ContentType).then((putURL:any )=> {
    res.send({putURL});
  })
    .catch((err:any) => {
      res.send(err);
    });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});