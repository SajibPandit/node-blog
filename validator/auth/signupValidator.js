const User  = require('../../models/User')
const {body} = require('express-validator')
module.exports = [
    body('username')
        .trim()
        .isLength({min:3,max:15}).withMessage('Username Must Be Between 3 To 15 Characters')
        .custom(async username =>{
            let user = await User.findOne({username})
            if(user){
                return Promise.reject('Username Already Used')
            }
        }),
    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Please Provide An Valid Email')
        .custom(async email =>{
            let findEmail = await User.findOne({email})
            if(findEmail){
                return Promise.reject('Email Already Used')
            }
        }),
    body('password')
        .isLength({min:6}).withMessage('Password Must Be More Than 5 Characters')
        ,
    body('confirmPassword')
        .isLength({min:1}).withMessage('Please Provide Confirmation Password')
        .custom((confirmPassword,{req})=>{
            if(confirmPassword != req.body.password){
                throw new Error('Password Does Not Match')
            }
            return true
        })
]