const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const { cid } = req.query;
  console.log('form');

  if (!fs.existsSync(path.join(`public/products-images/${cid}`))) {
    fs.mkdirSync(path.join(`public/products-images/${cid}`));
  }

  const form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    file.filepath = path.join(
      `public/products-images/${cid}/${file.originalFilename}`
    );
  });

  form.on('file', (name, file) => {
    res.status(200).json(file);
  });

  console.log(cid);
}
