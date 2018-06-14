import createError from 'http-errors'
import express from 'express'
import db from './mongodb/db'
import path from 'path'
import configLite from 'config-lite'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import logger from 'morgan'
import chalk from 'chalk'

import templateRouter from './routes/template'
import dashboardRouter from './routes/dashboard'
import borderRouter from './routes/border'
import recentImageRouter from './routes/recent_images'

const app = express();
const config = configLite(__dirname);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));



//跨域处理
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/template', templateRouter);
app.use('/dashboard', dashboardRouter);
app.use('/border', borderRouter);
app.use('/recent_image', recentImageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  )
});

// module.exports = app;
