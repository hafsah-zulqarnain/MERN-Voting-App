const router = require('express').Router()

const handle = require('../controllers')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authadmin')

router.route('/')
      .get(handle.showPolls)
      //.post(auth,handle.createPoll)
      // I commented this because the acccess to createPoll should only be limited to admin

router.route('/admin')
      //.get(auth,handle.usersPolls)
      .get(auth, handle.getAllUsers)
      .post(auth,handle.createPoll)
      .patch(auth,handle.updateUserStatus)


router.route('/:id')
        .get(handle.getPoll)
        .post(auth, handle.vote)
        //.delete(auth,handle.deletePolls)

router.route('/user')
        .patch(auth,handle.updateUserProfile)

module.exports= router