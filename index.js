const express = require('express');
const app = express();
const multer = require('multer');
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//This will rename the file with a random and unique suffix, while it maintain the original extension
const storage = multer.diskStorage({
    destination:'./uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalExtesion = file.originalname.split('.').pop();
        cb(null, `${uniqueSuffix}.${originalExtesion}`);
    }
});

const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//Example with multer
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({Error: 'No file uploaded'});
    }
    console.log('File uploaded sucessfully: ', req.file);
    
    res.send('File uploaded sucessfully');
})



app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));