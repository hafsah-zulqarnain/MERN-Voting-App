const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
    {
        cnic: {
            type: String,
            required : true,
            unique: true
        },
        password: {
             type: String,
             required: true
        },
        halka:{
            type: String,
           // required : true
        },
        created: {
            type: Date,
            default: Date.now
        },
        role:{
            type: String,
            default: "voter"
            //required : true
        },
        isRegistered: {
            type: Boolean,
            default: false
        },
        isCandidate: {
            type: Boolean,
            default: false
        },
        approved :
        {
            type: Boolean,
            default: false
        },
        profilePic: {
            type: String, // Store the path or URL to the profile picture
        },
        partyName: {
            type: String, // Store the party name if the user is a candidate
        },
        partySymbol: {
            type: String, // Store the path or URL to the party symbol image
        },
        polls: [{type: mongoose.Schema.Types.ObjectId, ref :'Poll'}]

    }

)

userSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password'))
        {
            return next()
        }

        const hashed = await bcrypt.hash(this.password, 10)
        this.password= hashed
        return next()
    } catch (err) {
        return next(err)
        
    }
})

// check if the passowrd are the same
userSchema.methods.comparePassword= async function(attempt, next)
{
    try {
        return await bcrypt.compare(attempt, this.password)
    } catch (err) {
        next(err)
    }
}
module.exports = mongoose.model('User', userSchema)