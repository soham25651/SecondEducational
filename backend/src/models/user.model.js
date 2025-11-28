

import mongoose ,{ Schema } from "mongoose";


const userSchema = new Schema({
         username : {type : String , required:true} ,
         email: {
    type: String,
    unique: true,
    sparse: true, // allow multiple docs without email
    validate: {
      validator: function (v) {
        if (!v) return true; // allow empty/undefined
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
         password:{type : String , required : true },
       
         token : {type : String},
           lastVisit: {
    type: Date,
    default: Date.now
  },

  accessExpiry: {
    type: Date,
    default: () => new Date(Date.now() + 7*24*60*60*1000) // 7 days
  }
});


export const User = mongoose.model("User" , userSchema);

