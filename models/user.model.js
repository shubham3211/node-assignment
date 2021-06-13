const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    branchId: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.keys(roles),
      default: roles.customer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserNameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
