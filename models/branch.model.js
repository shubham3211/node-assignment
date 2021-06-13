const mongoose = require("mongoose");

const branchSchema = mongoose.Schema(
  {
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },
    branchName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: [Number],
      required: true,
      trim: true,
    },
    branchIncharge: {
      type: String,
      required: true,
      trim: true,
    },
    pincodeCovered: {
      type: [Number],
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
