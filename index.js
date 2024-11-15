const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');
require('dotenv').config();
const path = require('path');
const renterRouter = require('./routes/rentRoutes');
const statisticsRouter = require('./routes/statisticsRouter')

const app = express();
app.use(express.json());
app.use('/book', express.static(path.join(__dirname, 'book')));

app.use(cors({
  origin: `https://getye-book-rent.vercel.app/`, 
  credentials: true
}));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.static(path.resolve(__dirname, "client", "build")));


app.use('/', userRouter);
app.use('/', bookRouter);
app.use('/', renterRouter);
app.use('/', statisticsRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
