const csv = require("csv-parser");
const fs = require("fs");
const logger = require("../config/logger");
const path = require("path");
const { createBranch } = require("../services/branchService");
const { createUser } = require("../services/userService");
const mongoose = require("mongoose");
const { roles } = require("../config/roles");
const config = require("../config/config");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to mongodb");
});

const convertBranchPhoneNumberAndPinCodesToArray = (branch) => {
  branch.contactNumber = branch.contactNumber
    .split(", ")
    .filter((pincode) => !!pincode)
    .map((contactNumber) => parseInt(contactNumber));
  branch.pincodeCovered = branch.pincodeCovered
    .split(", ")
    .filter((pincode) => !!pincode)
    .map((pincode) => parseInt(pincode));
};

const createBranches = async (branches) => {
  try {
    for (let branch of branches) {
      convertBranchPhoneNumberAndPinCodesToArray(branch);
      const branchCreated = await createBranch(branch);
      logger.info(branchCreated);
      const user = await createUser({
        username: branchCreated.branchName.toLocaleLowerCase(),
        password: branchCreated.branchName.toLocaleLowerCase(),
        branchId: branchCreated._id,
        role: roles.branch,
      });
      logger.info(user);
    }
  } catch (error) {
    logger.error(error);
  }
};

const parseCsvAndCreateBranch = async () => {
  try {
    let branches = [];
    fs.createReadStream(path.join(__dirname, "../", "BeetleNut_Data (2).csv"))
      .pipe(csv())
      .on("data", (branch) => {
        branches.push(branch);
      })
      .on("end", () => createBranches(branches));
  } catch (error) {
    logger.error(error);
  }
};

parseCsvAndCreateBranch();
