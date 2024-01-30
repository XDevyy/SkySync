const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Handle GET requests to the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle POST requests to the /upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
