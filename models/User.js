// name email password profile
const {Schema,model} = require('mongoose')
// const Profile = require('./Profile')

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        href:'Profile'
    }
},
{
    timestamps:true
})
const User = model('User',userSchema)

module.exports = User

