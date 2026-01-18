const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required:[true,'Username is required'],
      unique: true,
      minlength: 3,
      trim:true,
    },

    email:{
      type:String,
      required:[true,'Email is required'],
      trim:true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
      unique:true,
    },

    password:{
      type:String,
      required:[true,'Password is required!'],
      match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must be 8+ chars, with uppercase, lowercase, number & special char"]
    },
  }
  ,{timestamps:true}
);


// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.matchPassword = async function (enteredPwd) {
//   return await bcrypt.compare(enteredPwd, this.password);
// };


module.exports = mongoose.model('User',UserSchema);