const User = require('../models/user');


module.exports.register = (req, res) => {
    res.render('user/register')
}
module.exports.registerPost = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('succses', 'We registered succsesful')
            res.redirect('/campground')
        })
    } catch (e) {
        req.flash('error', 'We cannot to register with this value ')
        res.redirect('/register')
    }
}
module.exports.login = (req, res) => {
    res.render('user/login')
}
module.exports.loginPost = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campground'; 
    delete req.session.returnTo;
    req.flash('succses', 'We login succsesful')
    res.redirect(redirectUrl)
}
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('succses', 'GoodBye')
    res.redirect('/campground')
}