const router = require('express').Router();
const fetch = require('node-fetch');

const {
    isLoggedIn
} = require("../../middleware/auth")


//@desc     show weather a 
//@route     GET/wheather
//@access    private(user)
router.get('/', isLoggedIn, async (req, res) => {
    res.render('Weather/show', {
        city: null,
        des: null,
        icon: null,
        temp: null,
        wind: null
    });
});

//@desc     show weather a 
//@route     POST/wheather
//@access    private(user)
router.post('/', isLoggedIn, async (req, res) => {

    const city = req.body.city;
    const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    try {
        await fetch(url_api)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'city not found') {
                    res.render('Weather/show', {
                        city: data.message,
                        des: null,
                        icon: null,
                        temp: null,
                        wind: null
                    })
                } else {
                    const city = data.name;
                    const des = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const temp = data.main.temp;
                    const wind = data.wind.speed;

                    res.render('Weather/show', {
                        city,
                        des,
                        icon,
                        temp,
                        wind
                    });
                }
            });

    } catch (err) {
        res.render('Weather/show', {
            city: 'something wrong',
            des: null,
            icon: null,
            temp: null,
            wind: null
        })
    }

})


module.exports = router;