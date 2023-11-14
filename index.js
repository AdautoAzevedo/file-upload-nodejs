const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', (req, res) => {
    //Check if there is a uploaded file
    if (!req.files || !req.files.uploadedFile) {
        console.log(req);
        return res.status(400).json({error: "No file uploaded"});
    }

    const uploadedFile = req.files.uploadedFile;
    const filePath = './uploads/' + uploadedFile.name;

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            console.error('Error uploading file: ', err);
            return res.status(500).json({error: 'Error uploading file'});
        }
        console.log('File uploaded sucessfully');
        res.status(200).json({message: 'File uploaded sucessfully'});
    });
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));