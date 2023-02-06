var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')

var teacherRouter = require('./routes/teacher')
var announcementRouter = require('./routes/announcement')
var scheduleRouter = require('./routes/schedule')
var enrollStudentRouter = require('./routes/enrollStudent')
var addAdminRouter = require('./routes/admin')
var sectionRouter = require('./routes/section')
var forgetRouter = require('./routes/forgetPass')
var changePassRouter = require('./routes/changePass')
var getScheduleRouter = require('./routes/gradeList')
var getannouncementRouter = require('./routes/getAnnouncement')
var openGradingRouter = require('./routes/term')
var getTermRouter = require('./routes/getTerm')
const getTeacherSchedule = require('./routes/getTeacherSchedule')()
const studentRouter = require('./routes/student')()


require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  
})

database.once('connected', () => {
  
})

var app = express();


    
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use(studentRouter)
app.use('/addadmin', addAdminRouter)
app.use('/addteacher', teacherRouter)
app.use('/addAnnouncement', announcementRouter)
app.use('/addschedule', scheduleRouter)
app.use('/enrollstudent', enrollStudentRouter)
app.use('/addsection', sectionRouter)
app.use('/forgetpass', forgetRouter)
app.use('/changepass', changePassRouter)

app.use('/gradelist', getScheduleRouter)
app.use('/getannouncement', getannouncementRouter)
app.use('/opengrading', openGradingRouter)
app.use('/getTerm', getTermRouter)
app.use(getTeacherSchedule)

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

module.exports = app;
