const Branch = require("../models/branch.model");

const createBranch = async (branchBody) => {
  const branch = await Branch.create(branchBody);
  return branch;
};

const getBranchesByPincode = async (pincode) => {
  console.log(`pincode`, pincode);
  const branches = await Branch.find({ pincodeCovered: pincode });
  return branches;
};

module.exports = { createBranch, getBranchesByPincode };
