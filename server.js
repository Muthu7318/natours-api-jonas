const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
