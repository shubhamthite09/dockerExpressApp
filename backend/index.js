const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.mongoURL || `mongodb+srv://thiteshubham:thiteshubham@cluster0.zphu3ww.mongodb.net/docker?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const NoteSchema = new mongoose.Schema({
    content: String,
    date: Date
});

const Note = mongoose.model('Note', NoteSchema);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/notes', async (req, res) => {
    const newNote = new Note({
        content: req.body.content,
        date: new Date()
    });

    try {
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
