const jwt = require('jsonwebtoken')

const db = require('../models')

exports.register = async (req, res, next) =>{
    // Try catch is used to avoid promises
    // console.log('Request Body:', req.body);
    try {
        //console.log(req.body);
        const user = await db.User.create(req.body);
        //console.log('User Created:', user);
    
        const {id, cnic, role, isRegistered, isCandidate, approved} = user
        //Generating Token
        const token = jwt.sign({id, cnic}, process.env.SECRET)

        res.status(201).json({id, cnic, role ,token, isRegistered,isCandidate, approved});


    } catch (err) {
        if (err.code === 11000)
        {
            err.message = "Sorry , that cnic is already registered"
        }
        next(err)
    }
}


exports.login = async(req, res, next) =>{
    try {
        const user = await db.User.findOne({cnic: req.body.cnic})
        const {id, cnic, role, isRegistered,isCandidate, approved} =user
        const valid = await user.comparePassword(req.body.password)
        if(valid)
        {
            console.log(cnic)
            const token = jwt.sign({id, cnic}, process.env.SECRET)
            res.json(
                {
                    id, cnic,token, role, isRegistered,isCandidate, approved
                }
            )
        }
        else
        {
            throw new Error()
        }
    
    } catch (err) {

        console.log(err.message)
        err.message ="Invalid Cnic/Password"
        next(err)
    }
}

