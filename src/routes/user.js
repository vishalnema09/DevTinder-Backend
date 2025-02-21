const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";


// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserID: loggedInUser._id,
      status: "interested",
    }).populate("fromUserID", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or: [
          { toUserID: loggedInUser._id, status: "accepted" },
          { fromUserID: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("fromUserID", USER_SAFE_DATA)
        .populate("toUserID", USER_SAFE_DATA);
  
    //   console.log(connectionRequests);
  
      const data = connectionRequests.map((row) => {
        if (row.fromUserID._id.toString() === loggedInUser._id.toString()) {
          return row.toUserID;
        }
        return row.fromUserID;
      });
  
      res.json({ data });

  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
