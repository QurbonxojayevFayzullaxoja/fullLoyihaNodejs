const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const port = process.env.PORT || '5000';
const rProducts = require('./routers/product')
const rUser = require('./routers/users')
const rAuth = require('./routers/auth')




// Mongoodb conecting
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/shoppingdb');
const db = mongoose.connection;
db.on('open', () => console.log("Mongodb ishladi"));
db.on('error', (err) => console.log(err));

//Congig
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers

app.use(rProducts);
app.use(rUser);
app.use(rAuth);




app.listen(port, () => console.log(`Server ${port} da ishladi`))   