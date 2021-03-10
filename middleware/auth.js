//checking user is admin or vsistor
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            req.flash(
                'success_msg',
                'You are not  authorize'
            );
            res.redirect("/allindia")
        } else {
            next()
        }
    }
}



//checking is user logging
exports.isLoggedIn = (req, res, next) =>{
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    }

