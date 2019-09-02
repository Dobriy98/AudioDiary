const express = require('express');
const path = require('path');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const mongoose = require("mongoose");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');

const app = express();

const hbs = handlebars.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views')
  })
  app.use(express.static(path.join(__dirname, 'public')));

  mongoose.connect('mongodb://localhost:27017/audioDiary', { useNewUrlParser: true });
  
  app.engine('hbs', hbs.engine);
  
  let sessionConfig = {
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new FileStore({}),
  }

  app.use(logger('dev'));

app.use(session(sessionConfig))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use(cookieParser());

  app.use('/', indexRouter);



module.exports = app