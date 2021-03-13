const express = require('express');
const News = require("../../model/news/new")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")

//@desc      add news 
//@route     GET/news/new
//@access    private(admin only)
router.get('/new', isLoggedIn, authorize('admin'), (req, res) => {
    res.render("news/addnews")
})


//@desc      display all news 
//@route     GET/news
//@access    private
router.get('/', isLoggedIn, (req, res) => {
    News.find().sort({
        createdAt: -1
    }).exec((err, news) => {
        if (err) {
            console.log(err)
        }
        const fountCategories = news.filter((news) => {
            return news.categories == req.query.categories
        })
        res.render("news/shownews", {
            cnews: fountCategories,
            news
        })
    })

})

//@desc      display single news 
//@route     GET/news/:news_id
//@access    private
router.get('/:news_id', isLoggedIn, (req, res) => {
    News.findById(req.params.news_id, (err, data) => {
        if (err) {
            console.log(err)
        }
        if (!data) {
            req.flash(
                'error_msg',
                'News Not found'
            );
        }
        res.render("news/showfullnews", {
            news: data
        })
    })
})


//@desc      add news 
//@route     POST/news
//@access    private(admin only)
router.post('/', isLoggedIn, authorize('admin'), (req, res) => {
    News.create(req.body.news).then((news) => {
        news.save()
        req.flash(
            'success_msg',
            'news created successfully'
        );
        res.redirect("/news")
    }).catch((error) => {
        console.log(error)
    })

})


module.exports = router