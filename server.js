const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://admin:admin@cluster0.v63yb.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'

const Student = require('./models/students')

// Have to use this to be able to recieve data in json format
app.use(express.json());

// Connecting to mongoDB
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Mongodb CONNECTED");
});

app.get('/', async (req, res) => {
    const students = await Student.find()
    res.send(students);
})

app.post('/insert', (req, res) => {
    const student = new Student({
        name: req.body.name,
        phone: req.body.phone
    });

    Student.create(student, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})

app.listen(5000);
console.log('Listening on port 5000');