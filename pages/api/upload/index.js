const path = require('path');
const slugify = require('slugify');
const formidable = require('formidable-serverless');

path;
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = formidable({
      multiples: true,
      uploadDir: `./public/products-images`,
    });
    form.keepExtensions = true;
    form.keepFileName = true;
    form.on('fileBegin', (name, file) => {
      file.path = path.join(`public/products-images`, slugify(file.name));
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
  res.status(200).json(data);
}
