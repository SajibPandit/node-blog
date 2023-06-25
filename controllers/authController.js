const bcrypt = require('bcrypt')
const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')
const {validationResult} = require('express-validator')

exports.signupGetController = (req,res,next)=>{
    res.render('pages/auth/register',{title:'Create a New Account',error:{},value:{}})
}

exports.signupPostController = async (req,res,next)=>{

    let {username,email,password} = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('pages/auth/register',{title:'Create a New Account',error:errors.mapped(),value:{username,email,password}})
    }

    try {
        const hashPassword = await bcrypt.hash(password,11)
        let user = new User({username,email,password:hashPassword})
        let createdUser = await user.save()
        console.log('User Created Successfully',createdUser)
        res.render('pages/auth/register',{title:'Create a New Account'})
    } 
    catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req,res,next)=>{
    console.log(req.session.isLoggedIn,req.session.user)
    res.render('pages/auth/login',{title:'Login to Your Account',error:{}})
}

exports.loginPostController = async(req,res,next)=>{
    let {email,password} = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('pages/auth/login',{title:'Login to Your Account',error:errors.mapped()})
    }

    try {
        let user = await User.findOne({email})
        if(!user){
            return res.json({
                message:'Invalid Credentials'
            })
        }
        let match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.json({
                message:'Invalid Credentials'
            })
        }
        
        req.session.isLoggedIn = true
        req.session.user = user
        res.render('pages/auth/login',{title:'Login to Your Account',error:{}})

    } catch (e) {
        console.log(e)
    }
}

exports.logoutController = (req,res,next)=>{

}