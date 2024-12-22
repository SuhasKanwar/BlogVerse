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
    userName: {
        type: String,
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
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    occupation: {
        type: String
    },
    location: {
        type: String
    },
    socials: {
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        }
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpiry: {
        type: Date
    }
}, { timestamps: true });

userSchema.pre("save", function(next) {
    const user = this;
    
    if (!user.isModified("password")) {
        return next();
    }
    
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

userSchema.statics.matchPassword = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new error("User not found");
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvidedHash) {
        throw new error("Invalid password");
    }

    const token = createTokenForUser(user);
    
    return token;
};

const users = mongoose.model("users", userSchema);

module.exports = users;