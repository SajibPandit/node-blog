// User,Title,Bio,Profilepics,Links:{fb,twitter},posts,bookmarks

const {Schema,model} = require('mongoose')
// const User = require('./User')
// const Post = require('./Post')

const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        trim:true,
        maxlength:100
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500
    },
    profilePics:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]

},{
    timestamps:true
})

const Profile = model('Profile',profileSchema)

module.exports = Profile