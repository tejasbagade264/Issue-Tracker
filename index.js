const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore=require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static('./assets'));
app.use(expressLayouts);



// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');


//setup of express session
//mongo strore is used to store session cookie
app.use(session({
  name: 'codeial',
  // TODO change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: 1000 * 60 * 100 // Fixed the syntax here
  },
  store: MongoStore.create({
      //session to intract with mongoose
      mongoUrl:'mongodb://127.0.0.1:27017/User_Authentication',
      // mongooseConnection:db,
      //do i want to remove automatically is disabled
      autoRemove:'disabled'
  },
  function(err){
      console.log(err || 'connect-mongoose setup OK');
  })
}));

//passport js setup
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.checkAuthentication); // Use the checkAuthentication middleware
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});