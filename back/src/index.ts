import express from 'express';
import usersRouter from './routes/user.routes';


const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
app.listen(3001, () => {
    console.log('Server is listening on port 3000');
  });

const mongoURI = 'mongodb://localhost:27017/myDatabase'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err: any) => console.log(err));

app.use('/users', usersRouter);