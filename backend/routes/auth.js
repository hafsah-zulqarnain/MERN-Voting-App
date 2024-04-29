const router = require('express').Router()
const handle = require('../controllers')
const auth = require('../middlewares/auth')
router.get("/",(req,res) =>
{
    res.json({Whatup: "world"})
})


router.post('/register',handle.register)
router.post('/login',handle.login)


module.exports = router