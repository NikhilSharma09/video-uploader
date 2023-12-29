const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const open = require('open');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const selectedOption = req.body.option;
    const destinationFolder = path.join(__dirname, 'radio', selectedOption);

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    cb(null, destinationFolder);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/uplaod',(_req, res)=>{
  res.send('GET request to /upload')
});

app.post('/upload', upload.single('videoFile'), (req, res) => {
  const selectedOption = req.body.option;
  const destinationFolder = path.join(__dirname, 'radio', selectedOption);

  res.send('File uploaded and saved.');

  // Open the folder where the file has been saved
  open(destinationFolder);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

