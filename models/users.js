const mongoose = require('mongoose');
const { createHmac, randomBytes, hash } = require("crypto");
const { error } = require('console');
const { createTokenForUser } = require('../utils/authentication');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/avatars/default-avatar.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timeStamps: true });

userSchema.pre("save", function(next) {
    const user = this;
    
    if(!user.isModified("password")){
        return;
    }
    
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({ email });
    if(!user){
        throw new error("user not found");
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex")
    
    if(hashedPassword !== userProvidedHash){
        throw new error("invalid password");
    }

    const token = createTokenForUser(user);
    
    return token;
})

const users = mongoose.model("users", userSchema);

module.exports = users;