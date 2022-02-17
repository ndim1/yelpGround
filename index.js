if (process.env.NODE_ENV !== "production") {
    require('dotenv').config(); 
}

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const methodOverride = require('method-override');

const flash = require('connect-flash')

const userRouters = require('./routes/user');
const campgroundRouters = require('./routes/campground');
const reviewsRouters = require('./routes/review');

const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')

const expressError = require('./utils/expressError');


const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpGround');
}

const sesionConfig = {
    secret: 'morelittlebetersecret',
    resave: false,
    saveUninitilized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sesionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.curentUser = req.user;
    res.locals.succses = req.flash('succses')
    res.locals.error = req.flash('error');
    next();
})
app.get('/fakeuser', async (req, res) => {
    const user = new User({ email: 'colt@gmail.com', username: 'woow' });
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);

app.get('/', (req, res) => {
    res.render('first')
})
app.use('/', userRouters)
app.use('/campground', campgroundRouters)
app.use('/campground/:id/reviews', reviewsRouters)

app.all('*', (req, res, next) => {
    next(new expressError('Page not found', 404));
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err });
})

app.listen(5000, (req, res) => {
    console.log('we loged')
})