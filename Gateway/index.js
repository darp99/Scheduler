const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sms', proxy('http://localhost:7000'))
app.use('/mail', proxy('http://localhost:6000'))
app.use('/', proxy('http://localhost:5000')) // job


app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})