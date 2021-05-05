const express = require('express');
const bcrypt = require('bcryptjs')
const passport = require("passport")
var router = express.Router();
//model
const User = require("../../model/User/User")
const Expert = require("../../model/experts/expert")
//middleware
const {
  authorize,
  isLoggedIn
} = require("../../middleware/auth")

//@desc      login form
//@route     GET/users/login
//@access    public
router.get("/login", async (req, res) => {
  res.render("Users/login")
})

//@desc      register form
//@route     GET/users/register
//@access    public
router.get("/register", async (req, res) => {
  res.render("Users/register")
})

//@desc      register 
//@route     GET/users/register
//@access    public
router.post("/register", (req, res) => {
  
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  
  let errors = [];
//checking field is empty or not
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }
//checking password is same or not
  if (password != password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }
//checking the lenght of password is less than 6
  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }
//checking if there any error
  if (errors.length > 0) {
    res.render('Users/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //checking if user exist or not
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email already exists'
        });
        res.render('Users/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
// hasing password before saving in data base
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'error_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
})

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true

  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


// follow user
router.get('/follow/:user_id', isLoggedIn,  function (req, res) {
  User.findById(req.params.user_id,(err,foundUser)=>{
    if(err){
      console.log(err)
      req.flash('error_msg', err.message);
    }
      foundUser.followers.push(req.user._id)
      foundUser.save()
      req.flash('success_msg', 'Successfully followed !');
      res.redirect("back")
  })
  
});

// view all notifications
router.get('/notifications', isLoggedIn, async function (req, res) {
  try {
    let user = await User.findById(req.user._id).populate({
      path: 'notifications',
      options: {
        sort: {
          "_id": -1
        }
      }
    }).exec();
    let allNotifications = user.notifications;
    res.render('notifications/index', {
      allNotifications
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('back');
  }
});

module.exports = router