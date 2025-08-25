import express from "express";
import authUser from "../middleware/authUser.js";
import {
  addStore,
  allRatings,
  allUser,
  getStores,
  loginAdmin,
  numOfStore,
  storeOwner,
  totalNumberOfuser,
} from "../controllers/adminControllers.js";
import { registerUser } from "../controllers/userControllers.js";

const adminRouter = express.Router();

adminRouter.get("/numberofuser", authUser, totalNumberOfuser);
adminRouter.post("/register", authUser, registerUser);
adminRouter.get("/store-owner", authUser, storeOwner);
adminRouter.post("/add-store", authUser, addStore);
adminRouter.get("/stores", authUser, getStores);
adminRouter.get("/total-stores", authUser, numOfStore);
adminRouter.get("/all-user", authUser, allUser);
adminRouter.get("/ratings", authUser, allRatings);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
